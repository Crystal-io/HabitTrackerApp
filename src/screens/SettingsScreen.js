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
      <Button title="Очистить историю" onPress={handleClearHistory} /> 

      <Text style={styles.title}>Настройки аналитики</Text>
      <Text>Выберите типы графиков для отображения:</Text>
      
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxItem}>
          <CheckBox
            value={selectedCharts.lineChart}
            onValueChange={() => toggleChartSelection('lineChart')}
          />
          <Text style={styles.checkboxLabel}>Линейный график</Text>
        </View>

        <View style={styles.checkboxItem}>
          <CheckBox
            value={selectedCharts.pieChart}
            onValueChange={() => toggleChartSelection('pieChart')}
          />
          <Text style={styles.checkboxLabel}>Круговая диаграмма</Text>
        </View>

        <View style={styles.checkboxItem}>
          <CheckBox
            value={selectedCharts.barChart}
            onValueChange={() => toggleChartSelection('barChart')}
          />
          <Text style={styles.checkboxLabel}>Столбчатая диаграмма</Text>
        </View>
      </View>

      <Button title="Сохранить настройки" onPress={handleSaveSettings} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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
  },
});

export default SettingsScreen;
