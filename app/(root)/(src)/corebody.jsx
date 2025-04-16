import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Link} from 'expo-router';

export default function CoreBodyScreen({ navigation }) {
  const [selectedLevel, setSelectedLevel] = useState('Beginner'); // Current selected level
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility state

  // Exercise data for each level (Core Body exercises)
  const exerciseData = {
    Beginner: [
      { title: 'Sit-ups', time: '45 secs', reps: '10 reps', burn: '20 calories', icon: require('../../../assets/icons/strengthImage.png') },
      { title: 'Heel Touches', time: '1 min', reps: '20 reps per side', burn: '25 calories', icon: require('../../../assets/icons/strengthImage.png') },
      { title: 'Cross-over Crunches', time: '1 min', reps: '20 reps per side', burn: '30 calories', icon: require('../../../assets/icons/strengthImage.png') },
      { title: 'Abdominal Crunches', time: '2 mins', reps: '25 reps', burn: '30 calories', icon: require('../../../assets/icons/strengthImage.png') },
      { title: 'V-ups', time: '1 min', reps: '20 reps', burn: '25 calories', icon: require('../../../assets/icons/strengthImage.png') },
      { title: 'Leg Raises', time: '2 mins', reps: '25 reps', burn: '30 calories', icon: require('../../../assets/icons/strengthImage.png') },
    ],
    Intermediate: [
      { title: 'Sit-ups', time: '1 min', reps: '15 reps', burn: '25 calories', icon: require('../../../assets/icons/strengthImage.png') },
      { title: 'Heel Touches', time: '1.5 mins', reps: '25 reps per side', burn: '30 calories', icon: require('../../../assets/icons/strengthImage.png') },
      { title: 'Cross-over Crunches', time: '1.5 mins', reps: '25 reps per side', burn: '35 calories', icon: require('../../../assets/icons/strengthImage.png') },
      { title: 'Abdominal Crunches', time: '2 mins', reps: '30 reps', burn: '35 calories', icon: require('../../../assets/icons/strengthImage.png') },
      { title: 'V-ups', time: '1.5 mins', reps: '25 reps', burn: '30 calories', icon: require('../../../assets/icons/strengthImage.png') },
      { title: 'Leg Raises', time: '2 mins', reps: '30 reps', burn: '35 calories', icon: require('../../../assets/icons/strengthImage.png') },
    ],
    Professional: [
      { title: 'Sit-ups', time: '1 min', reps: '20 reps', burn: '30 calories', icon: require('../../../assets/icons/strengthImage.png') },
      { title: 'Heel Touches', time: '2 mins', reps: '30 reps per side', burn: '35 calories', icon: require('../../../assets/icons/strengthImage.png') },
      { title: 'Cross-over Crunches', time: '2 mins', reps: '30 reps per side', burn: '40 calories', icon: require('../../../assets/icons/strengthImage.png') },
      { title: 'Abdominal Crunches', time: '2.5 mins', reps: '35 reps', burn: '40 calories', icon: require('../../../assets/icons/strengthImage.png') },
      { title: 'V-ups', time: '2 mins', reps: '30 reps', burn: '35 calories', icon: require('../../../assets/icons/strengthImage.png') },
      { title: 'Leg Raises', time: '2.5 mins', reps: '35 reps', burn: '40 calories', icon: require('../../../assets/icons/strengthImage.png') },
    ],
  };
  

  const statsData = {
    Beginner: { exercises: 6, time: '8 minutes', calories: 160 },
    Intermediate: { exercises: 6, time: '10 minutes', calories: 190 },
    Professional: { exercises: 6, time: '12 minutes', calories: 220 },
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header Section */}
      <ImageBackground
        source={require('../../../assets/icons/Core.jpg')}
        style={styles.topBackground}
        imagestyle={[styles.topBackgroundImage, { opacity: 0.7 }]}
      >
        <TouchableOpacity style={styles.backButton} >
          <Link href="/activity"><Image source={require('../../../assets/icons/back.png')} style={styles.backIcon} /></Link>
        </TouchableOpacity>

        <View style={styles.upperbodyWrapper}>
          <Text style={styles.upperbodyTop}>EXERCISES FOR</Text>
          <Text style={styles.upperbodyBottom}>CORE BODY</Text>
        </View>
        <View style={styles.statsOverlay}>
          <View style={styles.statsSection}>
            <Text style={styles.statsLabel}>Total:</Text>
            <Text style={styles.statsValue}>
              {statsData[selectedLevel].exercises} exercises
            </Text>
          </View>

          <View style={styles.statsSection}>
            <Text style={styles.statsLabel}>Time:</Text>
            <Text style={styles.statsValue}>{statsData[selectedLevel].time}</Text>
          </View>

          <View style={styles.statsSection}>
            <Text style={styles.statsLabel}>Calories:</Text>
            <Text style={styles.statsValue}>
              {statsData[selectedLevel].calories} calories
            </Text>
          </View>
        </View>
      </ImageBackground>

      {/* Scrollable Content Below the Fixed Header */}
      <ScrollView style={styles.scrollContainer}>
        {/* Dropdown Button */}
        <View style={styles.dropdownWrapper}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setDropdownVisible(!dropdownVisible)}
          >
            <Text style={styles.dropdownText}>{selectedLevel.toUpperCase()}</Text>
          </TouchableOpacity>

          {/* Dropdown Options */}
          {dropdownVisible && (
            <View style={styles.dropdownMenu}>
              {['Beginner', 'Intermediate', 'Professional']
                .filter((level) => level !== selectedLevel) // Exclude the selected level
                .map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedLevel(level); // Set selected level
                      setDropdownVisible(false); // Hide dropdown
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{level}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>

        {/* Exercise List for Selected Level */}
        {exerciseData[selectedLevel].map((exercise, index) => (
          <View key={index} style={styles.exerciseCard}>
            <Image source={exercise.icon} style={styles.exerciseIcon} />
            <View style={styles.exerciseDetails}>
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>
              <Text style={styles.exerciseSubtitle}>
                Time: {exercise.time} | Repetition: {exercise.reps}
              </Text>
              <Text style={styles.exerciseBurn}>Burn: {exercise.burn}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.startButton}>
          <Link href="/situps"><Text style={styles.startText}>Start Workout</Text></Link>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  topBackground: {
    width: '100%',
    height: 246,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  topBackgroundImage: {
    resizeMode: 'cover',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  upperbodyWrapper: {
    position: 'absolute',
    top: 130, 
    right: 20,
    alignItems: 'flex-end',
    fontSize: 20,
    color: '#FFFFFF',
  },
  upperbodyTop: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  upperbodyBottom: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  statsOverlay: {
    position: 'absolute',
    bottom: 0, 
    width: '100%',
    paddingBottom: 10, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', 
  },
  statsSection: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  statsLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    paddingHorizontal: 35,
  },
  statsValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  dropdownWrapper: {
    marginTop: 30,
    alignItems: 'center',
    marginVertical: 15,
    zIndex: 1000,
  },
  dropdownButton: {
    borderWidth: 2,
    borderColor: '#346473',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 354,
  },
  dropdownText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#346473',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    borderColor: '#346473',
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
    width: 354,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropdownItemText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#346473',
    textTransform: 'uppercase',
  },
  scrollContainer: {
    marginTop: 0,
  },
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 30,
    marginVertical: 7,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  exerciseIcon: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderColor: '#D4CBE5',
    borderRadius: 50,
    borderWidth: 2,
    flexShrink: 0,
  },
  exerciseDetails: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 18,
    color: '#346473',
  },
  exerciseSubtitle: {
    fontSize: 14,
    color: '#888888',
  },
  exerciseBurn: {
    fontSize: 14,
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#94C5CC',
    marginVertical: 20,
    paddingVertical: 12,
    borderRadius: 20,
    width: '80%',  
    alignSelf: 'center', 
  },
  
  startText: {
    textAlign: 'center',
    color: '#346473',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
