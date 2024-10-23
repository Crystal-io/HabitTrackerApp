import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
//import { VictoryChart, VictoryLine, VictoryBar, VictoryPie } from 'victory-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { groupByDate, calculateHabitFrequency, calculateMoodDistribution } from '../utils/analyticsData'; // Импорт функций

//const React = require('react');
//const { useEffect, useState } = require('react');
//const { View, ScrollView, Text } = require('react-native');
const { VictoryChart, VictoryLine, VictoryBar, VictoryPie } = require('victory-native');
const AsyncStorage = require('@react-native-async-storage/async-storage');
//const { groupByDate, calculateHabitFrequency, calculateMoodDistribution } = require('../utils/analyticsData');



const AnalyticsScreen = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const storedHabits = await AsyncStorage.getItem('habits');
        setHabits(storedHabits ? JSON.parse(storedHabits) : []);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchHabits();
  }, []);

  // Подготовка данных для графиков
  const moodData = groupByDate(habits);
  const habitFrequency = calculateHabitFrequency(habits);
  const moodDistribution = calculateMoodDistribution(habits);
  // Проверка, есть ли данные для отображения
  //if (!moodData || moodData.length === 0) {
  //  return <Text>Нет данных для отображения</Text>;
  //}

  // Добавьте console.log для проверки данных
  console.log('Mood Data:', moodData); // Данные для линейного графика
  console.log('Habit Frequency:', habitFrequency); // Данные для столбчатой диаграммы
  console.log('Mood Distribution:', moodDistribution); // Данные для круговой диаграммы

  return (
    <ScrollView>
      <View>
        <Text style={{ fontSize: 18, textAlign: 'center', marginVertical: 10 }}>Изменение настроения по дням</Text>
        {moodData && moodData.length > 0 ? (
          <VictoryChart>
            <VictoryLine data={moodData} />
          </VictoryChart>
        ) : (
          <Text>Нет данных для отображения</Text>
        )}
      </View>
  
      <View>
        <Text style={{ fontSize: 18, textAlign: 'center', marginVertical: 10 }}>Частота выполнения привычек</Text>
        {habitFrequency && habitFrequency.length > 0 ? (
          <VictoryChart>
            <VictoryBar data={habitFrequency} />
          </VictoryChart>
        ) : (
          <Text>Нет данных для отображения</Text>
        )}
      </View>
  
      <View>
        <Text style={{ fontSize: 18, textAlign: 'center', marginVertical: 10 }}>Распределение настроений по привычкам</Text>
        {moodDistribution && moodDistribution.length > 0 ? (
          <VictoryPie data={moodDistribution} />
        ) : (
          <Text>Нет данных для отображения</Text>
        )}
      </View>
    </ScrollView>
  );
  
};

//export default AnalyticsScreen;
module.exports = AnalyticsScreen;
