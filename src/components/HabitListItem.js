import React from 'react';
import { FlatList, View, Text } from 'react-native';

const HabitListItem = ({ habits }) => {
  const renderHabit = ({ item }) => (
    <View style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}>
      <Text>Activity: {item.activity}</Text>
      <Text>Mood: {item.mood}/10</Text>
      <Text>Comment: {item.comment}</Text>
      <Text>Date: {item.date}</Text>
    </View>
  );

  return (
    <FlatList
      data={habits}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderHabit}
    />
  );
};

export default HabitListItem;
