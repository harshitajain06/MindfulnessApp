import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icons library
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const Mediate = () => {
  const navigation = useNavigation(); // Hook for navigation

  const buttons = [
    { title: 'Calming', icon: 'leaf-outline', screen: 'Calming' },
    { title: 'Joyful', icon: 'happy-outline', screen: 'JoyfulPage' },
    { title: 'Relief', icon: 'heart-outline', screen: 'ReliefPage' },
    { title: 'Guided', icon: 'compass-outline', screen: 'GuidedPage' },
    { title: 'Violin', icon: 'musical-notes-outline', screen: 'ViolinPage' },
    { title: 'Vibrations', icon: 'volume-high-outline', screen: 'VibrationsPage' },
  ];

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#29A090" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Mediate</Text>

      <View style={styles.grid}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => navigation.navigate(button.screen)}
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
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#29A090',
    marginBottom: 20,
    marginTop: 20, // Adjusted for back button space
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: 120,
    height: 120,
    backgroundColor: '#29A090',
    borderRadius: 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
  },
});

export default Mediate;
