import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity, TextInput, Dimensions } from "react-native";
import * as Location from "expo-location";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";

import * as TaskManager from "expo-task-manager";

import Colors from "../constants/Colors";

// Variables
const window = Dimensions.get('window');
const screen = Dimensions.get('screen');


var exportTaskInfo = "No Info";
var exportTaskInOut = "No Info";

TaskManager.defineTask("test", ({ data, error }) => {

	if (error) {
		// check `error.message` for more details.
		return;
	}
	if (true) {
		// console.log("DEFINE TASK START", data);
		console.log("DEFINE TASK START", data.region.identifier, data);
		
	}
	if (data.eventType === Location.LocationGeofencingEventType.Enter) {
		//console.log("You've entered region:", data.region);
		exportTaskInfo = "Tu es rentré dans la zone " + data.region.identifier ;
		//console.log("LOCATION : ", Location)
	} else if (data.eventType === Location.LocationGeofencingEventType.Exit) {
		//console.log("You've left region:", data.region);
		exportTaskInfo = "Tu es sorti de la zone";
	}

});

const Cordinate = ({ navigation }) => {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [region, setRegion] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.015,
		longitudeDelta: 0.0121,
	});

	const [myLocationRegion, setMyLocationRegion] = useState({
		identifier: "test-1",
		latitude: 43.9058487,
		longitude: 4.2042110,
		notifyOnEnter: true,
		notifyOnExit: true,
		radius: 10,
	});

	const [myLocationRegion2, setMyLocationRegion2] = useState({
		identifier: "test-2",
		latitude: 43.9056950,
		longitude: 4.2037598,
		notifyOnEnter: true,
		notifyOnExit: true,
		radius: 10,
	});

	const [permissionResult, setPermissionResult] = useState(undefined);
	const [deviceLocation, setDeviceLocation] = useState(null);

	const getPermissionAsync = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		setPermissionResult(status);
		if (status !== "granted") {
			setErrorMsg("Accès à la localisation non autorisé");
			return;
		}
	};

	const getLocationAsync = async () => {
		await Location.watchPositionAsync(
			{
				accuracy: Location.Accuracy.BestForNavigation,
				// accuracy: Location.Accuracy.Highest,
				timeInterval: 100,
				distanceInterval: 0.5,
			},

			(newLocation) => {
				setDeviceLocation(newLocation);
				//console.log("===========" + newLocation.coords)
				setRegion({
					...region,
					latitude: newLocation.coords.latitude,
					longitude: newLocation.coords.longitude,
				});
			}
		);
	};

	// const [heading, setHeading] = useState(0); 
	// useEffect(() => {
	// 	let headingWatcher;
	
	// 	const startWatching = async () => {
	// 	  try {
	// 		headingWatcher = await watchHeadingAsync((head) => {
	// 		  if (head.accuracy !== 0) {
	// 			setHeading(head);
	// 			console.log(head.trueHeading);
	// 		  }
	// 		});
	// 	  } catch (err) {
	// 		console.log(err);
	// 	  }
	// 	};
	
	// 	startWatching();
	
	// 	return () => headingWatcher && headingWatcher.remove();
	// }, []);



	useEffect(() => {
		// If permission request is not done
		if (permissionResult === undefined) {
			getPermissionAsync();
		}

		if (permissionResult !== undefined) {
			getLocationAsync();
		}
	}, [permissionResult]);


	// TASK
	useEffect(() => {
		(async () => {
			//   let { status } = await Location.requestPermissionsAsync();
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);

			let maTask = await Location.startGeofencingAsync("test", [
				myLocationRegion, myLocationRegion2
				//radius: 1, 
			]);

			// let maTask2 = await Location.startGeofencingAsync("test", [{
			// 	...myLocationRegion2, 
			// 	//radius: 1, 
			// }]);

			// if (maTask !== undefined) {
				// console.log("maTask : ", maTask)
			// }
		})();
	}, []);

	let text2 = "Waiting..";
	if (errorMsg) {
		console.log("errorMsg", errorMsg);
		text2 = errorMsg;
	} else if (deviceLocation && deviceLocation.coords) {
		// text2 = JSON.stringify(deviceLocation.coords);
		// setRegion(deviceLocation.coords);
		text2 = JSON.stringify(deviceLocation.coords);
		//   console.log(deviceLocation)
	}

	const getLoc = async () => {
		let location = await Location.getCurrentPositionAsync({});
		setLocation(location);
		//console.log("press",location.coords)
		let latitude = location.coords.latitude;
		let longitude = location.coords.longitude;

		setRegion({
			latitude: latitude,
			longitude: longitude,
			latitudeDelta: 0.015,
			longitudeDelta: 0.0121,
		});

		//Location.startLocationUpdatesAsync(GPS_TRACKER)
		console.log("DERNIERE POSITION " + JSON.stringify(await Location.getLastKnownPositionAsync()));
		// sendLoc()
	};

	const getLatLon = async () => {
		let location = await Location.getCurrentPositionAsync({});
		return {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
		};
	};

	const sendLoc = () => {
		let latitude = location.coords.latitude;
		let longitude = location.coords.longitude;
		console.log("Use these variables to send current location(", latitude, ",", longitude, ")");
	};

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */



	return (
		<View style={styles.container}>
			<View style={styles.camera}>
				<MapView
					provider={PROVIDER_GOOGLE} // remove if not using Google Maps
					mapType="hybrid"
					style={styles.map}
					region={region}
					onMapReady={getLoc}
					minZoomLevel={19}
					maxZoomLevel={19}
					// showsCompass={true}
					// zoomControlEnabled={true}
				>
					<Marker
						coordinate={region}
						// coordinate={getLatLon}
						title="this is a marker"
						description="this is a marker example"
					/>
					{/* <Circle
						center={{
							"identifier": "test-1",
							"latitude": 43.90585,
							"longitude": 4.20425,
							"radius": 10,
							"state": 2,
						}}
						radius={myLocationRegion.radius}
						strokeWidth={2}
						strokeColor="rgba(255,255,0,0.5)"
						fillColor="rgba(255,255,0,0.2)"
					></Circle> */}
					<Circle
						center={myLocationRegion}
						radius={myLocationRegion.radius}
						strokeWidth={2}
						strokeColor="rgba(255,0,0,0.5)"
						fillColor="rgba(255,0,0,0.2)"
					></Circle>
					<Circle
						center={myLocationRegion2}
						radius={myLocationRegion2.radius}
						strokeWidth={2}
						strokeColor="rgba(255,0,0,0.5)"
						fillColor="rgba(255,0,0,0.2)"
					></Circle>
				</MapView>
			</View>
			{/* <View style={styles.buttonContainer}>
				<Text style={styles.buttonText}>latitude </Text>
				<TextInput style={styles.TextInput}> {region.latitude}</TextInput>
			</View>
			<View style={styles.buttonContainer}>
				<Text style={styles.buttonText}>longitude</Text>
				<TextInput style={styles.TextInput}> {region.longitude}</TextInput>
			</View>
			<TouchableOpacity style={styles.btLogin1} onPress={getLoc}>
				<Text style={styles.buttonText1}>Get coordinates</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.btLogin1} onPress={sendLoc}>
				<Text style={styles.buttonText1}>Send coordinates</Text>
			</TouchableOpacity>
			<View>
				<Text>
					{region.latitude} / {region.longitude}
				</Text>
			</View>
			<View>
				<Text>
					{myLocationRegion.latitude} / {myLocationRegion.longitude} / {myLocationRegion.radius}
				</Text>
			</View>
			<View>
				<Text>{text2}</Text>
			</View> */}
			<View>
				<Text>{exportTaskInfo}</Text>
			</View>
			<View>
				<Text>{exportTaskInOut}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#fff",
		margin:0,
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	camera: {
		// marginTop: 10,
		// marginBottom: 10,
		// aspectRatio: 1,
		flex: 1,
		height: "100%",
		width: "100%",
	
		borderWidth: 1,
		borderColor: Colors.primary,
	},
	buttonContainer: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 10,
	},
	button: {
		alignSelf: "flex-end",
		alignItems: "center",
		color: "#000",
	},
	buttonText: {
		fontSize: 15,
		color: "#3675B8",
		marginTop: 6,
	},
	buttonText1: {
		fontSize: 16,
		color: "#fff",
	},
	text: {
		fontSize: 18,
		color: "#000",
	},
	btLogin: {
		borderWidth: 1.5,
		borderColor: "#3675B8",
		height: 37,
		backgroundColor: "#3675B8",
		padding: 7,
		borderRadius: 5,
		marginTop: 12,
		marginBottom: 12,
		marginLeft: 12,
		marginRight: 12,
		width: "46.5%",
		alignItems: "center",
	},
	btLogin1: {
		borderWidth: 1.5,
		borderColor: "#3675B8",
		height: 37,
		marginHorizontal: 20,
		backgroundColor: "#3675B8",
		padding: 7,
		borderRadius: 5,
		marginTop: 12,
		marginBottom: 12,
		width: "67%",
		alignItems: "center",
	},
	TextInput: {
		height: 30,
		marginTop: 6,
		borderRadius: 5,
		borderColor: "#3675B8",
		borderWidth: 1,
		borderBottomWidth: 1,
		marginTop: 10,
		borderBottomColor: "#3675B8",
		backgroundColor: "#eff9f8",
		marginHorizontal: 6,
		width: "52%",
	},
});

export default Cordinate;
