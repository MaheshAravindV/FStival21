import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaViewBase,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as SecureStore from "expo-secure-store";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValue(key) {
  let result = await Promise.resolve(SecureStore.getItemAsync(key));
  return result;
}

export default function EventCard(props) {
  async function test() {
    await save("login", "12345");
    console.log(await getValue("login"));
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
