import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";


export default function App() {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [region, setRegion] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.015,
		longitudeDelta: 0.0121,
	});

	useEffect(() => {
		(async () => {
			//   let { status } = await Location.requestPermissionsAsync();
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
			}

			let location = await Location.getCurrentPositionAsync({});
			// let location = await Location.startLocationUpdatesAsync({});
			setLocation(location);
		})();
	}, []);

	// const watch_location = async () => {
	// 	if (status === "granted") {
	// 		let location = await Location.watchPositionAsync({
	// 		accuracy:Location.Accuracy.High,
	// 		timeInterval: 10000,
	// 		distanceInterval: 80,
	// 		}, 
	// 		false
	// 		,(location_update) => {
	// 		console.log('update location!', location_update.coords)
	// 	   }
	// 	 })}}
		
	let text = "Waiting..";
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		console.log("Latitude :" + location.coords.latitude);
		console.log("Longitude :" + location.coords.longitude);
		text = JSON.stringify(location);
	}


	
	const getLoc = () => {
		//console.log("press",location.coords)
		
		(async () => {
			//   let { status } = await Location.requestPermissionsAsync();
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();

		let latitude = location.coords.latitude;
		let longitude = location.coords.longitude;
		setRegion({
			latitude: latitude,
			longitude: longitude,
			latitudeDelta: 0.015,
			longitudeDelta: 0.0121,
		});
	};

	const sendLoc = () => {
		let latitude = location.coords.latitude;
		let longitude = location.coords.longitude;
		console.log("Use these variables to send current location(", latitude, ",", longitude, ")");
	};

	// setTimeout(() => {
	// 	getLoc();
	// }, 5000) ;	
		//setInterval(getLoc, 500);
		//setInterval(sendLoc, 1000);
	
	

	return (
		<View style={styles.container}  >
			<MapView style={styles.map} region={region} onPress={getLoc} onMapReady={getLoc}>
				<Marker coordinate={region} title="Marker" />
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
