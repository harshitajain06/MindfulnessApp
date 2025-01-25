import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { storage, db } from '../../config/firebase'; // Adjust the path as necessary
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const UploadSongs = () => {
  const [uploadMessage, setUploadMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [songType, setSongType] = useState('calming'); // Default song type
  const navigation = useNavigation();

  const handleUpload = async () => {
    try {
      setIsLoading(true);
      setUploadMessage('');

      const result = await DocumentPicker.getDocumentAsync({ type: 'audio/mpeg' });

      console.log('Picker Result:', result); // Log for debugging

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const { uri, name } = result.assets[0]; // Access correct file data
        console.log(`Uploading file: ${name}`);

        // Fetch the file and convert to Blob
        const response = await fetch(uri);
        const blob = await response.blob();

        // Firebase Storage reference
        const fileRef = ref(storage, `uploads/${songType}/${Date.now()}_${name}`);
        await uploadBytes(fileRef, blob);
        console.log('File uploaded to Firebase Storage');

        // Get download URL
        const downloadURL = await getDownloadURL(fileRef);

        // Save metadata in Firestore
        const docRef = await addDoc(collection(db, 'songs'), {
          name,
          type: songType,
          url: downloadURL,
          uploadedAt: new Date(),
        });

        console.log(`Document added with ID: ${docRef.id}`);
        setUploadMessage(`Uploaded: ${name}`);
      } else {
        setUploadMessage('Upload canceled or no file selected');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadMessage(`Error uploading file: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Upload Songs</Text>

      <Text style={styles.label}>Select Song Type:</Text>
      <View style={styles.optionsContainer}>
        {['calming', 'joyful', 'relief', 'guided', 'violin', 'vibrations'].map(
          (type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.optionButton,
                songType === type && styles.selectedButton,
              ]}
              onPress={() => setSongType(type)}
            >
              <Text
                style={[
                  styles.optionText,
                  songType === type && styles.selectedText,
                ]}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpload}>
        <Text style={styles.buttonText}>Select and Upload MP3</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navigateButton}
        onPress={() => navigation.navigate('Meditate')}
      >
        <Text style={styles.navigateButtonText}>Go to Meditate Page</Text>
      </TouchableOpacity>

      {isLoading && <ActivityIndicator size="large" color="#29A090" />}
      <Text style={styles.uploadMessage}>{uploadMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#29A090',
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#29A090',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    margin: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#29A090',
  },
  optionText: {
    color: '#000',
    fontSize: 16,
  },
  selectedText: {
    color: '#fff',
  },
  button: {
    padding: 15,
    backgroundColor: '#29A090',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navigateButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#4caf50',
    borderRadius: 10,
  },
  navigateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadMessage: {
    marginTop: 20,
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default UploadSongs;
