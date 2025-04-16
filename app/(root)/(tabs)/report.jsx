import { SafeAreaView, ScrollView, View, Text, StyleSheet,TouchableOpacity,Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { LineChart } from "react-native-chart-kit";



const report = () => {
  const [activeView, setActiveView] = useState('Daily');
  
  const chartData = {
    Daily: [
      { label: 'Morning', value: 50 },
      { label: 'Afternoon', value: 100 },
      { label: 'Evening', value: 70 },
    ],
    Weekly: [
      { label: 'Mon', value: 30 },
      { label: 'Tue', value: 60 },
      { label: 'Wed', value: 90 },
      { label: 'Thu', value: 120 },
      { label: 'Fri', value: 80 },
      { label: 'Sat', value: 50 },
      { label: 'Sun', value: 70 },
    ],
    Monthly: [
      { label: 'Week 1', value: 200 },
      { label: 'Week 2', value: 150 },
      { label: 'Week 3', value: 180 },
      { label: 'Week 4', value: 220 },
    ],
  };

  // Function to calculate percentage based on the highest value in the active data set
  const calculatePercentage = (value, maxValue) => {
    return (Math.round((value / maxValue) * 100 * 10) / 10).toFixed(1);  // Rounded to 1 decimal place
  };

  // Get the maximum value for the current view
  const maxValue = Math.max(...chartData[activeView].map(data => data.value));

    const completedDates = ['23', '25', '28'];
    const weekDates = generateWeekDates();

    const [bmi, setBmi] = useState(0); // Starts at 0 to represent "not connected"
  
    // Simulating fetching BMI data from a database
    useEffect(() => {
      const fetchBMI = async () => {
        // Mock API call
        const fetchedBmi = 5; // Replace with actual API response
        setTimeout(() => setBmi(fetchedBmi), 1000); // Simulating delay
      };
      fetchBMI();
    }, []);

    // Calculate BMI bubble and progress based on BMI value
    const bmiWidth = Math.min((bmi / 50) * 100, 100); // Assuming max BMI = 50
    const bmiCategory = 
      bmi < 10 ? 'Light' :
      bmi < 30 ? 'Normal' :
      bmi < 50 ? 'Heavy' :
      bmi < 70 ? 'Overweight' : 'Obesity';
    
      const screenWidth = Dimensions.get("window").width - 40;

      const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            data: [44, 40, 30, 25, 15, 10],
            color: (opacity = 1) => `rgba(148, 197, 204, ${opacity})`, // Line color
            strokeWidth: 2, // Line thickness
          },
        ],
        legend: ["weight loss tracker"], // Optional
      };
    
      const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Axis and labels color
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Labels color
        strokeWidth: 2, // Line thickness
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6", // Dot radius
          strokeWidth: "0",
          stroke: "#ffa726", // Dot border color
        },
      };
    
    

    return (
    <SafeAreaView>
      <ScrollView>
          <View style={styles.topBackground}>
            <Text style={styles.title}>Report</Text>
          </View>
          <View style={styles.container}>
            {/* Tab Buttons */}
             <View style={styles.tabs}>
               {['Daily', 'Weekly', 'Monthly'].map((view) => (
                 <TouchableOpacity
                   key={view}
                   style={[styles.tabButton, activeView === view && styles.activeTab]}
                   onPress={() => setActiveView(view)}
                 >
                   <Text style={activeView === view ? styles.tabTextActive : styles.tabText}>
                     {view}
                   </Text>
                 </TouchableOpacity>
               ))}
             </View>
             
             {/* Chart Section */}
             <View style={styles.chartContainer}>
               <Text style={styles.chartHeader}>Burn Calories</Text>
               <Text style={styles.calories}>250kcal</Text>
               <View style={styles.barChart}>
                 {chartData[activeView].map((data, index) => {
                   const percentage = calculatePercentage(data.value, maxValue); // Calculate percentage
                   return (
                     <View key={index} style={{ alignItems: 'center' }}>
                       <View style={[styles.bar, { height: data.value }]} />
                       <Text style={styles.barLabel}>{data.label}</Text>
                       <Text style={styles.percentageLabel}>{percentage}%</Text> {/* Display percentage */}
                     </View>
                   );
                 })}
               </View>

              {/* Legend Section */}
              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#7ac4c0' }]} />
                  <Text style={styles.legendText}>Calories Burned</Text>
                </View>
                {/* Add more legend items if necessary */}
              </View>

             </View>
            {/* History Section */}
            <View style={styles.historyContainer}>
              <Text style={styles.historyHeader}>History</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.historyDates}>
                  {weekDates.map(({ day, date }) => (
                    <View style={styles.circle} key={date}>
                      <Text style={styles.dateText}>{date}</Text>
                      <Text style={styles.dayText}>{day}</Text>
                      {completedDates.includes(date.toString()) && <View style={styles.whiteDot} />}
                    </View>
                  ))}
                </View>
              </ScrollView>
              {/* Integrated Button for Records Navigation */}
              <TouchableOpacity style={styles.recordsButton}>
                <Link href="/record"> 
                  <Text style={styles.recordsButtonText}>Go to Records</Text>
                </Link> 
              </TouchableOpacity>
            </View>
            
            {/* BMI Section */}
            <View style={styles.bmiContainer}>
                <Text style={styles.bmiHeader}>Body Index</Text>

                <View style={styles.bmiRow}>
                  <Text style={styles.bmiLabel}>BMI</Text>
                </View>

                <View style={styles.bmiRow}>
                  <Text style={styles.bmiValue}>{bmi > 0 ? `${bmi.toFixed(1)} (${bmiCategory})` : "Fetching..."}</Text>
                </View>

                <View style={styles.bmiProgressContainer}>
                  <Text style={styles.bmiProgressText}>Light</Text>
                  <Text style={styles.bmiProgressText}>Normal</Text>
                  <Text style={styles.bmiProgressText}>Heavy</Text>
                  <Text style={styles.bmiProgressText}>Overweight</Text>
                  <Text style={styles.bmiProgressText}>Obesity</Text>
                </View>

                <View style={styles.bmiProgressBarContainer}>
                  <View style={styles.bmiProgressBar}>
                    <View style={[styles.bmiIndicator, { width: `${bmiWidth}%` }]} />
                  </View>

                  {bmi > 0 && (
                    <View style={[styles.bmiBubble, { left: `${bmiWidth - 5}%` }]}>
                      <Text style={styles.bmiBubbleText}>{bmi.toFixed(1)} BMI</Text>
                    </View>
                  )}
                </View>
            </View>

            <View>   
              <LineChart
                data={data}
                width={screenWidth} // Chart width
                height={220} // Chart height
                chartConfig={chartConfig}
                bezier // Smooth curves
                style={{
                  marginVertical: 10,
                  marginHorizontal: 19,
                  borderRadius: 16,
                }}
              />
            </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const getDayName = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', { weekday: 'short' }); // Example: "Mon"
};

