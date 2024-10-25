import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const SurveyScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    habit: '',
    moodBefore: '8',
    moodAfter: '8',
    comment: '',
    duration: '1 час',
    context: 'я один',
  });

  // Функция для форматирования timestamp
  const formatTimestamp = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // Функция для преобразования duration в формат HH:MM:SS
  const formatDuration = (durationText) => {
    const durationMap = {
      '15 минут': '00:15:00',
      '30 минут': '00:30:00',
      '1 час': '01:00:00',
      '2 часа': '02:00:00',
      '4 часа': '04:00:00',
    };
    return durationMap[durationText];
  };

  // Сохранение привычек в локальное хранилище
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

  // Обработка отправки формы
  const handleSubmit = async () => {
    const { habit, moodBefore, moodAfter, comment, duration, context } = form;
    if (!habit || !moodBefore || !moodAfter || !duration || !context) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.');
      return;
    }

    const newHabit = {
      habit,
      moodBefore: parseInt(moodBefore),
      moodAfter: parseInt(moodAfter),
      duration: formatDuration(duration), // Сохранение в формате HH:MM:SS
      context,
      comment,
      timestamp: formatTimestamp(), // Сохранение в формате 'YYYY-MM-DD HH:MM:SS'
    };

    await saveHabit(newHabit);

    Alert.alert('Успешно', 'Ваши данные сохранены.');
    setForm({
      habit: '',
      moodBefore: '8',
      moodAfter: '8',
      comment: '',
      duration: '1 час',
      context: 'я один',
    });
    navigation.navigate('HabitListScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Деятельность:</Text>
      <TextInput
        style={styles.input}
        placeholder="Введите вашу деятельность"
        value={form.habit}
        onChangeText={(value) => setForm({ ...form, habit: value })}
      />

      <Text style={styles.label}>Обстановка:</Text>
      <Picker
        selectedValue={form.context}
        style={styles.picker}
        onValueChange={(value) => setForm({ ...form, context: value })}
      >
        <Picker.Item label="я один" value="я один" />
        <Picker.Item label="с родными" value="с родными" />
        <Picker.Item label="малая компания друзей" value="малая компания друзей" />
        <Picker.Item label="большая компания" value="большая компания" />
        <Picker.Item label="грандиозная тусовка" value="грандиозная тусовка" />
      </Picker>

      <Text style={styles.label}>Время действия:</Text>
      <Picker
        selectedValue={form.duration}
        style={styles.picker}
        onValueChange={(value) => setForm({ ...form, duration: value })}
      >
        <Picker.Item label="15 минут" value="15 минут" />
        <Picker.Item label="30 минут" value="30 минут" />
        <Picker.Item label="1 час" value="1 час" />
        <Picker.Item label="2 часа" value="2 часа" />
        <Picker.Item label="4 часа" value="4 часа" />
      </Picker>

      <Text style={styles.label}>Настроение ДО (1-10):</Text>
      <Picker
        selectedValue={form.moodBefore}
        style={styles.picker}
        onValueChange={(value) => setForm({ ...form, moodBefore: value })}
      >
        {[...Array(10)].map((_, index) => (
          <Picker.Item key={index} label={`${10 - index}`} value={`${10 - index}`} />
        ))}
      </Picker>

      <Text style={styles.label}>Настроение ПОСЛЕ (1-10):</Text>
      <Picker
        selectedValue={form.moodAfter}
        style={styles.picker}
        onValueChange={(value) => setForm({ ...form, moodAfter: value })}
      >
        {[...Array(10)].map((_, index) => (
          <Picker.Item key={index} label={`${10 - index}`} value={`${10 - index}`} />
        ))}
      </Picker>

      <Text style={styles.label}>Комментарии:</Text>
      <TextInput
        style={styles.input}
        placeholder="Комментарии"
        value={form.comment}
        onChangeText={(value) => setForm({ ...form, comment: value })}
      />

      <Button title="Сохранить" onPress={handleSubmit} color="#4A90E2" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0faff',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    color: '#333',
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
});

export default SurveyScreen;
