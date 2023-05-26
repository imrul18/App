import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const options = {
  title: "Select Image",
  type: "library",
  options: {
    maxHeight: 100,
    MaxWidth: 100,
    selectionLimit: 0,
    mediaaType: "photo",
    includeBase64: false,
  },
};

const UploadScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [img, setImg] = useState(null);

  const [data, setData] = useState({});

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImg(result);
    }
  };

  const handleInput = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const uploadImage = async () => {
    setLoading(true);

    const newImageUri = "file:///" + img.assets[0].uri.split("file:/").join("");
    const formData = new FormData();
    formData.append("file", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });
    formData.append("receiver_phone", data.receiver_phone);
    formData.append("sender_phone", data.sender_phone);

    fetch("http://api.letter.imrul.xyz/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setData({})
        setImg(null);
        navigation.navigate("Details", { data: json });
      })
      .catch((error) => {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error,
          position: "bottom",
        });
      });
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        style={styles.image}
        source={{
          uri: img?.assets[0]?.uri
            ? img?.assets[0].uri
            : "https://t4.ftcdn.net/jpg/03/02/74/89/360_F_302748918_Vs76DTDodjhhkYuCEFahu0LcoDZkBuaW.jpg",
        }}
      />
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttontxt}>
          {img?.assets[0]?.uri ? "Take Another" : "Take a Photo"}
        </Text>
      </TouchableOpacity>

      {img?.assets[0]?.uri && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Sender Phone Number"
            keyboardType="numeric"
            onChangeText={(value) => handleInput("sender_phone", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Receiver Phone Number"
            keyboardType="numeric"
            onChangeText={(value) => handleInput("receiver_phone", value)}
          />
        </View>
      )}

      {data?.sender_phone?.length && data?.receiver_phone?.length && (
        <TouchableOpacity style={styles.button} onPress={uploadImage}>
          <Text style={styles.buttontxt}>Upload</Text>
        </TouchableOpacity>
      )}

      <Modal animationType="slide" transparent={true} visible={loading}>
        <View style={styles.loginModalView}>
          <ActivityIndicator size="large" color="red" />
          <Text>Please Wait...</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 225,
    width: 300,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    height: 35,
    width: 120,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttontxt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    margin: 5,
    textAlign: "center",
  },
  loginModalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginHorizontal: 100,
    marginVertical: 280,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#7f7f7f",
  },
});

export default UploadScreen;