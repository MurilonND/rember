import { StyleSheet, Text, View } from "react-native";
import { getDocs, collection, where, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIRESTOR_DB } from "../../firebase";

export default function StatisticsScreen({ navigation }) {
  const [cards, setCards] = useState();
  const [collections, setCollections] = useState();
  const [easy, setEasy] = useState();
  const [medium, setMedium] = useState();
  const [hard, setHard] = useState();
  const [retry, setRetry] = useState();

  const GetData = async () => {
    var currentUser = FIREBASE_AUTH.currentUser;
    var currentUserEmail = currentUser.email;

    const uCollection = collection(FIRESTOR_DB, "users");
    const uQuerys = query(uCollection, where("email", "==", currentUserEmail));
    const snapshot = await getDocs(uQuerys);
    const user = snapshot.docs.map((doc) => doc.data());

    setCards(user[0].cards.length ?? 0);
    setCollections(user[0].collections.length ?? 0);
    setEasy(user[0].easy ?? 0);
    setMedium(user[0].medium ?? 0);
    setHard(user[0].hard ?? 0);
    setRetry(user[0].retry ?? 0);
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <View style={styles.container} behavior="padding">
      <Text style={styles.item}>Cards: {cards}</Text>
      <Text style={styles.item}>Collections: {collections}</Text>
      <Text style={styles.item}>Anwsers:</Text>
      <Text style={[styles.sub_item]}>Easy: {easy}</Text>
      <Text style={[styles.sub_item]}>Medium: {medium}</Text>
      <Text style={[styles.sub_item]}>Hard: {hard}</Text>
      <Text style={[styles.sub_item]}>Retry: {retry}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: "start",
    alignItems: "start",
    backgroundColor: "#ffffff",
  },

  sub_item: {
    paddingLeft: 15,
    fontSize: 20,
  },

  item: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
