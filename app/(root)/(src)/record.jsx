import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import { Link } from 'expo-router';
import Calendar from './calendar'; // Import the new Calendar component

export default function RecordScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [activities, setActivities] = useState([
    {
      id: '1',
      date: 'Nov 24 - 30',
      activity: 'Strength',
      time: '10:45',
      calories: 263,
      Ftime: '1:30',
      Fdate: 'Nov 26',
    },
    {
      id: '2',
      date: 'Nov 24 - 30',
      activity: 'Upper Body Day 1',
      time: '10:45 PM',
      calories: 263,
      Ftime: '1:30',
      Fdate: 'Nov 26',
    },
    {
      id: '3',
      date: 'Nov 24 - 30',
      activity: 'Lower Body Day 1',
      time: '10:45 PM',
      calories: 263,
      Ftime: '1:30',
      Fdate: 'Nov 26',
    },
    {
        id: '4',
        date: 'Nov 24 - 30',
        activity: 'Flexibility',
        time: '10:45 PM',
        calories: 263,
        Ftime: '1:30',
        Fdate: 'Nov 26',
      },
  ]);

  const renderActivityItem = ({ item }) => (
    <TouchableOpacity style={styles.activityItem}>
      <View style={styles.activityHeader}>
        <Text style={styles.dateRange}>{item.date}</Text>
        <Text style={styles.activityCount}>1 strength activity</Text>
      </View>
      <View style={styles.activityDetails}>
        <View style={styles.activityIconWrapper}>
          <Image
            source={{ uri: item.icon }} // Replace with actual image path or URI
            style={styles.activityIcon}
          />
        </View>
        <View style={styles.activityInfo}>
          <Text style={styles.activityName}>{item.activity}</Text>
          <Text style={styles.activityMeta}>
            {item.time} • {item.calories} kcal
          </Text>
        </View>
      </View>
      
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
        <ScrollView>
            <View style={styles.topBackground}>
              <TouchableOpacity style={styles.backButton}>
                <Link href="/report">
                    <Image source={require('../../../assets/images/back.png')} style={styles.backIcon} />
                </Link>
              </TouchableOpacity>
              <Text style={styles.title}>History</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.calendarContainer}>
                {/* Replace static calendar with the new Calendar component */}
                <Calendar />

              </View>

            </View>

            <FlatList 
              style={styles.activityList}
              data={activities}
              renderItem={renderActivityItem}
              keyExtractor={(item, index) => index.toString()} // Corrected this line
              nestedScrollEnabled={true} // Enables nested scrolling
            />

        </ScrollView>
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF7FA',
  },
  topBackground: {
    backgroundColor: '#94C5CC',
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  calendarContainer: {
    backgroundColor: '#A6D6D4',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
    flexShrink: 0,
  },
  
  activityList: {
    flex: 1,
    padding: 10,
  },
  activityItem: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateRange: {
    fontWeight: 'bold',
    color: '#7A7A7A',
  },
  activityCount: {
    fontSize: 12,
    color: '#7A7A7A',
  },
  activityDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  activityIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  activityMeta: {
    fontSize: 14,
    color: '#7A7A7A',
  },
  
});
