import React from 'react';
import { View } from 'react-native';
import AudioPage from './AudioPage'; // Adjust the import path as necessary

const Violin = () => {
  return (
    <View style={{ flex: 1 }}>
      <AudioPage type="violin" />
    </View>
  );
};

export default Violin;
