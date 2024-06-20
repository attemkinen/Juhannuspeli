import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import TeamsScreen from './screens/TeamScreen';
import { database, ref, onValue, set } from './firebase';

const Stack = createStackNavigator();

export default function App() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const teamsRef = ref(database, 'teams');
    const unsubscribe = onValue(teamsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTeams(data);
      }
    });

    // Palauta funktio, joka poistaa kuuntelijan
    return () => unsubscribe();
  }, []);

  const handleTeamsUpdate = (generatedTeams) => {
    setTeams(generatedTeams);
    const teamsRef = ref(database, 'teams');
    set(teamsRef, generatedTeams);
  };

  const handleSetTeams = (updatedTeams) => {
    setTeams(updatedTeams);
    const teamsRef = ref(database, 'teams');
    set(teamsRef, updatedTeams);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: 'Lisää osallistujat' }}>
          {(props) => <HomeScreen {...props} onTeamsUpdate={handleTeamsUpdate} />}
        </Stack.Screen>
        <Stack.Screen name="Teams" options={{ title: 'Tiimit' }} >
          {(props) => <TeamsScreen {...props} teams={teams} setTeams={handleSetTeams} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
