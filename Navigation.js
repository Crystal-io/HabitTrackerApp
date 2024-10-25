import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SurveyScreen from './src/screens/SurveyScreen';
import HabitListScreen from './src/screens/HabitListScreen'; // обновленный импорт
import AnalyticsScreen from './src/screens/AnalyticsScreen.js';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SurveyScreen">
        <Stack.Screen
          name="SurveyScreen"
          component={SurveyScreen}
          options={{title: 'Опросник'}}
        />
        <Stack.Screen
          name="HabitListScreen"
          component={HabitListScreen}
          options={{title: 'Список привычек'}}
        />
        <Stack.Screen
          name="AnalyticsScreen"
          component={AnalyticsScreen}
          options={{title: 'Аналитика'}}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{title: 'Настройки'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
