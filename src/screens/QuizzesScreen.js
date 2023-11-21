import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getDocs, collection, where, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIRESTOR_DB } from "../../firebase";

export default function QuizzesScreen({ navigation }) {
  const [collections, setCollections] = useState();

  const GetData = async () => {
    var currentUser = FIREBASE_AUTH.currentUser;
    var currentUserEmail = currentUser.email;

    const uCollection = collection(FIRESTOR_DB, 'users');
    const uQuerys = query(uCollection, where("email", "==", currentUserEmail));
    const snapshot = await getDocs(uQuerys);
    const user = snapshot.docs.map(doc => doc.data());

    setCollections(user[0].collections ?? []);
  }

  useEffect(
    () => {
      GetData();
    }, []
  );

  const goToQuizz = () => {
    navigation.navigate("Quiz");
  }

  return (
    <View style={styles.container} behavior="padding">
        <FlatList
        data={collections}
        renderItem={({item})=><View>
            <TouchableOpacity onPress={goToQuizz}
              style={styles.cardButtom}>
                <Text numberOfLines={1} style={styles.cardButtomText}>{item}</Text>
            </TouchableOpacity>
          </View>
          }
        />
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

  cardButtom: {
    marginTop: 10,
    padding: 12,
    width: "100%",
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "start",
    justifyContent: "center",
  },

  cardButtomText: {
    fontWeight: "700",
    fontSize: 25,
  },
});
