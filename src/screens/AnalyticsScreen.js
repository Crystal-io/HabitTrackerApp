import React, {useEffect, useState} from 'react';
import {View, ScrollView, Dimensions, Text} from 'react-native';
import {LineChart, BarChart, PieChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  calculateMoodChange,
  calculateHabitFrequency,
  calculateMoodDistribution,
} from '../utils/analyticsData';

const AnalyticsScreen = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      const storedHabits = await AsyncStorage.getItem('habits');
      setHabits(storedHabits ? JSON.parse(storedHabits) : []);
    };

    fetchHabits();
  }, []);

  const moodData = calculateMoodChange(habits);
  const habitFrequency = calculateHabitFrequency(habits);
  const moodDistribution = calculateMoodDistribution(habits);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
      {/* Line Chart for Mood Change */}
      <View>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            marginVertical: 15,
            fontWeight: 'bold',
            color: '#4A90E2',
          }}>
          Daily Mood Changes
        </Text>
        {moodData && moodData.length > 0 ? (
          <LineChart
            data={{
              labels: moodData.map(item => item.date),
              datasets: [
                {
                  data: moodData.map(item => item.moodChange),
                  color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`, // Line color
                  strokeWidth: 3,
                },
              ],
            }}
            width={Dimensions.get('window').width - 20}
            height={250}
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: '#f0faff',
              backgroundGradientFrom: '#e1f5fe',
              backgroundGradientTo: '#b3e5fc',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '5',
                strokeWidth: '3',
                stroke: '#4A90E2',
              },
            }}
            bezier
            style={{
              marginVertical: 10,
              borderRadius: 16,
            }}
          />
        ) : (
          <Text>No data available</Text>
        )}
      </View>

      {/* Bar Chart for Habit Frequency */}
      <View>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            marginVertical: 15,
            fontWeight: 'bold',
            color: '#FF6F61',
          }}>
          Habit Completion Frequency
        </Text>
        {habitFrequency && habitFrequency.length > 0 ? (
          <BarChart
            data={{
              labels: habitFrequency.map(item => item.habit),
              datasets: [
                {
                  data: habitFrequency.map(item => item.count),
                },
              ],
            }}
            width={Dimensions.get('window').width - 20}
            height={250}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: '#fff5f5',
              backgroundGradientFrom: '#ffebee',
              backgroundGradientTo: '#ffcccb',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 105, 97, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 105, 97, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForBackgroundLines: {
                strokeDasharray: '', // Solid lines for grid
                strokeWidth: 0.5,
              },
            }}
            style={{
              marginVertical: 10,
              borderRadius: 16,
            }}
          />
        ) : (
          <Text>No data available</Text>
        )}
      </View>

      {/* Pie Chart for Mood Distribution */}
      <View>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            marginVertical: 15,
            fontWeight: 'bold',
            color: '#66BB6A',
          }}>
          Mood Distribution by Habit
        </Text>
        {moodDistribution && moodDistribution.length > 0 ? (
          <PieChart
            data={moodDistribution.map((item, index) => ({
              name: item.habit.habit, // Access the habit name directly
              population: item.moodAverage,
              color: index % 2 === 0 ? '#66BB6A' : '#43A047', // Alternate green shades
              legendFontColor: '#4CAF50',
              legendFontSize: 15,
            }))}
            width={Dimensions.get('window').width - 20}
            height={300}
            chartConfig={{
              backgroundColor: '#e8f5e9',
              backgroundGradientFrom: '#c8e6c9',
              backgroundGradientTo: '#a5d6a7',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="population"
            paddingLeft="15"
            center={[10, 50]}
            absolute
            style={{
              marginVertical: 10,
              borderRadius: 16,
            }}
          />
        ) : (
          <Text>No data available</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default AnalyticsScreen;
