import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, Button, StyleSheet } from 'react-native';
import { getHabits } from '../storage/HabitStorage';

const HabitListScreen = ({ navigation }) => {
  const [habits, setHabits] = useState([]);

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
        keyExtractor={(item) => item.id?.toString() || item.timestamp?.toString() || Math.random().toString()}
      />
      <Button
        title="Перейти к аналитике"
        onPress={() => navigation.navigate('AnalyticsScreen')}
        color="#4A90E2"
      />
      <Button
        title="Настройки"
        onPress={() => navigation.navigate('SettingsScreen')}
        color="#FF6F61"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0faff',
  },
  habitItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#333',
  },
});

export default HabitListScreen;
