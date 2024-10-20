import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SurveyScreen = ({ navigation }) => {
  const [form, setForm] = useState({ habit: '', mood: '', comment: '' });

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
    const { habit, mood, comment } = form;
    if (!habit || !mood || !comment) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.');
      return;
    }

    const newHabit = {
      habit,
      mood: parseInt(mood),
      comment,
      timestamp: Date.now(),
    };

    await saveHabit(newHabit);

    Alert.alert('Успешно', 'Ваши данные сохранены.');
    setForm({ habit: '', mood: '', comment: '' });
    navigation.navigate('HabitList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Введите вашу привычку:</Text>
      <TextInput
        style={styles.input}
        placeholder="Привычка"
        value={form.habit}
        onChangeText={(value) => setForm({ ...form, habit: value })}
      />

      <Text style={styles.label}>Оцените ваше настроение (1-10):</Text>
      <TextInput
        style={styles.input}
        placeholder="Настроение"
        value={form.mood}
        onChangeText={(value) => setForm({ ...form, mood: value })}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Комментарии:</Text>
      <TextInput
        style={styles.input}
        placeholder="Комментарии"
        value={form.comment}
        onChangeText={(value) => setForm({ ...form, comment: value })}
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
