import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const AudioPage = ({ type }) => {
  const navigation = useNavigation();
  const [tracks, setTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null); // Track URL being played
  const [sound, setSound] = useState(null); // Sound object for the audio
  const [isLoading, setIsLoading] = useState(false); // Loading state for sound

  useEffect(() => {
    const fetchTracks = async () => {
      const q = query(collection(db, 'songs'), where('type', '==', type));
      const querySnapshot = await getDocs(q);
      const fetchedTracks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTracks(fetchedTracks);
    };

    fetchTracks();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound, type]);

  const playTrack = async (url) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      setIsLoading(true);

      const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
      setSound(newSound);
      setPlayingTrack(url);

      await newSound.playAsync();

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setIsLoading(false);
        }
        if (status.didJustFinish) {
          setPlayingTrack(null); // Reset when finished
        }
      });
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsLoading(false);
    }
  };

  const stopTrack = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        setPlayingTrack(null);
      }
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  };

  const getFirstFourWords = (name) => {
    const words = name.split(' ');
    return words.slice(0, 4).join(' ') + (words.length > 4 ? '...' : '');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${type.charAt(0).toUpperCase() + type.slice(1)} Tracks`}</Text>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.trackContainer}>
            <Text style={styles.trackName}>{getFirstFourWords(item.name)}</Text>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => {
                if (playingTrack === item.url) {
                  stopTrack();
                } else {
                  playTrack(item.url);
                }
              }}
            >
              <Text style={styles.playButtonText}>
                {isLoading && playingTrack === item.url
                  ? 'Loading...'
                  : playingTrack === item.url
                  ? 'Stop'
                  : 'Play'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#29A090',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  trackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  trackName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  playButton: {
    padding: 10,
    backgroundColor: '#29A090',
    borderRadius: 5,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AudioPage;
