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

export default function CollectionsScreen({ navigation }) {
  const [collections, setCollections] = useState();
  const [collectionName, setCollectionName] = useState();
  const [visible, setVisible] = useState(false);
  const [userRef, setUserRef] = useState();

  const GetData = async () => {
    var currentUser = FIREBASE_AUTH.currentUser;
    var currentUserEmail = currentUser.email;

    const uCollection = collection(FIRESTOR_DB, "users");
    const uQuerys = query(uCollection, where("email", "==", currentUserEmail));
    const snapshot = await getDocs(uQuerys);
    setUserRef(snapshot.docs[0].ref);
    const user = snapshot.docs.map((doc) => doc.data());

    setCollections(user[0].collections ?? []);
  };

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const createCollection = async () => {
    try {
      await updateDoc(userRef, {
        collections: arrayUnion(collectionName),
      });
    } catch (e) {
      console.log("ERROR: ", e.message);
    }

    closeModal();
    GetData();
  };

  useEffect(() => {
    GetData();
  }, []);

  const goToCollection = (collectionId) => {
    navigation.navigate("Collection", {
      collectionId: collectionId,
    });
  };

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
            <Text style={styles.modal_text}>Name the new Collection: </Text>
            <TextInput
              placeholder="Collection"
              value={collectionName}
              onChangeText={(text) => setCollectionName(text)}
              style={styles.input}
            />
            <View style={styles.row}>
              <TouchableOpacity
                onPress={createCollection}
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
        <Text style={[styles.buttomText]}>Create New Collection</Text>
      </TouchableOpacity>
      <FlatList
        data={collections}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() => goToCollection(item)}
              style={[styles.cardButtom]}
            >
              <Text numberOfLines={1} style={styles.cardButtomText}>
                {item}
              </Text>
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
