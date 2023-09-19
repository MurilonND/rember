import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import useAuth from './hooks/useAuth';
import Test from './src/screens/Test';

const Stack = createNativeStackNavigator();
// const InsideStack = createNativeStackNavigator();

// function InsideLayout() {
//   return (
//     <NavigationContainer>
//       <InsideStack.Navigator>
//         <InsideStack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
//       </InsideStack.Navigator>
//     </NavigationContainer>
//   );
// }

export default function App() {
  const { user } = useAuth();

  if(user){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Test'>
          <Stack.Screen name="Test" component={Test} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }else{
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
