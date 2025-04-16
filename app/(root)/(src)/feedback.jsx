import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

const Feedback = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleFeedbackSubmit = () => {
    if (!feedbackMessage.trim()) {
      Alert.alert('Oops...', 'Please enter your feedback message!');
      return;
    }

    Alert.alert('Feedback Submitted', 'Thank you for your feedback!', [
      { text: 'OK', onPress: closeModal },
    ]);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Please grant permission to access your media library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
      console.log('Image selected:', result);  // Log image details for debugging
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Link href="/profile">
            <Ionicons name="arrow-back" size={24} color="white" />
          </Link>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feedback</Text>
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.plusButton}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Ionicons name="chatbubble" size={50} color="#a0a0a0" style={styles.icon} />
        <Text style={styles.message}>No feedback for the time being</Text>
      </View>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Feedback</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#9ed0d9" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.textarea}
              placeholder="Enter your feedback..."
              multiline
              value={feedbackMessage}
              onChangeText={setFeedbackMessage}
            />
            <View style={styles.actionContainer}>
              <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
                <Text style={styles.uploadButtonText}>Upload Image</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleFeedbackSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
            {selectedImage && (
              <View>
                <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
                <Text style={styles.imageUriText}>{selectedImage}</Text> {/* Display URI for debugging */}
              </View>
            )}
          </View>
        </View>
      </Modal>
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
  header: {
    backgroundColor: '#9ed0d9',
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  plusButton: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    marginTop: 80,
    alignItems: 'center',
    textAlign: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: 'gray',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    color: 'Black',
  },
  closeButton: {
    padding: 5,
  },
  textarea: {
    width: '100%',
    height: 100,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 14,
    fontFamily: 'Poppins',
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#9ed0d9',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  uploadButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#9ed0d9',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 14,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 10,
  },
  imageUriText: {
    marginTop: 10,
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Feedback;
