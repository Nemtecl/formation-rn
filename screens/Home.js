import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  home: {
    display: "flex",
  },
  btn: {
    backgroundColor: "blue",
    margin: 40,
    borderRadius: 10,
    padding: 10,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
  },
});

const Home = ({ navigation }) => {
  const navigate = () => navigation.navigate("Play");

  return (
    <View style={styles.home}>
      <View>
        <TouchableOpacity style={styles.btn} onPress={navigate}>
          <Text style={styles.btnText}>Jouer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
