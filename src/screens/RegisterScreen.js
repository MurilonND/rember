import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTOR_DB } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goToLogin = () => navigation.navigate("Login");

  const createUser = async (email) => {
    await addDoc(collection(FIRESTOR_DB, "users"), {
      email: email,
      cards: [],
      collections: [],
      easy: 0,
      medium: 0,
      hard: 0,
      retry: 0,
    })
  }

  const handleRegister = async () => {
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password).then((user) => createUser(user._tokenResponse.email));
        goToLogin;
      } catch (e) {
        console.log("ERROR: ", e.message);
      }
    }
  };

  return (
    <View style={styles.container} behavior="padding">
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <View style={styles.sizeBoxH}></View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          email
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttomContainer}>
        <TouchableOpacity
          onPress={handleRegister}
          style={[styles.buttom, styles.buttom]}
        >
          <Text style={[styles.buttomText]}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToLogin} style={styles.paddingVertical}>
          <Text style={styles.buttomOutilneText}>Go back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  descriptionContainer: {
    paddingHorizontal: 30,
  },

  description: {
    textAlign: "center",
  },

  logo: {
    // width: null,
    height: 110,
    resizeMode: "contain",
    // paddingBottom: 20
  },

  sizeBoxH: {
    height: 30,
  },

  inputContainer: {
    width: "80%",
    paddingTop: 5,
  },

  paddingVertical: {
    paddingVertical: 5,
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

  buttomContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  buttom: {
    backgroundColor: "#0084B8",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttomOutilne: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },

  buttomText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  buttomOutilneText: {
    color: "#0084B8",
    fontWeight: "700",
    fontSize: 16,
    // textDecorationLine: 'underline'
  },
});
