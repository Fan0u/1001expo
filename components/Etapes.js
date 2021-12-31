import React, { useState } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity, TextInput, Dimensions, useWindowDimensions } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

// Redux
import { useSelector, useDispatch } from "react-redux";
import * as checkpointsActions from "../store/actions/checkpoints";
import checkpoints from "../store/reducers/checkpoints";
import * as stepActions from "../store/actions/steps";
import step from "../store/reducers/steps";

import Colors from "../constants/Colors";

function Etapes() {
	const dispatch = useDispatch();
	// etapeNumber = 1;
	// const etape = etapeNumber.etapeNumber;
	// const etape2 = useSelector((state) => state.step.step);
	const etape = useSelector((state) => state.steps.step);
	//console.log("etape", etape)
	// Récupération du titre du parcours
	const parcoursTitle = useSelector((state) => state.checkpoints.parcoursTitle);
	// Récupération des checkpoints (CheckpointsReducers)
	const checkpoint = useSelector((state) => state.checkpoints.checkpoints[etape]);

	// Video
	const video = React.useRef(null);
	const [status, setStatus] = useState({});

	function contentFilter(contents) {
		const contenu = contents.map((content) => {
			switch (content.type) {
				case "text":
					return (
						<View key={content.title}>
							<Text style={styles.title}>{content.title}</Text>
							<Text style={styles.text}>{content.text}</Text>
						</View>
					);

				case "video":
					return (
						<View key={content.title}>
							<Text style={styles.title}>{content.title}</Text>
							<Video
								ref={video}
								style={styles.video}
								source={{
									uri: content.file,
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
					);
				default:
					break;
			}
		});

		return (
			<>
				<View>{contenu}</View>
			</>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.blockTitle}>
				<Text style={styles.title}>{parcoursTitle}</Text>
			</View>

			<View style={styles.blockEnDirection}>
				<Text style={styles.enDirectionText}>{"Vous êtes à"}</Text>
				<Text style={styles.enDirectionDestination}>{checkpoint.title}</Text>
			</View>

			{contentFilter(checkpoint.contents)}

			<View>
				<Button
					title="Continuons notre route"
					onPress={() => {
						dispatch(stepActions.addStep(etape));
						// console.log("click etape", etape)
					}}
				/>
			</View>
		</View>
	);
}

export default Etapes;

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
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 15,
	},
	text: {
		marginLeft: "2%",
		fontSize: 16,
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

	map: {
		...StyleSheet.absoluteFillObject,
	},
	mapContainer: {
		width: "100%",
		height: "35%",
	},

	blockIndice: {
		width: "100%",
		alignItems: "center",
		marginTop: "5%",
	},
	playIcon: {
		alignItems: "center",
		zIndex: 2,
		fontSize: 36,
		paddingLeft: 14,
		paddingTop: 10,
		width: 60,
		height: 60,
		borderRadius: 30,
		color: "white",
		backgroundColor: "#888888",
	},
	textIndice: {
		marginHorizontal: "5%",
		marginTop: -30,
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

	bottomBlock: {
		height: "50%",
		width: "96%",
		margin: "2%",
		padding: 5,
		backgroundColor: "#fff",
		borderRadius: 10,
	},

	eventBlock: {
		flex: 1,
		height: "100%",
		width: "100%",
		position: "absolute",
		top: 0,
		padding: 5,
		backgroundColor: "#fff",
		borderRadius: 10,
		zIndex: 10,
	},
	checkIcon: {
		fontSize: 100,
		color: "#888888",
		textAlign: "center",
	},
	distanceInfo: {
		textAlign: "center",
		fontSize: 56,
		fontWeight: "bold",
	},
	buttonsJecontinue: {
		marginTop: "20%",
		backgroundColor: Colors.primary,
		marginHorizontal: "10%",
		paddingVertical: 20,
		borderRadius: 3,
		color: "white",
		textAlign: "center",
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
