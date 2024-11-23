import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../config/firebase'; // Ensure this import is correct
import { signOut } from 'firebase/auth'; // Import signOut from Firebase auth

const Welcome = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            signOut(auth)
              .then(() => {
                navigation.replace('Login'); // Navigate back to the login screen
              })
              .catch((err) => {
                console.error('Logout Error:', err);
                Alert.alert('Error', 'Failed to logout. Please try again.');
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mindfulness</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={28} color="#29A090" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonWrapper}>
        <LinearGradient colors={['#6DD5FA', '#2980B9']} style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MoodTest')}>
            <Text style={styles.buttonText}>Mood Test</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.buttonWrapper}>
        <LinearGradient colors={['#6DD5FA', '#2980B9']} style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Journal')}>
            <Text style={styles.buttonText}>Journal</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.buttonWrapper}>
        <LinearGradient colors={['#6DD5FA', '#2980B9']} style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Meditate')}>
            <Text style={styles.buttonText}>Meditate</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.buttonWrapper}>
        <LinearGradient colors={['#6DD5FA', '#2980B9']} style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UploadSongs')}>
            <Text style={styles.buttonText}>Upload Songs</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.buttonWrapper}>
        <LinearGradient colors={['#6DD5FA', '#2980B9']} style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BrowseSongs')}>
            <Text style={styles.buttonText}>Browse Songs</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '80%',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#29A090',
  },
  buttonWrapper: {
    position: 'relative',
    marginBottom: 30, // Space between buttons
    width: '80%',
  },
  buttonContainer: {
    borderRadius: 50,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50, // Oval shape
    backgroundColor: '#fff', // White background for the button
    borderBottomWidth: 12, // Bottom border width for visual effect
    borderBottomColor: '#29A090', // Bottom border color
  },
  buttonText: {
    fontSize: 18,
    color: '#000', // Black text color
    fontWeight: 'bold',
  },
  buttonShadow: {
    // Shadow for 3D effect
    position: 'absolute',
    top: 8,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: '#888', // Darker color for shadow effect
    borderRadius: 50,
    zIndex: -1, // Keeps the shadow behind the button
  },
});

export default Welcome;
