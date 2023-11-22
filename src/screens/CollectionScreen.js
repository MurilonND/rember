import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getDocs,
  collection,
  where,
  query,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIRESTOR_DB } from "../../firebase";

export default function CollectionScreen({ route }) {
  const collectionId = route.params.collectionId;

  const [cards, setCards] = useState();
  const [cardQuestion, setCardQuestion] = useState();
  const [cardAnswer, setCardAnswer] = useState();
  const [visible, setVisible] = useState(false);
  const [userRef, setUserRef] = useState();

  const GetData = async () => {
    var currentUser = FIREBASE_AUTH.currentUser;
    var currentUserEmail = currentUser.email;

    const uCard = collection(FIRESTOR_DB, "users");
    const uQuerys = query(uCard, where("email", "==", currentUserEmail));
    const snapshot = await getDocs(uQuerys);
    setUserRef(snapshot.docs[0].ref);
    const user = snapshot.docs.map((doc) => doc.data());
    const userCards = user[0].cards.filter(
      (item) => item.collection == collectionId
    );
    setCards(userCards ?? []);
  };

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const createCard = async () => {
    try {
      var date = new Date().getTime();
      var card = {
        quenstion: cardQuestion,
        answer: cardAnswer,
        collection: collectionId,
        timestamp: date,
      };
      await updateDoc(userRef, {
        cards: arrayUnion(card),
      });
    } catch (e) {
      console.log("ERROR: ", e.message);
    }

    setCardQuestion("");
    setCardAnswer("");
    closeModal();
    GetData();
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <View style={styles.container} behavior="padding">
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          style={{}}
        >
          <View style={styles.modal}>
            <Text style={styles.modal_text}>Create the new Card: </Text>
            <TextInput
              placeholder="Question"
              value={cardQuestion}
              onChangeText={(text) => setCardQuestion(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Answer"
              value={cardAnswer}
              onChangeText={(text) => setCardAnswer(text)}
              style={styles.input}
            />
            <View style={styles.row}>
              <TouchableOpacity
                onPress={createCard}
                style={[styles.confirm_buttom]}
              >
                <Text style={[styles.buttomText]}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeModal}
                style={[styles.cancel_buttom]}
              >
                <Text style={[styles.buttomText]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <TouchableOpacity
        onPress={openModal}
        style={[styles.buttom, styles.buttom]}
      >
        <Text style={[styles.buttomText]}>Create New Card</Text>
      </TouchableOpacity>
      <FlatList
        data={cards}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity style={[styles.cardButtom]}>
              <Text numberOfLines={1} style={styles.cardButtomText}>
                {item.quenstion}
              </Text>
              <Text numberOfLines={1}>{item.answer}</Text>
            </TouchableOpacity>
          </View>
        )}
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

  sizeBoxH: {
    height: 30,
  },

  buttom: {
    backgroundColor: "#3070C0",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  confirm_buttom: {
    backgroundColor: "#3070C0",
    width: "40%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  cancel_buttom: {
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
