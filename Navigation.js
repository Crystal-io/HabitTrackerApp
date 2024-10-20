// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SurveyScreen from './src/screens/SurveyScreen'; // Импорт экрана опроса
import HabitList from './src/screens/HabitList';
import Analytics from './src/screens/Analytics';
import Settings from './src/screens/Settings';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SurveyScreen">
        <Stack.Screen 
          name="SurveyScreen" 
          component={SurveyScreen} 
          options={{ title: 'Опросник' }} 
        />
        <Stack.Screen 
          name="HabitList" 
          component={HabitList} 
          options={{ title: 'Список привычек' }} 
        />
        <Stack.Screen 
          name="Analytics" 
          component={Analytics} 
          options={{ title: 'Аналитика' }} 
        />
        <Stack.Screen 
          name="Settings" 
          component={Settings} 
          options={{ title: 'Настройки' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