// Generate dates for the current week dynamically
const generateWeekDates = () => {
  const today = new Date();
  const weekDates = [];

  // Start from Monday
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    weekDates.push({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
    });
  }
  return weekDates;
};



export default report

const styles = StyleSheet.create({
  topBackground: {
    backgroundColor: '#94C5CC',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0, 
    paddingLeft: 0, 
    paddingRight: 0, 
    paddingTop: 0, 
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f7fa',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  percentageLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#555',
  },
  activeTab: {
    backgroundColor: '#a6d6d4',
  },
  tabText: {
    color: '#7d7d7d',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  chartContainer: {
    backgroundColor: '#d1edf0',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  chartHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b4b4b',
  },
  calories: {
    fontSize: 14,
    marginVertical: 5,
    color: '#4b4b4b',
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    marginTop: 20,
    width: '80%',
  },
  bar: {
    width: 20,
    backgroundColor: '#7ac4c0',
    borderRadius: 10,
  },
  barLabel: {
    marginTop: 5,
    fontSize: 10,
    textAlign: 'center',
    color: '#4b4b4b',
  },
  historyContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 3,
  },
  historyHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4b4b4b',
  },
  historyDates: {
    flexDirection: 'row',
  },
  circle: {
    backgroundColor: '#d1edf0',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    position: 'relative',
  },
  dateText: {
    fontWeight: 'bold',
    color: '#4b4b4b',
  },
  dayText: {
    fontSize: 10,
    color: '#7d7d7d',
  },
  whiteDot: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    position: 'absolute',
    bottom: 5,
  },
  recordsButton: {
    marginTop: 15,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#a6d6d4',
    borderRadius: 20,
  },
  recordsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  bmiContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 15,
    elevation: 3,
  },
  bmiHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4b4b4b',
  },
  bmiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bmiLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4b4b4b',
  },
  bmiValue: {
    fontSize: 14,
    color: '#7d7d7d',
    left: 250,
    top: -20,
    alignSelf: 'center',
  },
  bmiProgressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  bmiProgressText: {
    fontSize: 10,
    color: '#7d7d7d',
  },
  bmiProgressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  bmiIndicator: {
    height: '100%',
    backgroundColor: '#7ac4c0',
    borderRadius: 5,
  },
  bmiBubble: {
    position: 'absolute',
    top: -30,
    width: 50,
    height: 25,
    backgroundColor: '#7ac4c0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  bmiBubbleText: {
    color: '#fff',
    fontSize: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff', // Base color for bottom navigation
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
    backgroundColor: '#a6d6d4', // Highlighted tab background color
    borderRadius: 5,
  },
  activeNavText: {
    color: '#fff', // Highlighted tab text color
  },

  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 15,
    height: 15,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#555',
  },
})