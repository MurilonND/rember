import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../firebase'

export default function Test({ navigation }) {
    const handleLogout = async () => {
        await signOut(FIREBASE_AUTH);
    }

  return (
    <View>
      <Text>Test</Text>
      <TouchableOpacity
          onPress={handleLogout}
          style={styles.buttom}
        >
          <Text style={styles.buttomText}>Logout</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    buttom:{
        backgroundColor: 'red',
        width: '100%',
        padding:15,
        borderRadius: 10,
        alignItems: 'center',
      },

    buttomText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
})