import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { db } from '../../config/firebase'; // Import Firestore database from your firebase.js
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore'; // Import Firestore methods

const Journal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [journalEntry, setJournalEntry] = useState('');
  const [journals, setJournals] = useState([]); // State to hold previous journals
  const [selectedJournal, setSelectedJournal] = useState(null); // State for selected journal

  // Function to fetch the journal entries from Firestore
  const fetchJournals = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'journals'));
      const journalList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(), // Convert Firestore timestamp to JavaScript date
      }));
      setJournals(journalList);
    } catch (error) {
      console.error('Error fetching journals:', error);
    }
  };

  // Function to save the journal entry to Firebase Firestore
  const saveJournal = async () => {
    try {
      if (journalEntry.trim()) {
        // Add journal entry to the Firestore 'journals' collection
        await addDoc(collection(db, 'journals'), {
          content: journalEntry,
          createdAt: serverTimestamp(), // Set the creation timestamp
        });
        setJournalEntry(''); // Clear the input field
        setModalVisible(false); // Close the modal
        alert('Journal saved successfully');
        fetchJournals(); // Fetch updated journals after saving
      } else {
        alert('Please write something before saving!');
      }
    } catch (error) {
      console.error('Error saving journal:', error);
      alert('Error saving journal. Please try again.');
    }
  };

  // Fetch journals on component mount
  useEffect(() => {
    fetchJournals();
  }, []);

  // Open modal to display the selected journal content
  const openJournalModal = (journal) => {
    setSelectedJournal(journal); // Set the selected journal
    setModalVisible(true); // Open modal
  };

  // Function to format the date
  const formatDate = (date) => {
    if (!date) return ''; // If date is undefined, return empty string
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Journal</Text>
      <Text style={styles.subtitle}>Write down your thoughts and feelings here.</Text>

      {/* Scrollable view for displaying previous journals */}
      <ScrollView contentContainerStyle={styles.journalsContainer}>
        {journals.map(journal => (
          <TouchableOpacity
            key={journal.id}
            style={styles.journalBox}
            onPress={() => openJournalModal(journal)} // Open the modal on click
          >
            <Ionicons name="document-text-outline" size={24} color="#29A090" style={styles.icon} />
            <Text numberOfLines={3} style={styles.journalPreview}>
              {journal.content}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Square Button with "+" Icon */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={40} color="#fff" />
      </TouchableOpacity>

      {/* Modal for writing a new journal entry or displaying journal content */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          {selectedJournal ? (
            <>
              {/* Show selected journal content */}
              <Text style={styles.modalTitle}>Journal Entry</Text>
              <ScrollView style={styles.fullJournalContent}>
                <Text style={styles.journalText}>{selectedJournal.content}</Text>
                <Text style={styles.journalDate}>{formatDate(selectedJournal.createdAt)}</Text>
              </ScrollView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setSelectedJournal(null); // Clear selected journal
                  setModalVisible(false); // Close modal
                }}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Show journal input form */}
              <Text style={styles.modalTitle}>New Journal Entry</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Write your thoughts..."
                multiline
                value={journalEntry}
                onChangeText={setJournalEntry}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.modalButton} onPress={saveJournal}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#29A090',
    marginBottom: 10,
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  journalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  journalBox: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    borderColor: '#29A090',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  journalPreview: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  addButton: {
    width: 70,
    height: 70,
    backgroundColor: '#29A090',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 30,
    elevation: 5,
    marginBottom: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#29A090',
  },
  textInput: {
    width: 250,
    height: 100,
    borderColor: '#29A090',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
  },
  fullJournalContent: {
    maxHeight: 200, // Restrict modal content height to make it scrollable
  },
  journalText: {
    fontSize: 16,
    color: '#333',
  },
  journalDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#29A090',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: 100,
  },
  cancelButton: {
    backgroundColor: '#ff6347',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: 100,
  },
  closeButton: {
    backgroundColor: '#29A090',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    width: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Journal;
