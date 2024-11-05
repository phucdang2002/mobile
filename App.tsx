import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import Learn from './src/pages/Learn';
import Lessons from './src/pages/Lessons';
import Login from './src/pages/Login';
import Study from './src/pages/Study';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContextProvider } from './src/component/AuthContext';
import { Icon } from 'react-native-paper';
import { LogBox } from 'react-native';
import Profile from './src/pages/Profile';
import Result from './src/pages/Result';
import Topic from './src/pages/Topic';
import StudyAI from './src/pages/StudyAI';
import ResultAI from './src/pages/ResultAI';
import Ranking from './src/pages/Ranking';
import { MenuProvider } from 'react-native-popup-menu';
import Test from './src/pages/Test';
import Tests from './src/pages/Tests';
import ResultTest from './src/pages/ResultTest';
import SideAvatar from './src/component/SideAvatar';
import StudyWithAI from './src/pages/StudyWithAI';
import TestAI from './src/pages/TestAI';
LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs()
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home({navigation}) {
  return (
    <Stack.Navigator initialRouteName='Learn'>
      <Stack.Screen name='Learn' component={Learn} options={{headerLeft: () => null, headerRight: ()=><SideAvatar navigation={navigation}/>}}/>
      <Stack.Screen name='Lesson' component={Lessons}/>
      <Stack.Screen name='Study' component={Study} options={{headerShown: false}}/>
      <Stack.Screen name='Result' component={Result} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}
function TestScreen({navigation}) {
  return (
    <Stack.Navigator initialRouteName='Tests'>
      <Stack.Screen name='Tests' component={Tests} options={{headerLeft: () => null, headerRight: ()=><SideAvatar navigation={navigation.getParent()}/>}}/>
      <Stack.Screen name='Test' component={Test} options={{headerShown: false}}/>
      <Stack.Screen name='ResultTest' component={ResultTest} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

function LoginScreen() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
      <Stack.Screen name='UserScreen' component={UserScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}
function TopicScreen({navigation}) {
  return(
    <Stack.Navigator initialRouteName='Topic'>
      <Stack.Screen name='Topic' component={Topic} options={{headerLeft: ()=>null, headerRight: ()=><SideAvatar navigation={navigation.getParent()}/>}}/>
      <Stack.Screen name='StudyAI' component={StudyAI} options={{headerShown: false}}/>
      <Stack.Screen name='ResultAI' component={ResultAI} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}
function AIScreen({navigation}) {
  return (
    <Stack.Navigator initialRouteName='AI'>
      <Stack.Screen name='AI' component={StudyWithAI} options={{headerLeft: ()=>null, headerRight: ()=><SideAvatar navigation={navigation.getParent()}/>}}/>
      <Stack.Screen name='Topic' component={Topic} />
      <Stack.Screen name='TestAI' component={TestAI} options={{title: "Test with AI"}}/>
      <Stack.Screen name='StudyAI' component={StudyAI} options={{headerShown: false}}/>
      <Stack.Screen name='ResultAI' component={ResultAI} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}
function UserScreen({navigation}) {
  return (
    <MenuProvider>
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name='Home' component={Home} options={{headerShown: false, tabBarIcon:({ color, size })=><Icon source="home" color={color} size={size}/> }}/>
        <Tab.Screen name='TestScreen' component={TestScreen} options={{title: "Test", headerShown: false, tabBarIcon:({ color, size })=><Icon source="lead-pencil" color={color} size={size}/> }}/>
        <Tab.Screen name='AIScreen' component={AIScreen} options={{title: "AI", headerShown: false, tabBarIcon:({color, size})=><Icon source="head-lightbulb" color={color} size={size}/>}}/>
        <Tab.Screen name='Ranking' component={Ranking} options={{tabBarIcon:({color, size})=><Icon source="chart-box-outline" color={color} size={size}/>, headerRight: ()=><SideAvatar navigation={navigation}/>}}/>
        <Tab.Screen name='Profile' component={Profile} options={{tabBarIcon:({ color, size })=><Icon source="account-circle" color={color} size={size}/>}}/>
      </Tab.Navigator>
    </MenuProvider>
  )
}
function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <LoginScreen/>
      </NavigationContainer>
    </AuthContextProvider>
  )
}

export default App;
