import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { storage, db } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const UploadSongs = () => {
  const [uploadMessage, setUploadMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleUpload = async () => {
    try {
      // Show modal and start loading
      setModalVisible(true);
      setIsLoading(true);

      // Open document picker to select an audio file
      const result = await DocumentPicker.getDocumentAsync({ type: 'audio/mpeg' });
      console.log("Document Picker Result:", result);

      // Check if a file was selected
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const { uri, name } = result.assets[0];

        // Convert the file to a blob for Firebase upload
        const response = await fetch(uri);
        const blob = await response.blob();

        // Define Firebase Storage reference
        const fileRef = ref(storage, `calming-audio/${name}`);

        // Upload file to Firebase Storage
        await uploadBytes(fileRef, blob);
        const downloadURL = await getDownloadURL(fileRef);

        // Save metadata to Firestore
        const songData = {
          name: name,
          type: 'calming',
          url: downloadURL,
          uploadedAt: new Date(),
        };
        await addDoc(collection(db, 'songs'), songData);

        // Update message for success
        setUploadMessage(`Uploaded: ${name}`);
      } else {
        setUploadMessage('Upload canceled or no file selected');
      }
    } catch (error) {
      setUploadMessage(`Error uploading file: ${error.message}`);
    } finally {
      // Stop loading after upload completes
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Calming Songs</Text>
      
      {/* Button to select and upload an MP3 file */}
      <TouchableOpacity style={styles.button} onPress={handleUpload}>
        <Text style={styles.buttonText}>Select and Upload MP3</Text>
      </TouchableOpacity>
      
      {/* Button to navigate to Calming page */}
      <TouchableOpacity style={styles.navigateButton} onPress={() => navigation.navigate('Calming')}>
        <Text style={styles.navigateButtonText}>Go to Calming Page</Text>
      </TouchableOpacity>

      {/* Modal for showing upload message or loading indicator */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#29A090" />
            ) : (
              <>
                <Text style={styles.modalMessage}>{uploadMessage}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#29A090',
    marginBottom: 20,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#29A090',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UploadSongs;
