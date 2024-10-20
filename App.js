import React, { useState } from 'react';
import { SafeAreaView, Button, TextInput, Text, Alert } from 'react-native';
import { saveHabit } from './src/storage/HabitStorage'; // Импортируем функцию сохранения
import Navigation from './Navigation'; // Импортируем навигацию

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigation /> {/* Навигация для приложения */}
    </SafeAreaView>
  );
};

export default App;