import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the back icon

const MoodTest = () => {
  const navigation = useNavigation();

  // Array of moods to display as buttons
  const moods = [
    "Happy",
    "Sad",
    "Anxious",
    "Excited",
    "Angry",
    "Calm",
    "Overwhelmed",
    "Bored",
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#29A090" />
        </TouchableOpacity>
        <Text style={styles.title}>Mood Test</Text>
      </View>

      <Text style={styles.description}>
        Add the mood test with option choices etc.
      </Text>

      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>How do you feel today?</Text>
      </View>

      {/* Scrollable container for mood buttons */}
      <ScrollView style={styles.buttonContainer}>
        {/* Render buttons for each mood */}
        {moods.map((mood, index) => (
          <View style={styles.buttonWrapper} key={index}>
            <LinearGradient colors={['#6DD5FA', '#2980B9']} style={styles.buttonGradient}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {/* Add your navigation or logic here */}}
              >
                <Text style={styles.buttonText}>{mood}</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>
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
    alignItems: 'center',
    width: '80%',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#29A090',
    marginLeft: 50, // Space between back icon and title
    marginTop: 50,
  },
  description: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center', // Center the text
    marginBottom: 40,
    paddingHorizontal: 20, // Padding for better readability
    width: '100%', // Adjust width to take full screen width
    flexWrap: 'wrap', // Allow text to wrap to the next line
  },
  labelContainer: {
    backgroundColor: '#29A090', // Background color for the label
    borderRadius: 8, // Rounded corners
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20, // Space below the label
  },
  labelText: {
    fontSize: 20,
    color: '#fff', // White text color
    textAlign: 'center', // Center the text
  },
  buttonContainer: {
    width: '100%', // Full width for the button container
    maxHeight: 450, // Set a max height to enable scrolling if there are many buttons
  },
  buttonWrapper: {
    position: 'relative',
    marginBottom: 20, // Space between buttons
    width: '70%',
    alignSelf: 'center', // Center the buttons
  },
  buttonGradient: {
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
});

export default MoodTest;
