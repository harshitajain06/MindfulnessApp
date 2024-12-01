import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { storage, db } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker

const UploadSongs = () => {
  const [uploadMessage, setUploadMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [songType, setSongType] = useState('calming'); // Default type
  const navigation = useNavigation();

  const handleUpload = async () => {
    try {
      setModalVisible(true);
      setIsLoading(true);

      const result = await DocumentPicker.getDocumentAsync({ type: 'audio/mpeg' });
      console.log('Document Picker Result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const { uri, name } = result.assets[0];
        const response = await fetch(uri);
        const blob = await response.blob();

        const fileRef = ref(storage, `${songType}/${name}`);
        await uploadBytes(fileRef, blob);
        const downloadURL = await getDownloadURL(fileRef);

        const songData = {
          name: name,
          type: songType,
          url: downloadURL,
          uploadedAt: new Date(),
        };
        await addDoc(collection(db, 'songs'), songData);

        setUploadMessage(`Uploaded: ${name}`);
      } else {
        setUploadMessage('Upload canceled or no file selected');
      }
    } catch (error) {
      setUploadMessage(`Error uploading file: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Songs</Text>

      <Text style={styles.label}>Select Song Type:</Text>
      <Picker
        selectedValue={songType}
        style={styles.picker}
        onValueChange={(itemValue) => setSongType(itemValue)}
      >
        <Picker.Item label="Calming" value="calming" />
        <Picker.Item label="Joyful" value="joyful" />
        <Picker.Item label="Relief" value="relief" />
        <Picker.Item label="Guided" value="guided" />
        <Picker.Item label="Violin" value="violin" />
        <Picker.Item label="Vibrations" value="vibrations" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleUpload}>
        <Text style={styles.buttonText}>Select and Upload MP3</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navigateButton} onPress={() => navigation.navigate('Meditate')}>
        <Text style={styles.navigateButtonText}>Go to Meditate Page</Text>
      </TouchableOpacity>

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
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
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
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '80%',
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
