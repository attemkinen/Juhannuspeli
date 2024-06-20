import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import { Button, Icon, Card, ListItem } from "react-native-elements";

export default function TeamsScreen({ teams, setTeams }) {
  const [editingTeamIndex, setEditingTeamIndex] = useState(null);
  const [newTeamName, setNewTeamName] = useState("");
  const [points, setPoints] = useState({});

  const handleEditTeamName = (index) => {
    setEditingTeamIndex(index);
    setNewTeamName(teams[index].name || `Tiimi ${index + 1}`);
  };

  const handleSaveTeamName = (index) => {
    const updatedTeams = [...teams];
    updatedTeams[index].name = newTeamName;
    setTeams(updatedTeams);
    setEditingTeamIndex(null);
  };

  const handleAddPoints = (teamIndex, pointsToAdd) => {
    const updatedPoints = { ...points };
    if (!updatedPoints[teamIndex]) {
      updatedPoints[teamIndex] = 0;
    }
    updatedPoints[teamIndex] += pointsToAdd;
    setPoints(updatedPoints);
  };

  const handleSubtractPoints = (teamIndex, pointsToSubtract) => {
    const updatedPoints = { ...points };
    if (!updatedPoints[teamIndex]) {
      updatedPoints[teamIndex] = 0;
    }
    updatedPoints[teamIndex] -= pointsToSubtract;
    setPoints(updatedPoints);
  };

  const getTotalPoints = (teamIndex) => {
    return points[teamIndex] || 0;
  };

  return (
    <View style={styles.container}>
      <View></View>
      <FlatList
        data={teams}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card>
            <Card.Title>
              {editingTeamIndex === index ? (
                <View style={styles.inlineForm}>
                  <TextInput
                    style={styles.input}
                    value={newTeamName}
                    onChangeText={setNewTeamName}
                    placeholder="Syötä tiimin nimi"
                    placeholderTextColor="gray"
                  />
                  <Button
                    icon={<Icon name="save" size={20} color="white" />}
                    buttonStyle={styles.saveButton}
                    title="Tallenna"
                    onPress={() => handleSaveTeamName(index)}
                  />
                </View>
              ) : (
                <>
                  {item.name || `Tiimi ${index + 1}`}
                  <Icon
                    name="edit"
                    size={24}
                    color="blue"
                    onPress={() => handleEditTeamName(index)}
                  />
                </>
              )}
            </Card.Title>

            <FlatList
              data={item}
              keyExtractor={(player, playerIndex) => playerIndex.toString()}
              renderItem={({ item }) => (
                <ListItem bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{item}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              )}
            />

            <Card.Divider />
            <View style={styles.pointsContainer}>
              <Button
                icon={
                  <Icon
                    name="plus-circle"
                    type="feather"
                    size={15}
                    color="white"
                  />
                }
                buttonStyle={styles.pointsButton1}
                title="4 pts"
                onPress={() => handleAddPoints(index, 4)}
              />
              <Button
                icon={
                  <Icon
                    name="plus-circle"
                    type="feather"
                    size={15}
                    color="white"
                  />
                }
                buttonStyle={styles.pointsButton2}
                title="2 pts"
                onPress={() => handleAddPoints(index, 2)}
              />
              <Button
                icon={
                  <Icon
                    name="plus-circle"
                    type="feather"
                    size={15}
                    color="white"
                  />
                }
                buttonStyle={styles.pointsButton3}
                title="1 pts"
                onPress={() => handleAddPoints(index, 1)}
              />
            </View>
            <View style={styles.minusPointContainer}>
              <Button
                icon={
                  <Icon
                    name="minus-circle"
                    type="feather"
                    size={15}
                    color="white"
                  />
                }
                buttonStyle={styles.subtractButton}
                title="1 pts"
                onPress={() => handleSubtractPoints(index, 1)}
              />
            </View>
            <Text style={styles.totalPoints}>
              Yhteispisteet: {getTotalPoints(index)}
            </Text>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E6EE9C",
  },
  inlineForm: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  saveButton: {
    backgroundColor: "blue",
  },
  pointsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    margin: 15,
  },
  pointsButton1: {
    backgroundColor: "green",
  },
  pointsButton2: {
    backgroundColor: "orange",
  },
  pointsButton3: {
    backgroundColor: "purple",
  },
  subtractButton: {
    backgroundColor: "red",
  },
  totalPoints: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
  },
  minusPointContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    margin: 15,
  },
  cardDivider: {
    backgroundColor: "#9E9D24",
  },
});
