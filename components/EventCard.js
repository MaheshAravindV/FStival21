import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EventCard(props) {
  function test() {
    props.navigation.navigate("event");
  }
  return (
    <TouchableOpacity onPress={test}>
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        <Text>{props.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    paddingHorizontal: 10,
    minWidth: "100%",
    borderWidth: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
  },
});
