import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());

  // Get the days for the current month
  const getDaysInMonth = () => {
    const startOfMonth = currentDate.clone().startOf('month');
    const endOfMonth = currentDate.clone().endOf('month');
    const days = [];

    // Add previous month's last days (to fill week row)
    const startOfWeek = startOfMonth.startOf('week');
    const endOfWeek = endOfMonth.endOf('week');

    let day = startOfWeek.clone();
    while (day <= endOfWeek) {
      days.push(day.clone());
      day.add(1, 'day');
    }
    return days;
  };

  // Navigate to next or previous month
  const handleMonthChange = (direction) => {
    if (direction === 'next') {
      setCurrentDate(currentDate.clone().add(1, 'month'));
    } else {
      setCurrentDate(currentDate.clone().subtract(1, 'month'));
    }
  };

  const renderDay = (day) => {
    const isCurrentMonth = day.month() === currentDate.month();
    const isToday = day.isSame(moment(), 'day');

    return (
      <View
        key={day.format('D')}
        style={[
          styles.dayContainer,
          !isCurrentMonth && styles.notCurrentMonth,
          isToday && styles.today,
        ]}
      >
        <Text
          style={[
            styles.dayText,
            !isCurrentMonth && styles.notCurrentMonthText,
          ]}
        >
          {day.date()}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.calendar}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleMonthChange('prev')}>
          <Icon name="chevron-left" size={20} color="#346473" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentDate.format('MMMM YYYY')}</Text>
        <TouchableOpacity onPress={() => handleMonthChange('next')}>
          <Icon name="chevron-right" size={20} color="#346473" />
        </TouchableOpacity>
      </View>

      {/* Week Days */}
      <View style={styles.weekdays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Text key={day} style={styles.weekdayText}>
            {day}
          </Text>
        ))}
      </View>

      {/* Days */}
      <FlatList
        data={getDaysInMonth()}
        numColumns={7}
        keyExtractor={(item) => item.format('DD-MM-YYYY')}
        renderItem={({ item }) => renderDay(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    margin: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  monthText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#346473',
  },
  weekdays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    color: '#346473',
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
  },
  dayText: {
    fontSize: 16,
    color: '#000',
  },
  notCurrentMonth: {
    backgroundColor: '#f0f0f0',
  },
  notCurrentMonthText: {
    color: '#bbb',
  },
  today: {
    borderRadius: 50,
    backgroundColor: '#25A55F',
  },
});

export default Calendar;
