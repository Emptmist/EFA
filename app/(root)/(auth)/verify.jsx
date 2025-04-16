import React, { useEffect, useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { auth } from './firebase';
import { sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

export default function VerifyScreen({ navigation }) {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.reload().then(() => {
          setIsVerified(user.emailVerified);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const checkVerification = async () => {
    setLoading(true);
    const user = auth.currentUser;
    if (user) {
      await user.reload(); // Refresh user state
      setIsVerified(user.emailVerified);
      if (user.emailVerified) {
        Alert.alert('Success', 'Email verified! Redirecting to login...');
        router.push('/login'); // Redirect to login page
      } else {
        Alert.alert('Error', 'Email is not verified yet. Please check your inbox.');
      }
    }
    setLoading(false);
  };

  const resendVerificationEmail = async () => {
    const user = auth.currentUser;
    if (user) {
      await sendEmailVerification(user);
      Alert.alert('Email Sent', 'A new verification email has been sent to your inbox.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <Link href="/register">
          <Image source={require('../../../assets/images/back_gray.png')} style={styles.backIcon} />
        </Link>
      </TouchableOpacity>

      <View style={styles.mailContainer}>
        <Image source={require('../../../assets/images/mailbox.png')} style={styles.mailIcon} />
      </View>

      <View style={styles.message}>
        <Text style={styles.heading}>Verify Your Email</Text>
        <Text style={styles.subline}>
          We have sent a verification email to your registered email address.
        </Text>
        <Text style={styles.subline}>Please verify your email before proceeding.</Text>
      </View>

      {!isVerified ? (
        <View>
          <TouchableOpacity style={styles.verifyButton} onPress={checkVerification}>
            <Text style={styles.verifyText}>{loading ? 'Checking...' : 'Check Verification'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resendButton} onPress={resendVerificationEmail}>
            <Text style={styles.resendText}>Resend Verification Email</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.verifyButton} onPress={() => router.push('/login')}>
          <Text style={styles.verifyText}>Go to Login</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
  mailContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mailIcon: {
    width: 120,
    height: 124,
  },
  message: {
    alignItems: 'center',
    marginVertical: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7AACB4',
  },
  subline: {
    marginTop: 5,
    fontSize: 14,
    color: '#696868',
    textAlign: 'center',
    opacity: 0.74,
  },
  
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  otpInput: {
    width: 40,
    height: 48,
    textAlign: 'center',
    fontSize: 20,
    color: '#7cafb8',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 5,
  },
  verifyButton: {
    backgroundColor: '#94C5CC',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginVertical: 20,
  },
  verifyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 14,
    color: '#696868',
  },
  resendButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#94C5CC',
    marginTop: 5,
  },
});