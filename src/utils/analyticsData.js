import moment from 'moment';

/**
 * Group habits by date.
 * @param {Array} habits - List of habit entries.
 * @returns {Object} - Habits grouped by date.
 */
export const groupByDate = habits => {
  return habits.reduce((acc, habit) => {
    const date = moment(habit.timestamp).format('YYYY-MM-DD'); // Group by day
    if (!acc[date]) acc[date] = [];
    acc[date].push(habit);
    return acc;
  }, {});
};

/**
 * Calculate mood change (difference between moodBefore and moodAfter).
 * @param {Array} habits - List of habit entries.
 * @returns {Array} - Array of mood change data by date.
 */
export const calculateMoodChange = habits => {
  const groupedData = groupByDate(habits);
  return Object.keys(groupedData).map(date => {
    const moods = groupedData[date].map(
      habit => habit.moodAfter - habit.moodBefore,
    );
    const averageMoodChange = moods.reduce((a, b) => a + b, 0) / moods.length;
    return {date, moodChange: averageMoodChange};
  });
};

/**
 * Calculate habit frequency.
 * @param {Array} habits - List of habit entries.
 * @returns {Array} - Array of habit frequency data.
 */
export const calculateHabitFrequency = habits => {
  const frequency = {};
  habits.forEach(habit => {
    if (!frequency[habit.habit]) {
      frequency[habit.habit] = 0;
    }
    frequency[habit.habit]++;
  });
  return Object.keys(frequency).map(habit => ({
    habit,
    count: frequency[habit],
  }));
};

/**
 * Calculate mood distribution (average mood score).
 * @param {Array} habits - List of habit entries.
 * @returns {Array} - Array of mood distribution data.
 */
export const calculateMoodDistribution = habits => {
  const distribution = {};
  habits.forEach(habit => {
    const moodAvg = (habit.moodBefore + habit.moodAfter) / 2;
    if (!distribution[habit.habit]) {
      distribution[habit.habit] = {habit, totalMood: 0, count: 0};
    }
    distribution[habit.habit].totalMood += moodAvg;
    distribution[habit.habit].count++;
  });
  return Object.values(distribution).map(item => ({
    habit: item.habit,
    moodAverage: item.totalMood / item.count,
  }));
};
