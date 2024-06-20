import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

export default function HomeScreen({ navigation, onTeamsUpdate }) {
  const [player, setPlayer] = useState('');
  const [players, setPlayers] = useState([]);
  const [numTeams, setNumTeams] = useState('2');

  const handleAddPlayer = () => {
    if (player.trim()) {
      setPlayers([...players, player.trim()]);
      setPlayer('');
    }
  };

  const handleRemovePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const shuffledPlayers = players.sort(() => 0.5 - Math.random());
    const teams = Array.from({ length: parseInt(numTeams, 10) }, () => []);

    shuffledPlayers.forEach((player, index) => {
      teams[index % teams.length].push(player);
    });

    onTeamsUpdate(teams);
    navigation.navigate('Teams');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Lisää osallistuja:</Text>
      <TextInput
        style={styles.input}
        value={player}
        onChangeText={setPlayer}
        placeholder="Kirjoita osallistujan nimi"
        placeholderTextColor="gray"
      />
      <Text style={styles.label}>Tiimien lukumäärä:</Text>
      <TextInput
        style={styles.input}
        value={numTeams}
        onChangeText={setNumTeams}
        keyboardType="number-pad"
        placeholder="Syötä tiimien lukumäärä"
        placeholderTextColor="gray"
      />
      <View style={styles.buttonContainer}>
        <Button
          icon={<Icon name="add" size={20} color="white" />}
          buttonStyle={styles.addButton}
          title="Lisää"
          onPress={handleAddPlayer}
        />
        <Button
          icon={<Icon name="shuffle" size={20} color="white" />}
          buttonStyle={styles.shuffleButton}
          title="Arvo Tiimit"
          onPress={handleSubmit}
        />
      </View>
      <FlatList
        data={players}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item}</ListItem.Title>
            </ListItem.Content>
            <Icon
              name="delete"
              size={24}
              color="red"
              onPress={() => handleRemovePlayer(index)}
            />
          </ListItem>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1A237E" // Dark blue background
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#FFFFFF' // White text color
  },
  input: {
    height: 40,
    borderColor: '#3949AB', // Lighter blue for borders
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#3F51B5', // Blue background for inputs
    color: '#FFFFFF' // White text color for inputs
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#3949AB', // Blue button color
  },
  shuffleButton: {
    backgroundColor: '#1E88E5', // Another shade of blue for the shuffle button
  },
});