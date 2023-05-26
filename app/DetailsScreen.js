import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const DetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { data } = route.params;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: data?.data?.image_url,
        }}
      />
      <Text>Image ID</Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {data?.data?.letter_id}
      </Text>
      <Text>Sender Phone</Text>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        {data?.data?.sender_phone}
      </Text>
      <Text>Receiver Phone</Text>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        {data?.data?.receiver_phone}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Upload");
        }}
      >
        <Text style={styles.buttontxt}>Upload Another One</Text>
      </TouchableOpacity>
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
    width: 180,
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
});

export default DetailsScreen;
