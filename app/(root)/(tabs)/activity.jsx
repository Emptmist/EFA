import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView  } from 'react-native';
import { Link, useRouter } from 'expo-router';

const App = () => {
  const [activeLevel, setActiveLevel] = useState('beginner');

  const challengeDetails = {
    beginner: {
        strength: '12 mins | 120cal |6 | 30',
        flexibility: '3 mins | 10cal |6 | 30',
        cardio: '9 mins | 125cal |6 | 30',
        balance: '9 mins | 58cal |6 | 30',
        upperBody: '18 mins | 138cal |6 | 30',
        lowerBody: '14 mins | 175cal |6 | 30',
        coreBody: '8 mins | 1600cal |6 | 30',
      },
      intermediate: {
        strength: '21 mins | 215cal |8 | 45',
        flexibility: '24 mins | 80cal |8 | 45',
        cardio: '15 mins | 200cal |8 | 45',
        balance: '13 mins | 80cal |8 | 45',
        upperBody: '19 mins | 190cal |8 | 45',
        lowerBody: '17 mins | 215cal |8 | 45',
        coreBody: '10 mins | 190cal |8 | 45',
      },
      professional: {
        strength: '31 mins | 330cal |10 | 60',
        flexibility: '30 mins | 100cal |10 | 60',
        cardio: '21 mins | 215cal |10 | 60',
        balance: '15 mins | 100cal |10 | 60',
        upperBody: '23 mins | 247cal |10 | 60',
        lowerBody: '18 mins | 260cal |10 | 60',
        coreBody: '12 mins | 220cal |10 | 60',
      },
      
  };
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Background */}
      <View style={styles.topBackground}>
        <Text style={styles.title}>Activities</Text>
      </View>
      <ScrollView>

      {/* Exercise Categories */}
      <Text style={styles.headerText}>Exercise Categories :</Text>
      <View style={styles.categoryContainer}>
        <Link href="strength">
          <ExerciseButton title="Strength" image={require('../../../assets/icons/strength.png')} bgColor="#D4CBE5" onPress={() => router.push('/strenght')}/>
        </Link>
        <Link href="flexibility">
          <ExerciseButton title="Flexibility" image={require('../../../assets/icons/flexibility.png')} bgColor="#75DBCD" onPress={() => router.push('/flexibility')}  />
        </Link>
        <Link href="cardio">
          <ExerciseButton title="Cardio" image={require('../../../assets/icons/cardio.png')} bgColor="#F7C59F" onPress={() => router.push('/cardio')}  />
        </Link>
        <Link href="balance">
          <ExerciseButton title="Balance" image={require('../../../assets/icons/balance.png')} bgColor="#A9CEF4" onPress={() => router.push('/balance')}  />
        </Link>
      </View>


      {/* Scrollable Section */}
      <ScrollView horizontal style={styles.scrollContainer}>

          <ExerciseCard 
            title="Upper Body" 
            image={require('../../../assets/icons/upperbody.png')} 
            time="20-25 Minutes"  
            bgColor="#E9C4AA"
            onPress={() => router.push('/upperbody')} 
          />


          <ExerciseCard 
            title="Lower Body" 
            image={require('../../../assets/icons/lowerbody.png')} 
            time="20-25 Minutes"  
            bgColor="#94C5CC"
            onPress={() => router.push('/lowerbody')} 
          />


          <ExerciseCard 
            title="Core Body" 
            image={require('../../../assets/icons/corebody.png')} 
            time="25-30 Minutes"  
            bgColor="#B8D99B"
            onPress={() => router.push('/corebody')} 
          />

      </ScrollView>


      {/* Challenge Section */}
      <Text style={styles.headerText2}>Challenges :</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={() => setActiveLevel('beginner')} style={[styles.levelBtn, activeLevel === 'beginner' && styles.activeLevel]}>
            <Text style={activeLevel === 'beginner' ? styles.activeText : null}>Beginner</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveLevel('intermediate')} style={[styles.levelBtn, activeLevel === 'intermediate' && styles.activeLevel]}>
            <Text style={activeLevel === 'intermediate' ? styles.activeText : null}>Intermediate</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setActiveLevel('professional')} style={[styles.levelBtn, activeLevel === 'professional' && styles.activeLevel]}>
            <Text style={activeLevel === 'professional' ? styles.activeText : null}>Professional</Text>
        </TouchableOpacity>
      </View>

    {/* Challenge Details */}
     
    
      {Object.keys(challengeDetails[activeLevel]).map((key) => (
        <TouchableOpacity key={key} style={styles.detailBtn}>
          <View style={styles.leftSide}>
          <Text style={styles.detailTitle}>
              {key
                .replace(/([A-Z])/g, ' $1') 
                .replace(/(^|\s)(\w)/g, (match) => match.toUpperCase()) 
                .trim()}
            </Text>
          </View>
          <View style={styles.rightSide}>
            <View style={styles.row}>
              <Text style={styles.detailInfo}>
                <Text style={{ fontWeight: 'bold' }}>Total time: </Text>
                {challengeDetails[activeLevel][key].split('|')[0]}
              </Text>
              <Text style={styles.detailInfo}>
                <Text style={{ fontWeight: 'bold' }}>Burn: </Text>
                {challengeDetails[activeLevel][key].split('|')[1]}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.detailInfo}>
                <Text style={{ fontWeight: 'bold' }}>Total Exercises: </Text>
                {challengeDetails[activeLevel][key].split('|')[2]}
              </Text>
              <Text style={styles.detailInfo}>
                <Text style={{ fontWeight: 'bold' }}>Total days: </Text>
                {challengeDetails[activeLevel][key].split('|')[3]}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>

    
    </View>
  );
};

