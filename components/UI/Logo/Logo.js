// Librairies
import React from "react";
import { Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Colors from "../../../constants/Colors";
import Ionicons from 'react-native-vector-icons/Ionicons';


function Logo(props) {
	return (
		<>
			<Ionicons style={styles.logoIcon} name="map-outline"/>
			<TouchableWithoutFeedback onPress={() => props.navigation.navigate("Places", { fromLogo: true })}>
				<Text style={{ ...styles.title, fontSize: props.dimensions.window.width * 0.055,}}>PARCOURS</Text>
			</TouchableWithoutFeedback>
			<Text style={{ marginBottom: 30}}>Par 1001 mémoires</Text>
		</>
	);
}

const styles = StyleSheet.create({
	logoIcon: {
		fontSize: 80,
	},
	title: {
		color: Colors.primary,
		textTransform: "uppercase",
		fontFamily: "Montserrat-Black",
	},
});

export default Logo;
