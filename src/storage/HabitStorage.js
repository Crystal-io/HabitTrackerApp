import AsyncStorage from '@react-native-async-storage/async-storage';

export const getHabits = async () => {
  try {
    const storedHabits = await AsyncStorage.getItem('habits');
    return storedHabits ? JSON.parse(storedHabits) : [];
  } catch (error) {
    console.error('Ошибка при загрузке привычек:', error);
    return [];
  }
};

export const saveHabit = async (newHabit) => {
  try {
    const habits = await getHabits();
    habits.push(newHabit);
    await AsyncStorage.setItem('habits', JSON.stringify(habits));
  } catch (error) {
    console.error('Ошибка при сохранении привычки:', error);
  }
};
