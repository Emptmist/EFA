import { ScrollView, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Video } from 'expo-av';
import { Asset } from 'expo-asset';

import images from '@/constants/images';

const assetId = require('../../../assets/images/bgmain.mp4');
Asset.fromModule(require('../../../assets/images/bgmain.mp4')).downloadAsync();

const signin = () => {
  const handleLogin = () => {};
  const handleRegister = () => {};
  

  
  
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Video
          source={assetId} 
          style={styles.backgroundVideo}
          resizeMode="contain"  
          isLooping
          isMuted
          shouldPlay
          focusable={false}
        />
        <LinearGradient
          colors={['transparent', 'rgb(255, 255, 255)']} // Adjust colors as needed
          style={styles.gradientOverlay}
        />

        <View style={styles.topSection}>
          <Text style={styles.title}>Empower Fitness</Text>
        </View>

        <View className="px-10">
          <Text className='text-3xl text-center font-poppins text-black-300 mt-5'>
            {/* this is spacing */}
          </Text>
        </View>
        <View className="px-10">
          <Text className='text-3xl text-center font-poppins text-black-300 mt-5'>
            {/* this is spacing */}
          </Text>
        </View>
        <View className="px-10">
          <Text className='text-3xl text-center font-poppins text-black-300 mt-5'>
            {/* this is spacing */}
          </Text>
        </View>
        <View className="px-10">
          <Text className='text-3xl text-center font-poppins text-black-300 mt-5'>
            {/* this is spacing */}
          </Text>
        </View>
        
        
        <View  >
          <Text >
            <Image source={images.logotitle} className="bg-white rounded-full justify-center items-center  w-full h-4/6" resizeMode="contain" /*style={{ width: '27%', height: 130 }}*/ />
          </Text>
        </View>

        
        
        <View className="px-10">
          
          <Text className='text-3xl text-center font-poppins text-black-300 mt-2'>
            Wherever You Are {'\n'} Health is Number One
          </Text>
          <Text className='text-base text-center uppercase font-poppins text-black-200'>
            There is no instant way to a healhty life
          </Text>
        
          <View className="flex-row justify-between space-x-5 mt-5 px-4">
            
            <TouchableOpacity onPress={handleRegister} className="bg-primary-200 shadow-md shadow-zinc-300 rounded-full py-4"style={{ width: '40%', height: 50 }}>
              <Text className="text-center">
              <Link href="/register">
                Register
              </Link> 
              </Text>
            </TouchableOpacity>
          
            <TouchableOpacity onPress={handleLogin} className="bg-primary-200 shadow-md shadow-zinc-300 rounded-full py-4" style={{ width: '40%', height: 50 }}>
              <Text className="text-center">
                <Link href="/login">
                  Login
                </Link>  
              </Text>
            </TouchableOpacity>
             
          </View>

          

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',  
    height: '100%', 
    zIndex: -2,
    borderWidth: 0, // Remove border
    borderColor: 'transparent', // Set border color to transparent
    outlineWidth: 0, // Remove outline
    outlineColor: 'transparent', // Ensure no outline color
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '20%', // Adjust height for the gradient area
    borderWidth: 0, // Remove border
    borderColor: 'transparent', // Set border color to transparent
    outlineWidth: 0, // Remove outline
    outlineColor: 'transparent', // Ensure no outline color
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
})

export default signin
