import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../firebase'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async ()=> {
    if(email && password) {
      try{
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      }catch(e){
        console.log("ERROR: ", e.message);
      }
    }
  }

  const handleLogin = async ()=> {
    if(email && password) {
      try{
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      }catch(e){
        console.log("ERROR: ", e.message);
      }
    }
  }

  return (
    <View
    style={styles.container}
    behavior='padding'>
      <View style={styles.inputContainer}>
        <TextInput placeholder='Email'  
        value= { email }
        onChangeText={ text => setEmail(text) }
        style={styles.input}
        />
        <TextInput placeholder='Senha'  
        value= { password }
        onChangeText={ text => setPassword(text) }
        style={styles.input}
        secureTextEntry
        />
      </View>

      <View style={styles.buttomContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.buttom}
        >
          <Text style={styles.buttomText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRegister}
          style={[styles.buttom, styles.buttomOutilne]}
        > 
          <Text style={[styles.buttomOutilneText]}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputContainer:{
    width: '80%'
  },

  input:{
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  buttomContainer:{
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  buttom:{
    backgroundColor: '#0782F9',
    width: '100%',
    padding:15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttomOutilne:{
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },

  buttomText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  buttomOutilneText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})