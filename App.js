import { StatusBar, SafeAreaProvider, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Castro from './components/Castro';
import { Ionicons } from '@expo/vector-icons';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaProvider>
        <SafeAreaView style={Estilo.safeAreaViewConteiner}>
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName="">
            </Drawer.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}