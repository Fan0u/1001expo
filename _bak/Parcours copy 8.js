import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity, TextInput, Dimensions } from "react-native";
import * as Location from "expo-location";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";

import * as TaskManager from "expo-task-manager";

// Redux
import { useSelector, useDispatch } from "react-redux";
import * as checkpointsActions from '../store/actions/checkpoints';

// Variables Globales
import Colors from "../constants/Colors";

// TASK VARIABLES
const LOCATION_TASK = "LOCATION_TASK";
const CHECKPOINT_TASK = "CHECKPOINT_TASK";

var exportTaskInfo = "No Info";
var taskOK = null;

const Parcours = ({ navigation }) => {

	const [location, setLocation] = useState(null);

	const [errorMsg, setErrorMsg] = useState(null);

	const [region, setRegion] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.015,
		longitudeDelta: 0.0121,
	});

	// Récupération des checkpoints
	const checkpoints = useSelector((state) => state.checkpoints.checkpoints);

	// Cercles de la map
	let checkpointsCircles = checkpoints.map((checkpoint) => (
		<Circle
			key={checkpoint.id}
			center={checkpoint}
			radius={checkpoint.radius}
			strokeWidth={2}
			strokeColor={checkpoint.preSignal ? "rgba(255,0,0,0.2)" : "rgba(255,0,0,0.5)"}
			fillColor="rgba(255,0,0,0.2)"
		/>
	));

	const [permissionResult, setPermissionResult] = useState(undefined);
	const [deviceLocation, setDeviceLocation] = useState(null);

	const [showCheckpointText, setShowCheckpointText] = useState(false);

	// Start Task
	useEffect(() => {
		(async () => {
			//   let { status } = await Location.requestPermissionsAsync();
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);

			let maTask = await Location.startGeofencingAsync("GEOFENCING_TASK", [
				...checkpoints,
				//radius: 1,
			]);
			// console.log("maTask : ", maTask);
		})();
	}, []);
	
	// const dispatch = useDispatch();
	
	// useEffect(() => {

	// 	if (taskOK !== null) {
	// 		dispatch(checkpointsActions.showCheckpointInformation(taskOK))
	// 		// console.log("taskOK : ", taskOK)
	// 	}
	// }, [taskOK])

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

	useEffect(() => {
		// If permission request is not done
		if (permissionResult === undefined) {
			getPermissionAsync();
		}

		if (permissionResult !== undefined) {
			getLocationAsync();
		}
	}, [permissionResult]);

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
					<Marker coordinate={region} title="this is a marker" description="this is a marker example" />

					{/* On trace les Cercles des zones de checkpoints */}
					{checkpointsCircles}
				</MapView>
			</View>
			<View style={styles.bottomBlock}>
				<View>
					<Text>{exportTaskInfo}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#fff",
		margin: 0,
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	camera: {
		// marginTop: 10,
		// marginBottom: 10,
		// aspectRatio: 1,
		flex: 1,

		width: "100%",

		borderWidth: 1,
		borderColor: Colors.primary,
	},
	bottomBlock: {
		height: "12%",
		width: "96%",
		position: "absolute",
		bottom: 0,
		margin: "2%",
		padding: 5,
		backgroundColor: "#fff",
		borderRadius: 10,
	},
	eventBlock: {
		height: "12%",
		width: "96%",
		position: "absolute",
		top: 0,
		margin: "2%",
		padding: 5,
		backgroundColor: "#fff",
		borderRadius: 10,
	},
});

TaskManager.defineTask("GEOFENCING_TASK", ({ data, error }) => {

	if (error) {
		console.log(error.message);
		return;
	}

	if (data.eventType === Location.LocationGeofencingEventType.Enter) {
		exportTaskInfo = "Tu es entré dans la zone " + data.region.identifier;
		// useDispatch(checkpointsActions.showCheckpointInformation(data.region.id))
		// return data.region.id
		// taskOK = data
		// console.log(checkpointsActions)
		// console.log(data.region)
		//console.log("LOCATION : ", Location)
	} else if (data.eventType === Location.LocationGeofencingEventType.Exit) {
		exportTaskInfo = "Tu sorti de la zone " + data.region.identifier;
	}
});

export default Parcours;
