import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveHabit = async (habit) => {
  try {
    const storedHabits = await AsyncStorage.getItem('habits');
    const habits = storedHabits ? JSON.parse(storedHabits) : [];
    habits.push(habit);
    await AsyncStorage.setItem('habits', JSON.stringify(habits));
  } catch (error) {
    console.error('Error saving habit:', error);
  }
};

export const getHabits = async () => {
  try {
    const storedHabits = await AsyncStorage.getItem('habits');
    return storedHabits ? JSON.parse(storedHabits) : [];
  } catch (error) {
    console.error('Error loading habits:', error);
    return [];
  }
};
