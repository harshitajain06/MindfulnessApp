import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icons library
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const Mediate = () => {
  const navigation = useNavigation(); // Hook for navigation

  const buttons = [
    { title: 'Calming', icon: 'leaf-outline', screen: 'Calming' },     // Icon for "Calming"
    { title: 'Joyful', icon: 'happy-outline', screen: 'Joyful' },      // Icon for "Joyful"
    { title: 'Relief', icon: 'heart-outline', screen: 'Relief' },      // Icon for "Relief"
    { title: 'Guided', icon: 'compass-outline', screen: 'Guided' },    // Icon for "Guided"
    { title: 'Violin', icon: 'musical-notes-outline', screen: 'Violin' },  // Icon for "Violin"
    { title: 'Vibrations', icon: 'volume-high-outline', screen: 'Vibrations' }, // Icon for "Vibrations"
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mediate</Text>

      <View style={styles.grid}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => navigation.navigate(button.screen)} // Navigate to the corresponding screen
          >
            <Ionicons name={button.icon} size={50} color="#fff" />
            <Text style={styles.buttonText}>{button.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Similar to Welcome page
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#29A090', // Color theme similar to Welcome page
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: 120,
    height: 120,
    backgroundColor: '#29A090', // Color theme for buttons
    borderRadius: 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10, // 3D shadow effect for buttons
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
  },
});

export default Mediate;
