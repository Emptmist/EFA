import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Link } from 'expo-router';

const settingsOptions = [
  { id: '1', icon: 'notifications-outline', text: 'Notification Reminder', action: 'notification' },
  { id: '2', icon: 'refresh-outline', text: 'Restart Progress', action: 'reset' },
  { id: '3', icon: 'trash-outline', text: 'Delete All Data', action: 'delete' },
];

const GeneralSettings = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false); // State for toggle
  const router = useRouter();

  const handleOptionPress = (action) => {
    if (action === 'reset') {
      Alert.alert(
        "Reset Progress",
        "This will reset your progress. Do you want to continue?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Yes", style: "default", onPress: () => console.log('Progress reset.') },
        ]
      );
    } else if (action === 'delete') {
      Alert.alert(
        "Delete All Data",
        "This will delete all data related to you, including progress. Do you want to continue?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Yes", style: "default", onPress: () => console.log('All data deleted.') },
        ]
      );
    } else if (action === 'notification') {
      setIsNotificationEnabled(!isNotificationEnabled);
    } else {
      router.push('/notifications');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => handleOptionPress(item.action)}
    >
      <Ionicons name={item.icon} size={20} color="#949494" style={styles.icon} />
      <Text style={styles.text}>{item.text}</Text>
      {item.action === 'notification' ? (
        <Switch
          value={isNotificationEnabled}
          onValueChange={() => setIsNotificationEnabled(!isNotificationEnabled)}
        />
      ) : (
        <Ionicons name="chevron-forward-outline" size={20} color="#888" style={styles.actionIcon} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.topBackground}>
        <TouchableOpacity style={styles.backButton}>
          <Link href="/profile">
            <Ionicons name="arrow-back-outline" size={24} color="#FFF" />
          </Link>
        </TouchableOpacity>
        <Text style={styles.title}>General Settings</Text>
      </View>
      <FlatList
        data={settingsOptions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  listContainer: {
    width: '100%',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  icon: {
    marginRight: 15,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  actionIcon: {
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#94C5CC',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: 200,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default GeneralSettings;
