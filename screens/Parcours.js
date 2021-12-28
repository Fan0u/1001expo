import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity, TextInput, Dimensions } from "react-native";
import * as Location from "expo-location";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Video, AVPlaybackStatus } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

import * as TaskManager from "expo-task-manager";

// Redux
import { useSelector, useDispatch } from "react-redux";
import * as checkpointsActions from "../store/actions/checkpoints";

// Variables Globales
import Colors from "../constants/Colors";

// TASK VARIABLES
const LOCATION_TASK = "LOCATION_TASK";
const CHECKPOINT_TASK = "CHECKPOINT_TASK";

var exportTaskInfo = "No Info";
var taskOK = null;

const Parcours = ({ navigation }) => {
	// Video
	const video = React.useRef(null);
	const [status, setStatus] = useState({});

	const [location, setLocation] = useState(null);

	const [errorMsg, setErrorMsg] = useState(null);

	const [region, setRegion] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.015,
		longitudeDelta: 0.0121,
	});

	// Récupération des checkpoints (CheckpointsReducers)
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
		})();
	}, []);

	const dispatch = useDispatch();

	// Effets lorsque nous entrons ou sortons d'une zone.
	useEffect(() => {
		if (taskOK !== null) {
			dispatch(checkpointsActions.showCheckpointInformation(taskOK.region));
		}
	}, [taskOK]);

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
				timeInterval: 10,
				distanceInterval: 0.1,
			},

			(newLocation) => {
				setDeviceLocation(newLocation);
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
		text2 = JSON.stringify(deviceLocation.coords);
	}

	const getLoc = async () => {
		let location = await Location.getCurrentPositionAsync({});
		setLocation(location);
		let latitude = location.coords.latitude;
		let longitude = location.coords.longitude;

		setRegion({
			latitude: latitude,
			longitude: longitude,
			latitudeDelta: 0.015,
			longitudeDelta: 0.0121,
		});

		console.log("DERNIERE POSITION " + JSON.stringify(await Location.getLastKnownPositionAsync()));
	};

	// const getLatLon = async () => {
	// 	let location = await Location.getCurrentPositionAsync({});
	// 	return {
	// 		latitude: location.coords.latitude,
	// 		longitude: location.coords.longitude,
	// 	};
	// };

	// const sendLoc = () => {
	// 	let latitude = location.coords.latitude;
	// 	let longitude = location.coords.longitude;
	// 	console.log("Use these variables to send current location(", latitude, ",", longitude, ")");
	// };

	return (
		<View style={styles.container}>

			<View style={styles.blockTitle}>
				<Text style={styles.title}>{"Alès > Rochebelle"}</Text>
			</View>

			<View style={styles.blockEnDirection}>
				<Text style={styles.enDirectionText}>{"En direction de"}</Text>
				<Text style={styles.enDirectionDestination}>{"Bourse du Travail"}</Text>
			</View>

			<View style={styles.mapContainer}>
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

			<View style={styles.blockIndice}>
				<Ionicons name="play" style={styles.playIcon} />
				<Text style={styles.textIndice}>{"« Ouvrez bien les yeux, je ne suis pas très loin. Marchez un peu, je suis en haut du chemin »"}</Text>
			</View>

			<View style={styles.blockCompass}>
				<Ionicons name="navigate" style={styles.compassIcon} />
				<Text style={styles.compassText}>{"Distance de l’objectif : 32 mètres"}</Text>
			</View>

			<View style={styles.bottomBlock}>
				<View>
					<Text>{exportTaskInfo}</Text>
				</View>
			</View>
		</View>
	);
};

/*
	<View style={styles.container}>
		<Video
			ref={video}
			style={styles.video}
			source={{
				uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
			}}
			useNativeControls
			resizeMode="contain"
			isLooping
			onPlaybackStatusUpdate={(status) => setStatus(() => status)}
		/>
		<View style={styles.buttons}>
			<Button
				title={status.isPlaying ? "Pause" : "Play"}
				onPress={() => (status.isPlaying ? video.current.pauseAsync() : video.current.playAsync())}
			/>
		</View>
	</View>
*/

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#fff",
		padding: "1%",
	},

	blockTitle: {
		width: "100%",
	},
	title: {
		marginLeft: "2%",
		fontSize: 14,
	},

	blockEnDirection: {
		marginVertical: "5%",
		width: "100%",
	},
	enDirectionText: {
		textAlign: "center",
		fontSize: 14,
	},
	enDirectionDestination: {
		textAlign: "center",
		fontSize: 22,
		fontWeight: "bold",
	},

	blockIndice: {
		width: "100%",
		alignItems: 'center',
		marginTop: "5%",
	},
	playIcon: {
		alignItems: "center",
		zIndex: 2,
		fontSize: 36,
		paddingLeft:14,
		paddingTop:10,
		width: 60,
		height: 60,
		borderRadius: 30,
		color: "white",
		backgroundColor: "#888888",
	},
	textIndice: {
		marginHorizontal:"5%",
		marginTop:-30,
		padding: "10%",
		textAlign: "center",
		backgroundColor: "#eeeeee",
		borderRadius: 10,
		fontSize: 18,
	},

	blockCompass: {
		alignItems: "center",
		margin: "5%",
	},
	compassIcon: {
		fontSize: 48,
		color: "#888888",
	},
	compassText: {
		fontSize: 12,
	},

	map: {
		...StyleSheet.absoluteFillObject,
	},
	mapContainer: {
		// flex: 1,
		width: "100%",
		height: "35%",

		// borderWidth: 1,
		// borderColor: Colors.primary,
	},
	bottomBlock: {
		height: "50%",
		width: "96%",
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
	video: {
		alignSelf: "center",
		width: 320,
		height: 200,
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
});

TaskManager.defineTask("GEOFENCING_TASK", ({ data, error }) => {
	if (error) {
		console.log(error.message);
		return;
	}

	if (data.eventType === Location.LocationGeofencingEventType.Enter) {
		exportTaskInfo = "Tu es entré dans " + data.region.identifier;
		// console.log("Tu es entré dans " + data.region.identifier);
		taskOK = data;
	} else if (data.eventType === Location.LocationGeofencingEventType.Exit) {
		exportTaskInfo = "Tu es sorti de " + data.region.identifier;
		taskOK = data;
		// console.log("Tu es sorti de " + data.region.identifier);
	}
});

export default Parcours;
