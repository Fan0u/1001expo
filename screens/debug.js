import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from 'react-native';
import { Constants, Location } from 'expo';
import * as TaskManager from 'expo-task-manager';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const App = () => {

 

  useEffect(() => {
    let region = {identifier:1, latitude:51.5572754, longitude:-0.2702119, radius:10}
    Location.startGeofencingAsync("LOCATION_GEOFENCE", [region])

    TaskManager.defineTask("LOCATION_GEOFENCE", ({ data: { eventType, region }, error }) => {
        if (error) {
          // check `error.message` for more details.
          return;
        }
        if (eventType === Location.GeofencingEventType.Enter) {
          alert("enter in region!")
          console.log("You've entered region:", region);
        } else if (eventType === Location.GeofencingEventType.Exit) {
          console.log("You've left region:", region);
        }
    });
  }
  
  

  

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Change code in the editor and watch it change on your phone! Save to get a shareable url.
        </Text>
        <Card>
          <AssetExample />
        </Card>
      </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App
