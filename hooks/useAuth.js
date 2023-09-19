import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebase';


export default function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(()=>{
      const unsub = onAuthStateChanged( FIREBASE_AUTH, user => {
        if(user){
          setUser(user);
        }else{
            setUser(null);
        }
      }
      )
      return unsub;
    }, [])

    return { user } 
}