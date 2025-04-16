import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Link, useRouter } from 'expo-router';

const UserProfile = () => {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [selectedOption, setSelectedOption] = useState("Other");
  const [birthdate, setBirthdate] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');


  const handleImageChange = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Please grant permission to access your media library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.uri);
    }
  };

  const handleSaveAccount = async () => {
    const response = await fetch('http://localhost/EFA/editprofile.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            nickname,
            sex: selectedOption,
            birthdate,
            height,
            weight,
        }),
    });

    const result = await response.json();
    Alert.alert(result.success ? "Success" : "Error", result.message);
};

  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}
        <View style={styles.topBackground}>
          <TouchableOpacity style={styles.backButton}>
            <Link href="/personal">
              <Image source={require('../../../assets/images/back.png')} style={styles.backIcon} />
            </Link>
          </TouchableOpacity>
          <Text style={styles.title}>Edit</Text>
        </View>

        {/* Avatar Section */}
        <TouchableOpacity onPress={handleImageChange} style={styles.avatarContainer}>
          <Image
            source={avatar ? { uri: avatar } : require('../../../assets/images/jam.jpeg')}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <View >
        <Text style={styles.changeAvatarText}>Change Avatar</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <Text>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Text>Nickname:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your nickname"
            value={nickname}
            onChangeText={(text) => setNickname(text)}
          />
          
          {/* Gender Picker */}
          <Text>Sex:</Text>
          <Picker
                  selectedValue={selectedOption}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSelectedOption(itemValue)}
                >
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Other" value="other" />
                </Picker> 
          {/* Other Form Inputs */}
          <Text>Birthday:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your birthdate"
            value={birthdate}
            onChangeText={(text) => setBirthdate(text)}
          />
          <Text>Height:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your height"
            value={height}
            onChangeText={(text) => setHeight(text)}
          />
          <Text>Weight:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your weight"
            value={weight}
            onChangeText={(text) => setWeight(text)}
          />

        </View>

        {/* Save Button */}
        <View style={styles.saveButtonSection}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveAccount}>
            <Link href="/personal">
              <Text style={styles.saveButtonText}>SAVE</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    
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
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  backIcon: {
    width: 26,
    height: 26,
  },

  avatarContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  changeAvatarText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'poppins-bold',
    textAlign: 'center',
    marginTop: 10,
  },

  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    fontSize: 16,
    color: '#5E5D5D',
    paddingLeft: 5,
  },

  saveButtonSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  saveButton: {
    backgroundColor: "#94C5CC",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: 200,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: 'center',
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  picker: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default UserProfile;
