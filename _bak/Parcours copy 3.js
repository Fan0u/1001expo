import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity, TextInput } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import Geolocation from "react-native-geolocation-service";
import Constants from "expo-constants";

const Cordinate = ({ navigation }) => {

	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [region, setRegion] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.015,
		longitudeDelta: 0.0121,
	});


	console.log('render')

	const [permissionResult, setPermissionResult] = useState(undefined);
	const [deviceLocation, setDeviceLocation] = useState(null);
	
  
	const getPermissionAsync = async () => {
	  let { status } = await Location.requestForegroundPermissionsAsync();
	  setPermissionResult(status)
	  if (status !== 'granted') {
		setErrorMsg('Permission to access location was denied');
		return;
	  }
	}
  
	const getLocationAsync = async() => {
	  await Location.watchPositionAsync({
		accuracy: Location.Accuracy.BestForNavigation,
		timeInterval: 1000,
		distanceInterval : 20
	  }, 
		(newLocation) => {
		  setDeviceLocation(newLocation); 
		  console.log("===========" + newLocation.coords)
		  setRegion({
			latitude: newLocation.coords.latitude,
			longitude: newLocation.coords.longitude,
			latitudeDelta: 0.015,
			longitudeDelta: 0.0121,
		})
		}
	  );
	};
  
	useEffect(() => {
	  // If permission request is not done
	  if (permissionResult === undefined) {
		getPermissionAsync();
	  }
	}, [permissionResult]);
  
	useEffect(()=>{
	  // If permission has been done and the result is available
	  if (permissionResult !== undefined) {
		getLocationAsync()
	  }
	}, [permissionResult])
  
	let text2 = 'Waiting..';
	if (errorMsg) {
	  console.log('errore')
	  text2 = errorMsg;
	} else if (deviceLocation && deviceLocation.coords) {
		// text2 = JSON.stringify(deviceLocation.coords);
		// setRegion(deviceLocation.coords);
		text2 = JSON.stringify(deviceLocation.coords);
	  console.log(deviceLocation)
	}


	useEffect(() => {
		(async () => {
			//   let { status } = await Location.requestPermissionsAsync();
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);



		})();
	}, []);

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
		console.log("DERNIERE POSITION " + JSON.stringify( await Location.getLastKnownPositionAsync()))
		// sendLoc()
	};

	const getLatLon = async () => {
		let location = await Location.getCurrentPositionAsync({});
		return ({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
		})
	}
	
	const sendLoc = () => {
		let latitude = location.coords.latitude;
		let longitude = location.coords.longitude;
		console.log("Use these variables to send current location(", latitude, ",", longitude, ")");
	};

	return (
		<View style={styles.container}>
			<View style={styles.camera}>
				<MapView
					mapType="hybrid"
					provider={PROVIDER_GOOGLE} // remove if not using Google Maps
					style={styles.map}
					region={region} 
					onMapReady={getLoc}
				>
					<Marker
						coordinate={ region }
						// coordinate={getLatLon}
						title="Vous ??tes ici"
						description="Emplacement actuel"
					/>
				</MapView>

			</View>
			<View style={styles.buttonContainer}>
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
				<Text>{region.latitude} / {region.longitude}</Text>
			</View>
			<View>
				<Text>{text2}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		marginBottom: 0,
		backgroundColor: "#fff",
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	camera: {
		marginTop: 10,
		marginBottom: 10,
		aspectRatio: 0.868,
		flex: 0.8,
		borderWidth: 1.5,
		borderColor: "#3675B8",
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
