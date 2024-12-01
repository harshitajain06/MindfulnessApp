import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AudioPage from './AudioPage'; // Adjust the import path as necessary

const Relief = () => {
  const navigation = useNavigation();
  return <AudioPage type="relief" />;
};

export default Relief;
