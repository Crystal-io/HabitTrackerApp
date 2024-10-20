// src/screens/Settings.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const Settings = ({ navigation }) => {
  const [selectedCharts, setSelectedCharts] = useState({
    lineChart: false,
    pieChart: false,
    barChart: false,
  });

  const handleCheckBoxChange = (chartType) => {
    setSelectedCharts((prev) => ({
      ...prev,
      [chartType]: !prev[chartType],
    }));
  };

  const handleSaveSettings = () => {
    const selected = Object.keys(selectedCharts).filter((key) => selectedCharts[key]);
    if (selected.length === 0) {
      alert('Пожалуйста, выберите хотя бы один график.');
      return;
    }
    // Здесь вы можете сохранить настройки, например, в AsyncStorage
    navigation.goBack(); // Возврат на предыдущий экран
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Настройки аналитики</Text>
      <Text>Выберите типы графиков для отображения:</Text>
      <View>
        <CheckBox
          value={selectedCharts.lineChart}
          onValueChange={() => handleCheckBoxChange('lineChart')}
        />
        <Text>Линейный график</Text>

        <CheckBox
          value={selectedCharts.pieChart}
          onValueChange={() => handleCheckBoxChange('pieChart')}
        />
        <Text>Круговая диаграмма</Text>

        <CheckBox
          value={selectedCharts.barChart}
          onValueChange={() => handleCheckBoxChange('barChart')}
        />
        <Text>Столбчатая диаграмма</Text>
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
});

export default Settings;
