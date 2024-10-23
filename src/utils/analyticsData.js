// src/utils/analyticsData.js


// Группировка данных по дате для линейного графика
// Внутри функции groupByDate
export const groupByDate = (habits) => {
  const groupedData = {};
  habits.forEach((habit) => {
    const date = new Date(habit.timestamp).toLocaleDateString();
    if (!groupedData[date]) {
      groupedData[date] = { moodSum: 0, count: 0 };
    }
    groupedData[date].moodSum += habit.moodAfter;
    groupedData[date].count += 1;
  });

  const result = Object.keys(groupedData).map((date) => ({
    x: date,
    y: groupedData[date].moodSum / groupedData[date].count,
  }));

  console.log('groupByDate result:', result); // Отладка: вывод результата функции

  return result;
};

  
  // Подсчет частоты выполнения привычек
  export const calculateHabitFrequency = (habits) => {
    const habitFrequency = {};
    habits.forEach((habit) => {
      if (!habitFrequency[habit.habit]) {
        habitFrequency[habit.habit] = 0;
      }
      habitFrequency[habit.habit] += 1;
    });
    return Object.keys(habitFrequency).map((habit) => ({
      x: habit,
      y: habitFrequency[habit],
    }));
  };
  
  // Распределение настроений по привычкам для круговой диаграммы
  export const calculateMoodDistribution = (habits) => {
    const moodDistribution = {};
    habits.forEach((habit) => {
      if (!moodDistribution[habit.habit]) {
        moodDistribution[habit.habit] = { moodSum: 0, count: 0 };
      }
      moodDistribution[habit.habit].moodSum += habit.moodAfter;
      moodDistribution[habit.habit].count += 1;
    });
    return Object.keys(moodDistribution).map((habit) => ({
      x: habit,
      y: moodDistribution[habit].moodSum / moodDistribution[habit].count,
    }));
  };
  