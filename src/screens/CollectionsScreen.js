import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function CollectionsScreen({ navigation }) {
  return (
    <View style={styles.container} behavior="padding">
          <Text>CollectionsScreen</Text>
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
