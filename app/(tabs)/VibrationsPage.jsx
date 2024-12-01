import React from 'react';
import { View } from 'react-native';
import AudioPage from './AudioPage'; // Adjust the import path as necessary

const Vibrations = () => {
  return (
    <View style={{ flex: 1 }}>
      <AudioPage type="vibrations" />
    </View>
  );
};

export default Vibrations;
