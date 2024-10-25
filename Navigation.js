import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/screens/WelcomeScreen'; // Импорт нового экрана
import SurveyScreen from './src/screens/SurveyScreen';
import HabitListScreen from './src/screens/HabitListScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen"> 
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ title: 'Welcome', headerShown: false }} // Скрыть заголовок для более чистого приветственного экрана
        />
        <Stack.Screen name="SurveyScreen" component={SurveyScreen} options={{ title: 'Опросник' }} />
        <Stack.Screen name="HabitListScreen" component={HabitListScreen} options={{ title: 'Список привычек' }} />
        <Stack.Screen name="AnalyticsScreen" component={AnalyticsScreen} options={{ title: 'Аналитика' }} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'Настройки' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
