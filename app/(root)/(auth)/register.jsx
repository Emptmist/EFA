import { Link, useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from './firebase';
import { setDoc, doc } from 'firebase/firestore';


import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
   
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setError('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long!');
      return;
    }

    try {
          await createUserWithEmailAndPassword(auth, email, password);
          const user = auth.currentUser;
          console.log(user);
          console.log('User registered successfully');
    
          // Send email verification
          await sendEmailVerification(user);
    
          // Store user in Firestore
          if (user) {
            await setDoc(doc(db, 'Users', user.uid), {
              username: username,
              email: user.email,
              password: password,
            });
          }

          setError('');
          router.push('/verify'); // Navigate to verification screen after success
          
          // Send user data to PHP backend
          const response = await fetch('http://localhost/xmp/EFA/register.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              firebase_uid: user.uid,  // Firebase User ID
              email: user.email,
              password: password,  // You should hash this in PHP before storing
            }),
          });

        } catch (error) {
          setError(error.message);
          console.log(error.message);
        }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topBackground}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
            <Image source={require('../../../assets/images/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          
          <Text style={styles.title}>Register</Text>
        </View>

        <View className="text-center">
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username :</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email :</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password :</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password :</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.registerbtn} onPress={handleRegister}>
          <Text style={styles.registerText}>REGISTER</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  topBackground: {
    backgroundColor: '#B4D2E7',
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
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
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFFFFF',
    fontSize: 18,
  },
  inputGroup: {
    left: 20,
    marginHorizontal: 30,
    marginTop: 45,
    width: 320,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    color: '#5E5D5D',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#5E5D5D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  showPasswordButton: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
  },
  toggleText: {
    color: '#5E5D5D',
    fontSize: 14,
  },
  registerbtn: {
    backgroundColor: '#B4D2E7',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 65,
    width: '60%',
    alignSelf: 'center',
  },
  registerText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});