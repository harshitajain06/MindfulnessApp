import React from 'react';
import AudioPage from './AudioPage'; // Adjust the import path as necessary
import { useNavigation } from '@react-navigation/native';

const Guided = () => {
    const navigation = useNavigation();
  return <AudioPage type="guided" />;
};

export default Guided;
