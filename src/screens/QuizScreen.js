import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  getDocs,
  collection,
  where,
  query,
  updateDoc,
  increment,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIRESTOR_DB } from "../../firebase";

export default function QuizScreen({ route, navigation }) {
  const collectionId = route.params.collectionId;

  const [visible, setVisible] = useState(false);
  const [retry, setRetry] = useState(0);
  const [hard, setHard] = useState(0);
  const [medium, setMedium] = useState(0);
  const [easy, setEasy] = useState(0);
  const [userDoc, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([
    { answer: "", collection: "", quenstion: "", timestamp: 0 },
  ]);
  const [cardIndex, setCardIndex] = useState(0);
  const [userRef, setUserRef] = useState();

  const GetData = async () => {
    setLoading(true);
    var currentUser = FIREBASE_AUTH.currentUser;
    var currentUserEmail = currentUser.email;
    var date = new Date().getTime();

    const uCollection = collection(FIRESTOR_DB, "users");
    const uQuerys = query(uCollection, where("email", "==", currentUserEmail));
    const snapshot = await getDocs(uQuerys);
    setUserRef(snapshot.docs[0].ref);
    const user = snapshot.docs.map((doc) => doc.data());
    setUser(user[0])
    const userCards = user[0].cards.filter(
      (item) => item.collection == collectionId
    );
    const availableCards = userCards.filter((item) => item.timestamp <= date);
    setCards(availableCards ?? []);
    setLoading(false);
  };

  const updateEasyStatistics = async () => {
    var data = userDoc;
    var newTimestamp = new Date();
    newTimestamp.setDate(newTimestamp.getDate() + 4);
    var timestamp = newTimestamp.getTime();

    var index = userDoc.cards.findIndex((item) => item == cards[cardIndex]);

    data.easy = data.easy + 1;
    data.cards[index].timestamp = timestamp;

    try {
      await updateDoc(userRef, data);
    } catch (e) {
      console.log("ERROR: ", e.message);
    }
  };

  const updateMediumStatistics = async () => {
    var data = userDoc;
    var newTimestamp = new Date();
    newTimestamp.setDate(newTimestamp.getDate() + 2);
    var timestamp = newTimestamp.getTime();

    var index = userDoc.cards.findIndex((item) => item == cards[cardIndex]);

    data.medium = data.medium + 1;
    data.cards[index].timestamp = timestamp;

    try {
      await updateDoc(userRef, data);
    } catch (e) {
      console.log("ERROR: ", e.message);
    }
  };

  const updateHardStatistics = async () => {
    var data = userDoc;
    var newTimestamp = new Date();
    newTimestamp.setDate(newTimestamp.getDate() + 1);
    var timestamp = newTimestamp.getTime();

    var index = userDoc.cards.findIndex((item) => item == cards[cardIndex]);

    data.hard = data.hard + 1;
    data.cards[index].timestamp = timestamp;

    try {
      await updateDoc(userRef, data);
    } catch (e) {
      console.log("ERROR: ", e.message);
    }
  };

  const updateRetryStatistics = async () => {
    try {
      await updateDoc(userRef, {
        retry: increment(1),
      });
    } catch (e) {
      console.log("ERROR: ", e.message);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  const showAnswer = () => {
    setVisible(true);
  };

  const hideAnswer = () => {
    setVisible(false);
  };

  const goBack = () => navigation.goBack();

  const retryButton = () => {
    setRetry(retry + 1);
    hideAnswer();
    updateRetryStatistics();

    if (cardIndex < cards.length - 1) {
      setCardIndex(cardIndex + 1);
    }else{
      setCards([{ answer: "", collection: "", quenstion: "", timestamp: 0 }]);
      setCardIndex(0);
      GetData();
    }
  };

  const hardButton = () => {
    setHard(hard + 1);
    hideAnswer();
    updateHardStatistics();

    if (cardIndex < cards.length - 1) {
      setCardIndex(cardIndex + 1);
    }else{
      setCards([{ answer: "", collection: "", quenstion: "", timestamp: 0 }]);
      setCardIndex(0);
      GetData();
    }  
  };

  const mediumButton = () => {
    setMedium(medium + 1);
    hideAnswer();
    updateMediumStatistics();

    if (cardIndex < cards.length - 1) {
      setCardIndex(cardIndex + 1);
    }else{
      setCards([{ answer: "", collection: "", quenstion: "", timestamp: 0 }]);
      setCardIndex(0);
      GetData();
    }
  };

  const easyButton = () => {
    setEasy(easy + 1);
    hideAnswer();
    updateEasyStatistics();

    if (cardIndex < cards.length - 1) {
      setCardIndex(cardIndex + 1);
    }else{
      setCards([{ answer: "", collection: "", quenstion: "", timestamp: 0 }]);
      setCardIndex(0);
      GetData();
    }
  };

  return (
    <View style={styles.container} behavior="padding">
      {cards.length != 0 ? (
        <View style={styles.container} behavior="padding">
          <View style={styles.row}>
            <Text style={[styles.paddingHead, styles.retry_text]}>{retry}</Text>
            <Text style={[styles.paddingHead, styles.hard_text]}>{hard}</Text>
            <Text style={[styles.paddingHead, styles.medium_text]}>
              {medium}
            </Text>
            <Text style={[styles.paddingHead, styles.easy_text]}>{easy}</Text>
          </View>
          <View style={styles.question_container}>
            <Text style={styles.question_text}>
              {cards[cardIndex].quenstion}
            </Text>
            <View style={styles.answer_container}>
              {visible ? (
                <Text style={styles.answer_text}>
                  {cards[cardIndex].answer}
                </Text>
              ) : null}
              {!visible ? (
                <TouchableOpacity style={[styles.buttom]} onPress={showAnswer}>
                  <Text style={[styles.buttomText]}>Show Answer</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View>
            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.retry_buttom]}
                disabled={loading}
                onPress={retryButton}
              >
                <Text style={[styles.buttomText]}>Retry</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.hard_buttom]}
                disabled={loading}
                onPress={hardButton}
              >
                <Text style={[styles.buttomText]}>Hard</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.medium_buttom]}
                disabled={loading}
                onPress={mediumButton}
              >
                <Text style={[styles.buttomText]}>Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.easy_buttom]}
                disabled={loading}
                onPress={easyButton}
              >
                <Text style={[styles.buttomText]}>Easy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.center} behavior="padding">
          <Text style={styles.congratulations_text}>
            There are no more cards in this collection for today! Great work!
          </Text>
          <TouchableOpacity style={[styles.buttom]} onPress={goBack}>
            <Text style={[styles.buttomText]}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  center: {
    paddingHorizontal: 10,
    paddingBottom: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  congratulations_text: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    paddingBottom: 20
  },

  question_container: {
    justifyContent: "center",
    alignItems: "center",
  },

  question_text: {
    fontSize: 20,
    fontWeight: "bold",
  },

  answer_container: {
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  answer_text: {
    fontSize: 20,
    fontWeight: "normal",
  },

  paddingHead: {
    paddingHorizontal: 10,
  },

  retry_text: {
    fontSize: 16,
    color: "red",
    textDecorationLine: "underline",
  },

  hard_text: {
    fontSize: 16,
    color: "orange",
    textDecorationLine: "underline",
  },

  medium_text: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
  },

  easy_text: {
    fontSize: 16,
    color: "green",
    textDecorationLine: "underline",
  },

  buttom: {
    backgroundColor: "#3070C0",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  easy_buttom: {
    backgroundColor: "green",
    width: "40%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  medium_buttom: {
    backgroundColor: "blue",
    width: "40%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  hard_buttom: {
    backgroundColor: "orange",
    width: "40%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  retry_buttom: {
    backgroundColor: "red",
    width: "40%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttomText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "#b0b0b0",
    borderWidth: 1,
    marginTop: 5,
  },

  modal: {
    marginTop: 60,
    padding: 20,
    borderRadius: 20,
    elevation: 10,
    backgroundColor: "white",
  },

  modal_text: {
    fontSize: 20,
  },

  row: {
    paddingTop: 15,
    justifyContent: "space-around",
    flexDirection: "row",
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
