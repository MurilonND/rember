import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import useAuth from "./hooks/useAuth";
import Home from "./src/screens/Home";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebase";
import StatisticsScreen from "./src/screens/StatisticsScreen";
import QuizzesScreen from "./src/screens/QuizzesScreen";
import CollectionsScreen from "./src/screens/CollectionsScreen";
import QuizScreen from "./src/screens/QuizScreen";
import CollectionScreen from "./src/screens/CollectionScreen";


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
const handleLogout = async () => {
  await signOut(FIREBASE_AUTH);
};

function HeaderHome({ navigation }) {
  return (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: "space-between",}}>
      <Text style={{color: 'white', fontWeight: "bold", padding: 5, fontSize: 22}}>Home</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.buttom}>
        <Text style={styles.buttomText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

function HeaderPage({ navigation , pageName }) {
  return (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: "space-between",}}>
      <Text style={{color: 'white', fontWeight: "bold", padding: 5, fontSize: 22}}>{pageName}</Text>
    </View>
  );
}

export default function App() {
  const { user } = useAuth();

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#5893D4',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
          <Stack.Screen name="Home" component={Home} options={{ headerTitle: () => <HeaderHome />}}/>
          <Stack.Screen name="Quizzes" component={QuizzesScreen} options={{ headerTitle: () => <HeaderPage pageName="Quizzes" />}}/>
          <Stack.Screen name="Quiz" component={QuizScreen} options={{ headerTitle: () => <HeaderPage pageName="Quiz" />}}/>
          <Stack.Screen name="Collections" component={CollectionsScreen} options={{ headerTitle: () => <HeaderPage pageName="Collections" />}}/>
          <Stack.Screen name="Collection" component={CollectionScreen} options={{ headerTitle: () => <HeaderPage pageName="Collection" />}}/>
          <Stack.Screen name="Statistics" component={StatisticsScreen} options={{ headerTitle: () => <HeaderPage pageName="Statistics" />}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Register"
            component={RegisterScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  buttom: {
    backgroundColor: "red",
    // width: "100%",
    marginRight: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  buttomText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
