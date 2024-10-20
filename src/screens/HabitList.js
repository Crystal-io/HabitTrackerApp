import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, Button, StyleSheet } from 'react-native';
import { getHabits } from '../storage/HabitStorage'; // Импорт функции для получения привычек

const HabitList = ({ navigation }) => {
  const [habits, setHabits] = useState([]);

  // Функция для загрузки привычек
  const fetchHabits = async () => {
    try {
      const habitsData = await getHabits();
      setHabits(habitsData);
    } catch (error) {
      console.error('Ошибка при загрузке привычек:', error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  // Функция для отображения элемента привычки
  const renderHabitItem = ({ item }) => {
    const timestamp = item.timestamp ? new Date(item.timestamp).toLocaleString() : 'Нет даты';
    
    return (
      <Text style={styles.habitItem}>
        {item.habit} - Оценка: {item.mood} - {timestamp}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={habits}
        renderItem={renderHabitItem}
        keyExtractor={(item, index) => (item.timestamp ? item.timestamp.toString() : index.toString())} // Используем индекс как ключ, если нет timestamp
      />
      <Button title="Перейти к аналитике" onPress={() => navigation.navigate('Analytics')} />
      <Button title="Настройки" onPress={() => navigation.navigate('Settings')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  habitItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HabitList;
