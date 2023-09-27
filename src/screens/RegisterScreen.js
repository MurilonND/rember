import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../firebase'

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const goToLogin = () => navigation.navigate('Login')

  const handleRegister = async ()=> {
    if(email && password) {
      try{
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        goToLogin
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
      <TextInput placeholder='Username'  
        value= { username }
        onChangeText={ text => setUsername(text) }
        style={styles.input}
        />
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
          onPress={handleRegister}
          style={[styles.buttom, styles.buttom]}
        > 
          <Text style={[styles.buttomText]}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goToLogin}
          style={styles.paddingVertical}
        >
          <Text style={styles.buttomOutilneText}>Go back to Login</Text>
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

  paddingVertical:{
    paddingVertical:5
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