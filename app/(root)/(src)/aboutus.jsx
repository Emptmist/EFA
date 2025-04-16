import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';

const AboutUs = ({ navigation }) => {
    const goBack = () => {
        if (navigation && navigation.goBack) {
            navigation.goBack(); // Navigate to the previous screen if using React Navigation
        } else {
            Alert.alert('Navigation unavailable'); // Fallback if navigation is not provided
        }
    };

    const shareApp = () => {
        Alert.alert('Share', 'Sharing the app feature is coming soon!');
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.topBackground}>
              <TouchableOpacity style={styles.backButton}>
                <Link href="/profile">
                    <Image source={require('../../../assets/images/back.png')} style={styles.backIcon} />
                </Link>
              </TouchableOpacity>
              <Text style={styles.title}>About Us</Text>
            </View>

            {/* Logo Section */}
            <View style={styles.logoSection}>
                <Image source={require('../../../assets/images/favicon.png')} style={styles.logo} />
            </View>

            {/* Version Info */}
            <Text style={styles.version}>v2.7.9</Text>

            {/* QR Section */}
            <View style={styles.qrSection}>
                <Image source={require('../../../assets/images/qrcode.png')} style={styles.qrCode} />
                <Text style={styles.qrText}>Want to know us?</Text>
            </View>

            {/* Share Button */}
            <TouchableOpacity style={styles.shareButton} onPress={shareApp}>
                <Text style={styles.shareButtonText}>SHARE IT</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
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
    logoSection: {
        marginTop: 30,
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#ffffff',
    },
    version: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 14,
        marginVertical: 10,
    },
    qrSection: {
        alignItems: 'center',
        marginVertical: 20,
    },
    qrCode: {
        width: 150,
        height: 150,
        marginBottom: 10,
    },
    qrText: {
        color: 'gray',
        fontSize: 14,
    },
    shareButton: {
        backgroundColor: '#80cfcf',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '90%',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    shareButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default AboutUs;
