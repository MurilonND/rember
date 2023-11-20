import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function Home({ navigation }) {
  const goToQuizzes = () => navigation.navigate("Quizzes");
  const goToCollections = () => navigation.navigate("Collections");
  const goToStatistics = () => navigation.navigate("Statistics");


  return (
    <View style={styles.container} behavior="padding">
        <TouchableOpacity onPress={goToQuizzes}
          style={[styles.cardButtom, {backgroundColor: '#B66CFF'}]}>
          <Text style={styles.cardButtomText}>Quizzes</Text>
        </TouchableOpacity>
        <View style={styles.sizeBoxH}></View>
        <TouchableOpacity onPress={goToCollections}
         style={[styles.cardButtom, {backgroundColor: '#6C7BFF'}]}>
          <Text style={styles.cardButtomText}>Collections</Text>
        </TouchableOpacity>
        <View style={styles.sizeBoxH}></View>
        <TouchableOpacity onPress={goToStatistics}
          style={[styles.cardButtom, {backgroundColor: '#6CFF7B'}]}>
          <Text style={styles.cardButtomText}>Statistics</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  sizeBoxH: {
    height: 30,
  },

  buttom: {
    backgroundColor: "red",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttomText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  cardButtom: {
    width: "90%",
    height: 180,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  cardButtomText: {
    color: "white",
    fontWeight: "700",
    fontSize: 26,
  },
});
