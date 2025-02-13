import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Hero from "./components/hero"
import SearchActions from "./components/search-actions"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Home" component={Hero} />
        <Stack.Screen name="SearchActions" component={SearchActions} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}