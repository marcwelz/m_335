import AddTask from './components/AddTask';
import HomeScreen from './components/HomeScreen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Results from './components/Results';
import Settings from './components/Settings';
import Timer from './components/Timer';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add Task" component={AddTask} />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="Timer" component={Timer} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
