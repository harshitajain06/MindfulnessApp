import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AudioPage from './AudioPage'; // Adjust the import path as necessary

const Joyful = () => {
  const navigation = useNavigation();

  return <AudioPage type="joyful" />;
};

export default Joyful;
