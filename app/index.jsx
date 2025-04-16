import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { Link, useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window'); 
import images from '@/constants/images';

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/images/bgmain.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover" // Ensures the entire video is visible
        isLooping
        isMuted
        shouldPlay
      />

      <View style={styles.topSection}>
        <Text style={styles.title}>Empower Fitness</Text>
      </View>
      <View style={styles.logoContainer}>
        <Image source={images.logotitle} style={styles.logo} />
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.tagline}>Wherever You Are</Text>
        <Text style={styles.tagline}>Health is Number One</Text>
        <Text style={styles.subtagline}>There is no instant way to a healthy life</Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button}>
            <Link href="/register">
              <Text style={styles.buttonText}>REGISTER</Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Link href="/login">
              <Text style={styles.buttonText}>LOGIN</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', 
    height: '100%', 
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width, // Full width of the screen
    height: height, // Full height of the screen
    zIndex: -2,
    aspectRatio: 16 / 9,
  },
  
  topSection: {
    position: 'absolute',
    top: '8%',
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  logoContainer: {
    position: 'absolute',
    top: '32%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -75 }],
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    zIndex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  bottomSection: {
    position: 'absolute',
    bottom: '10%',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tagline: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtagline: {
    fontSize: 18,
    color: '#EAEAEA',
    textAlign: 'center',
    marginBottom: 25,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: '#90caf9',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MenuScreen;