const ExerciseButton = ({ title, image, bgColor }) => (
    <View style={styles.exerciseBtnContainer}>
      <TouchableOpacity style={[styles.exerciseBtn, { backgroundColor: bgColor }]}>
        <Image source={image} style={styles.exerciseImage} />
      </TouchableOpacity>
      <Text>{title}</Text>
    </View>
  );
  

  const ExerciseCard = ({ title, image, time, bgColor, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <Image source={image} style={[styles.cardImage, { backgroundColor: bgColor }]} />
      <View style={styles.overlay}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardTime}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
  


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F6F6F6',
    },
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
    headerText: {
      marginTop: 20,
      fontSize: 16,
      color:'#5E5D5D',
      fontWeight: 'bold',
      paddingLeft: 20, 
      paddingRight: 15,
    },
    headerText2: {
        marginTop: 20,
        fontSize: 16,
        color:'#5E5D5D',
        fontWeight: 'bold',
        paddingLeft: 20, 
        paddingRight: 15,
      },
    categoryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 10,
      paddingLeft: 15, 
      paddingRight: 15,
    },
    exerciseBtnContainer: {
      alignItems: 'center',
    },
    exerciseBtn: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#D4CBE5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    exerciseImage: {
      width: 40,
      height: 40,
    },
    scrollContainer: {
      marginTop: 10,
      paddingBottom: 20,
      paddingLeft: 25, 
      paddingRight: 0,
      
    },
    cardContainer: {
        position: 'relative',
        width: 211,
        height: 224,
        marginRight: 15,
        borderRadius: 12,
        overflow: 'hidden',

      },
      cardImage: {
        width: '100%',
        height: '100%',
      },
      
      overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(128, 127, 127, 0.4)',
        padding: 10,
      },
      cardTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
      cardTime: {
        color: '#FFF',
        fontSize: 12,
      },
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 10,
      marginBottom: 10,
      paddingLeft: 15, 
      paddingRight: 15
    },
    levelBtn: {
      padding: 10,
      borderRadius: 15,
      backgroundColor: '#BAE5EB',
      
    },
    activeLevel: {
      backgroundColor: '#94C5CC',  
    },
    activeText: {
        color: '#FFFFFF', 
    },
    rightSide: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailBtn: {
        backgroundColor: '#D1F2F6',
        padding: 15,
        marginLeft:25,
        marginRight:25,
        marginVertical: 8,
        borderRadius: 10,
        elevation: 2,
        flexDirection: 'row',  
        justifyContent: 'space-between',  
    },
    leftSide: {
        flex: 1,  
        justifyContent: 'center',
    },
    detailTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#346473',
        marginBottom: 5,
    },
    detailInfo: {
        fontSize: 14,
        color: '#5E5E5E',
        marginBottom: 3, 
    },
    navBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderTopWidth: 1,
      borderColor: '#E0E0E0',
      height: 100,
      paddingTop: 10, 
      paddingBottom: 12,
    },
    navItem: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    navButton: {
      width: 60,
      height: 60,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: '#D5ECFD',
      backgroundColor: 'rgba(180, 210, 231, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeNavButton: {
      backgroundColor: '#94C5CC',
    },
    homeIcon: {
      width: 48,
      height: 43, 
    },
    reportIcon: {
      width: 27,
      height: 25, 
    },
    activitiesIcon: {
      width: 36,
      height: 36, 
    },
    profileIcon: {
      width: 30,
      height: 34, 
    },
    navText: {
      fontSize: 12,
      color: '#999',
      marginTop: 4,
    },
    activeNavText: {
      color: '#5E5D5D',
      fontWeight: 'bold',
    },
        
  });  

export default App;
