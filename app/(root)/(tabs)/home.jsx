import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, SafeAreaView,ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker'; 
import { Link } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [chartWidth, setChartWidth] = useState(screenWidth - 70); // Initial width
  const [selectedOption, setSelectedOption] = useState("weekly"); // State to track Weekly/Monthly
  const [activities, setActivities] = useState({ calories: 0, hours: 0, completed_exercises: 0 });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [sessionEmail, setSessionEmail] = useState(null);


  useEffect(() => {
    const onChange = () => setChartWidth(Dimensions.get('window').width - 70);
    Dimensions.addEventListener('change', onChange);

    fetchData();

    return () => Dimensions.removeEventListener('change', onChange);
  }, [selectedOption]);


  const fetchData = async () => {
    try {
      setLoading(true);
  
      const response = await fetch(`http://localhost/xmp/EFA/home.php`, {
        method: 'GET',
        credentials: 'include', // Include cookies/session
      });
  
      const data = await response.json();
      console.log("Fetched home data:", data);
  
      if (data.status === "unauthorized") {
        setUserData("Not Logged In");
        return;
      }

      if (data.status === "ok" && data.message === "empty") {
        setUserData("Database Empty");
        return;
      }
  
      if (data.status === "ok") {
        setUserData({ username: data.username, email: data.email });
        
        // For now, just log the `user_home` data
        console.log("User Home Data:", data.user_home);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.upperBackground} />

    
        <Text className="text-center font-poppins-bold text-primary-100 text-3xl">
           {/* space */}
        </Text>

        {/* Welcome Section */}
        <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.userName}>
            {userData?.username ? `${userData.username}!` : "Guest!"}
            </Text>
        </View>

        {sessionEmail && (
        <Text style={{ textAlign: 'center', fontSize: 12, color: 'gray' }}>
          Logged in as: {sessionEmail}
        </Text>
        )}

        {/* Activities Progress Section */}
        <View style={styles.activitiesContainer}>
          <Text style={styles.activitiesTitle}>Activities Progress</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <View style={{ alignItems: 'center' }}>
              <FontAwesome name="fire" size={30} color="black" />
              <Text>{activities.calories}</Text>
              <Text>Calories</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <FontAwesome name="clock-o" size={30} color="black" />
              <Text>{activities.hours}</Text>
              <Text>Hours</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <FontAwesome name="check-circle" size={30} color="black" />
              <Text>{activities.completed_exercises}</Text>
              <Text>Completed Exercises</Text>
            </View>
          </View>
        </View>

        {/* Statistics Section 
        <View style={styles.statisticsContainer}>
          
          <TouchableOpacity>
            <Text style={styles.viewLink}>View</Text>
          </TouchableOpacity>
        </View>
        */}
        <Text style={styles.statisticsTitle}>Statistics</Text>


        {/* Goal Progress Section */}
        <View style={styles.goalProgressContainer}>
        
          <View style={styles.goalProgressHeader}>
              <Text style={styles.goalProgressTitle}>Goal Progress</Text>

              {/* Week/Month Picker */}
              <Picker
                selectedValue={selectedOption}
                style={styles.picker}
                onValueChange={(value) => setSelectedOption(value)}
              >
                <Picker.Item label="Weekly" value="weekly" />
                <Picker.Item label="Monthly" value="monthly" />
              </Picker>

          </View>
                
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <BarChart
            data={{
              labels: chartData.map(item => item.label),
              datasets: [{ data: chartData.map(item => item.value) }],
            }}
            width={chartWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#eafafc',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#eafafc',
              decimalPlaces: 0,
              color: () => '#94C5CC',
              labelColor: () => '#000000',
              barPercentage: 0.7,
              propsForBackgroundLines: { strokeWidth: 0.5, stroke: '#d3d3d3' },
            }}
            style={{ borderRadius: 10 }}
          />
        )}
        </View>

        {/* Challenge Section */}
        <View style={styles.challengeContainer}>
          <Text style={styles.challengeTitle}>Day 2 of your 30-day Upper Body Challenge</Text>
        </View>

        {/* Daily Section */}
        <View style={styles.dailyContainer}>
          <View style={styles.dailySection}>
            <Text style={styles.dailyTitle}>Daily Exercise</Text>
            <Text style={styles.dailyItem}>Warm up</Text>
            <Text style={styles.dailyItem}>Stretching</Text>
          </View>
          <View style={styles.dailySection}>
            <Text style={styles.dailyTitle}>Daily Reminder</Text>
            <Text style={styles.dailyItem}>Sleep 8 - 12 hrs</Text>
            <Text style={styles.dailyItem}>Drink 8 - 12 glasses of water</Text>
          </View>
        </View>

        <View style={styles.encouragementContainer}>
          <Text style={styles.encouragementText}>
            Keep Going! You're further along than you were yesterday!
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  picker: {
    height: 50,
    width: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  upperBackground: {
    height: 200,
    backgroundColor: '#94C5CC',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerContainer: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 18,
    color: '#FFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  activitiesContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  activitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activitiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityItem: {
    alignItems: 'center',
    width: '30%',
  },
  activityValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  activityLabel: {
    fontSize: 14,
    color: '#666',
  },
  statisticsContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  statisticsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10
  },
  viewLink: {
    color: '#1e90ff',
    textAlign: 'right',
  },
  goalProgressContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  goalProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalProgressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chartContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  challengeContainer: {
    marginBottom: 20,
    backgroundColor: '#d4f4f4',
    padding: 15,
    borderRadius: 10,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dailyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dailySection: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  dailyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dailyItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  encouragementContainer: {
    backgroundColor: '#fffbe0',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  encouragementText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  navItem: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  navText: {
    fontSize: 14,
    color: '#666',
  },
  activeNavItem: {
    backgroundColor: '#a6d6d4',
    borderRadius: 5,
  },
  activeNavText: {
    color: '#fff',
  },
});