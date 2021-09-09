import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EventCard(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test</Text>
      <Text>
        Magna laborum ea voluptate eu anim laboris culpa est duis dolor mollit
        do dolor laboris.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    paddingHorizontal: 10,
    minWidth: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
  },
});
