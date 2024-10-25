import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { clearHabits } from '../storage/HabitStorage';

const SettingsScreen = ({ navigation }) => {
  const [selectedCharts, setSelectedCharts] = useState({
    lineChart: false,
    pieChart: false,
    barChart: false,
  });

  const toggleChartSelection = (chartType) => {
    setSelectedCharts((prev) => ({
      ...prev,
      [chartType]: !prev[chartType],
    }));
  };

  const handleClearHistory = async () => {
    try {
      await clearHabits();
      Alert.alert('Успех', 'История удалена');
    } catch (error) {
      Alert.alert('Ошибка', 'Возникла ошибка при удалении истории');
    }
  };

  const handleSaveSettings = () => {
    const selected = Object.keys(selectedCharts).filter((key) => selectedCharts[key]);
    if (selected.length === 0) {
      Alert.alert('Ошибка', 'Пожалуйста, выберите хотя бы один график.');
      return;
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Button title="Очистить историю" onPress={handleClearHistory} color="#FF6F61" />

      <Text style={styles.title}>Настройки аналитики</Text>
      <Text style={styles.subtitle}>Выберите типы графиков для отображения:</Text>

      <View style={styles.checkboxContainer}>
        {['lineChart', 'pieChart', 'barChart'].map((chartType, index) => (
          <View style={styles.checkboxItem} key={index}>
            <CheckBox
              value={selectedCharts[chartType]}
              onValueChange={() => toggleChartSelection(chartType)}
            />
            <Text style={styles.checkboxLabel}>{chartType}</Text>
          </View>
        ))}
      </View>

      <Button title="Сохранить настройки" onPress={handleSaveSettings} color="#4A90E2" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0faff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#2b3c40',
  },
  checkboxContainer: {
    flexDirection: 'column',
    marginVertical: 10,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#2b3c40',
  },
});

export default SettingsScreen;
