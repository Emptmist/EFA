import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const PrivacyPolicy = () => {
  const goBack = () => {
    // You can replace this with actual navigation logic (e.g., using React Navigation)
    Alert.alert('Going back'); // Placeholder for navigation logic
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
        <Text style={styles.title}>Privacy Policy</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.date}>Effective Date: December 2024</Text>
          <Text style={styles.paragraph}>
            At Empower Fitness, we prioritize your privacy. This policy outlines how we collect, use, and safeguard your personal information to provide a secure and personalized fitness experience.
          </Text>

          <Text style={styles.sectionTitle}>1. Data Collection</Text>
          <Text style={styles.paragraph}>We gather the following data:</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}><Text style={styles.bold}>Provided Data:</Text> Details like name, email, password, profile data (e.g., height, weight, goals), and payment information via secure platforms.</Text>
            <Text style={styles.listItem}><Text style={styles.bold}>Automatically Collected Data:</Text> Device details, app usage logs, and location data for enhancing app features.</Text>
            <Text style={styles.listItem}><Text style={styles.bold}>Third-Party Integrations:</Text> Information from connected services such as fitness trackers.</Text>
          </View>

          <Text style={styles.sectionTitle}>2. Data Usage</Text>
          <Text style={styles.paragraph}>We use your data to:</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>Deliver and tailor fitness services.</Text>
            <Text style={styles.listItem}>Monitor progress and improve app functionality.</Text>
            <Text style={styles.listItem}>Securely process payments.</Text>
            <Text style={styles.listItem}>Analyze performance through anonymized data.</Text>
          </View>

          <Text style={styles.sectionTitle}>3. Data Sharing</Text>
          <Text style={styles.paragraph}>Your data will never be sold. Limited sharing occurs only with:</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>Service providers (e.g., payment processors).</Text>
            <Text style={styles.listItem}>Legal authorities, if required by law.</Text>
            <Text style={styles.listItem}>Research partners, using anonymized formats.</Text>
          </View>

          <Text style={styles.sectionTitle}>4. User Rights</Text>
          <Text style={styles.paragraph}>You have the right to access, update, or delete your information. Consent can be withdrawn where applicable by contacting us.</Text>

          <Text style={styles.sectionTitle}>5. Security</Text>
          <Text style={styles.paragraph}>We use advanced security measures to protect your data. Users are responsible for safeguarding their account credentials.</Text>

          <Text style={styles.sectionTitle}>6. Children’s Privacy</Text>
          <Text style={styles.paragraph}>Our app is designed for users aged 13 and above. Data collection from minors is strictly prohibited.</Text>

          <Text style={styles.sectionTitle}>7. Policy Updates</Text>
          <Text style={styles.paragraph}>We may revise this policy from time to time. Updates will be posted, and continued use of the app implies acceptance of the changes.</Text>

          <Text style={styles.sectionTitle}>8. Contact Information</Text>
          <Text style={styles.paragraph}>For any inquiries or concerns, reach out via email or the app's support section.</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Empower Fitness. All rights reserved. By using this app, you agree to our privacy policy.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
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
  contentContainer: {
    padding: 10,
  },
  content: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: '100%',
    maxWidth: 400,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#94C5CC',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#94C5CC',
    marginBottom: 10,
    marginTop: 20,
  },
  list: {
    marginLeft: 20,
    marginBottom: 20,
  },
  listItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    backgroundColor: '#f1f1f1',
    padding: 10,
    textAlign: 'center',
    fontSize: 12,
    color: 'gray',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
  },
  footerText: {
    textAlign: 'center',
  },
});

export default PrivacyPolicy;
