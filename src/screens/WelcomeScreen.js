import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
         // Фон      // Круглая кнопка "Начать"     // Кнопка для перехода к аналитике
    <View style={styles.container}>

      <Image source={require('../assets/images/welcome_screen.jpg')} style={styles.backgroundImage} />


      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('SurveyScreen')}>
        <Text style={styles.startButtonText}>Начать</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.analyticsButton} onPress={() => navigation.navigate('AnalyticsScreen')}>
        <Text style={styles.analyticsButtonText}>Аналитика</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  startButton: {
    width: 180,
    height: 180,
    borderRadius: 120,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  startButtonText: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
  },
  analyticsButton: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: '#77DDE7',
  },
  analyticsButtonText: {
    fontSize: 16,
    color: 'brown',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
