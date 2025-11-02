import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { HomeScreen } from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [sessionUser, setSessionUser] = useState(null);

  return (
    <NavigationContainer>
      {sessionUser ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {(props) => <HomeScreen {...props} user={sessionUser} onLogout={() => setSessionUser(null)} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen
                {...props}
                onLoginSuccess={(user) => setSessionUser(user)}
                onNavigateToRegister={() => props.navigation.navigate('Register')}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Register">
            {(props) => (
              <RegisterScreen
                {...props}
                onRegisterSuccess={() => props.navigation.navigate('Login')}
                onNavigateToLogin={() => props.navigation.navigate('Login')}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
