import React, {useEffect, useState} from 'react';
import {View, ScrollView, Dimensions, Text, StyleSheet} from 'react-native';
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
    <ScrollView contentContainerStyle={styles.container}>
      {/* Line Chart for Mood Change */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Daily Mood Changes</Text>
        {moodData && moodData.length > 0 ? (
          <LineChart
            data={{
              labels: moodData.map(item => item.date),
              datasets: [
                {
                  data: moodData.map(item => item.moodChange),
                  color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`, 
                  strokeWidth: 3,
                },
              ],
            }}
            width={Dimensions.get('window').width - 20}
            height={250}
            chartConfig={chartConfig}
            bezier
            style={styles.chartStyle}
          />
        ) : (
          <Text>No data available</Text>
        )}
      </View>

      {/* Bar Chart for Habit Frequency */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Habit Completion Frequency</Text>
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
            chartConfig={chartConfig}
            style={styles.chartStyle}
          />
        ) : (
          <Text>No data available</Text>
        )}
      </View>

      {/* Pie Chart for Mood Distribution */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Mood Distribution by Habit</Text>
        {moodDistribution && moodDistribution.length > 0 ? (
          <PieChart
            data={moodDistribution.map((item, index) => ({
              name: item.habit.habit,
              population: item.moodAverage,
              color: index % 2 === 0 ? '#66BB6A' : '#43A047', 
              legendFontColor: '#4CAF50',
              legendFontSize: 15,
            }))}
            width={Dimensions.get('window').width - 20}
            height={300}
            chartConfig={chartConfig}
            accessor="population"
            paddingLeft="15"
            center={[10, 50]}
            absolute
            style={styles.chartStyle}
          />
        ) : (
          <Text>No data available</Text>
        )}
      </View>
    </ScrollView>
  );
};

const chartConfig = {
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
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#f0faff',
  },
  chartContainer: {
    marginVertical: 15,
    alignItems: 'center',
    width: '100%',
  },
  chartTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
  },
  chartStyle: {
    borderRadius: 16,
    marginVertical: 10,
  },
});

export default AnalyticsScreen;
