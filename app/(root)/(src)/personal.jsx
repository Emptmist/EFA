import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {Link, useRouter} from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [weight, setWeight] = useState(80); // Default weight
  const [height, setHeight] = useState(149); // Default height in cm
  const [targetWeight, setTargetWeight] = useState(null); // Initially no target weight
  
  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Handle deletion of the account
  const handleDeleteAccount = () => {
    Alert.alert("Delete Account", "Are you sure you want to delete your account?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => console.log("Account deleted") },
    ]);
  };

  const router = useRouter();

  // Calculate BMI
  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100; // Convert height to meters
    const bmi = weight / (heightInMeters ** 2); // BMI formula
    return bmi;
  };

  // Suggest target weight based on a healthy BMI range (18.5 - 24.9)
  const calculateTargetWeight = (height) => {
    const heightInMeters = height / 100; // Convert height to meters
    const lowerBMI = 18.5;
    const upperBMI = 24.9;

    // Calculate target weight for lower and upper BMI
    const lowerWeight = lowerBMI * (heightInMeters ** 2);
    const upperWeight = upperBMI * (heightInMeters ** 2);

    return { lowerWeight, upperWeight };
  };

  // Update target weight whenever the user updates their height or weight
  const updateTargetWeight = () => {
    const { lowerWeight, upperWeight } = calculateTargetWeight(height);
    setTargetWeight({
      lower: Math.round(lowerWeight),  // Rounded to nearest whole number
      upper: Math.round(upperWeight),
    });
  };

  // Call this function when the user changes weight or height
  React.useEffect(() => {
    updateTargetWeight();
  }, [height, weight]);

  return (
    <View style={styles.container}>
      <View style={styles.topBackground}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/profile')} >
          <Image source={require('../../../assets/images/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.titles}>Profile</Text>
      </View>

      <ScrollView style={styles.profileContainer}>
        <View style={styles.profilePictureSection}>
          <Image
            source={
              profileImage ? { uri: profileImage } : require('../../../assets/images/jam.jpeg')
            }
            style={styles.profileImage}
          />
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>Jamaielyn Gascon</Text>
            <Link href="/editprofile">
              <Icon name="pencil" size={20} color="#555" />
            </Link>
          </View>
          <Text style={styles.profileUsername}>@BbyNashji18</Text>
        </View>

        <View style={styles.details}>
          <View style={styles.row}>
            <Text style={styles.label}>Sex:</Text>
            <Text style={styles.value}>Female</Text>
          </View>
          <View style={styles.line}></View> {/* Horizontal Line */}

          <View style={styles.row}>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.value}>21</Text>
          </View>
          <View style={styles.line}></View> {/* Horizontal Line */}

          <View style={styles.row}>
            <Text style={styles.label}>Birthdate:</Text>
            <Text style={styles.value}>5-18-03</Text>
          </View>
          <View style={styles.line}></View> {/* Horizontal Line */}

          <View style={styles.row}>
            <Text style={styles.label}>Height:</Text>
            <TextInput
              style={styles.valueInput}
              value={String(height)}
              keyboardType="numeric"
              onChangeText={(text) => setHeight(Number(text))}
            />
          </View>
          <View style={styles.line}></View> {/* Horizontal Line */}

          <View style={styles.row}>
            <Text style={styles.label}>Weight:</Text>
            <TextInput
              style={styles.valueInput}
              value={String(weight)}
              keyboardType="numeric"
              onChangeText={(text) => setWeight(Number(text))}
            />
          </View>
          <View style={styles.line}></View> {/* Horizontal Line */}

          <View style={styles.targetWeightSection}>
            <Text style={styles.targetWeightText}>Target Weight:</Text>
            {targetWeight ? (
              <Text style={styles.bold}>
                {targetWeight.lower}kg - {targetWeight.upper}kg
              </Text>
            ) : (
              <Text style={styles.bold}>Calculating...</Text>
            )}
          </View>
        </View>

        <View style={styles.deleteButtonSection}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteButtonText}>DELETE ACCOUNT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C2E3D0",
  },
  topBackground: {
    backgroundColor: '#94C5CC',
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  titles: {
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
    width: 26,
    height: 26,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  profileContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -10,
  },
  profilePictureSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  editButton: {
    position: "absolute",
    bottom: 5,
    left: 5,
    backgroundColor: "#9ed0d9",
    padding: 5,
    borderRadius: 20,
  },
  editText: {
    color: "#fff",
    fontSize: 12,
  },
  profileInfo: {
    alignItems: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 5,
  },
  profileNameContainer: {
    flexDirection: 'row',  // This aligns the name and icon horizontally
    alignItems: 'center',  // Vertically centers the icon with the name
  },
  profileUsername: {
    fontSize: 14,
    color: "gray",
  },
  details: {
    padding: 20,
  },
  line: {
    height: 1,               // Adjust the height of the line
    backgroundColor: '#ccc', // Line color (you can choose any color)
    marginVertical: 10,      // Adjust spacing around the line
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  value: {
    fontSize: 16,
    color: "gray",
  },
  targetWeightSection: {
    marginTop: 20,
    alignItems: "center",
  },
  targetWeightText: {
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  deleteButtonSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  deleteButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  // (Your existing styles here)
  valueInput: {
    fontSize: 16,
    color: "#555",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 5,
    width: 100,
    textAlign: "center",
  },
  targetWeightText: {
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default ProfilePage;
