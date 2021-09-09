import React from "react";
import { StyleSheet, View } from "react-native";
import EventCard from "./EventCard";

export default function Main(props) {
  return (
    <View style={styles.container}>
      <EventCard
        {...props}
        title="Event 122"
        description="Aliqua magna sunt est quis ut sint duis."
      ></EventCard>
      <EventCard
        {...props}
        title="Event 2"
        description="Aliqua magna sunt est quis ut sint duis."
      ></EventCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
