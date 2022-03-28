import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import MapView from "react-native-maps";

export default function App() {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [mapRegion, setmapRegion] = useState(null);

	useEffect(() => {
		(async () => {
			if (Platform.OS === "android" && !Constants.isDevice) {
				setErrorMsg("Oops, this will not work on Snack in an Android emulator. Try it on your device!");
				return;
			}
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []); 

	let text = "Waiting..";
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		console.log(location.coords.latitude);
		console.log(location.coords.longitude);
		text = JSON.stringify(location);


	}

	// const [mapRegion, setmapRegion] = useState({
	// 	latitude: 37.78825,
	// 	longitude: -122.4324,
	// 	latitudeDelta: 0.0922,
	// 	longitudeDelta: 0.0421,
	//   });


	return (
		<View style={styles.container}>
			<MapView style={styles.map} region={mapRegion}>
				<Marker coordinate={mapRegion} title="Marker" />
			</MapView>
			<Text style={styles.paragraph}>{text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	paragraph: {
		fontSize: 18,
		textAlign: "center",
	},
	map: {
		width: Dimensions.get("window").width * 0.8,
		height: Dimensions.get("window").height * 0.3,
	},
});
