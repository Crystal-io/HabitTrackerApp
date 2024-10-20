import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SurveyScreen = ({ navigation }) => {
  const [habit, setHabit] = useState('');
  const [mood, setMood] = useState('');
  const [comment, setComment] = useState('');

  const saveHabit = async (newHabit) => {
    try {
      const storedHabits = await AsyncStorage.getItem('habits');
      const habits = storedHabits ? JSON.parse(storedHabits) : [];
      habits.push(newHabit);
      await AsyncStorage.setItem('habits', JSON.stringify(habits));
    } catch (error) {
      console.error('Ошибка при сохранении привычки:', error);
    }
  };

  const handleSubmit = async () => {
    if (!habit || !mood || !comment) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.');
      return;
    }

    const newHabit = {
      habit,
      mood: parseInt(mood), // Преобразуем настроение в число
      comment,
      timestamp: Date.now(), // Добавляем временную метку
    };

    // Сохраняем данные в локальное хранилище
    await saveHabit(newHabit);

    Alert.alert('Успешно', 'Ваши данные сохранены.');

    // Очистка полей после отправки
    setHabit('');
    setMood('');
    setComment('');

    // Переход к списку привычек после отправки
    navigation.navigate('HabitList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Введите вашу привычку:</Text>
      <TextInput
        style={styles.input}
        placeholder="Привычка"
        value={habit}
        onChangeText={setHabit}
      />

      <Text style={styles.label}>Оцените ваше настроение (1-10):</Text>
      <TextInput
        style={styles.input}
        placeholder="Настроение"
        value={mood}
        onChangeText={setMood}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Комментарии:</Text>
      <TextInput
        style={styles.input}
        placeholder="Комментарии"
        value={comment}
        onChangeText={setComment}
      />

      <Button title="Сохранить" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});

export default SurveyScreen;
