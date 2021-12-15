// Librairies
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, TouchableWithoutFeedback, Dimensions } from "react-native";
import Colors from "../constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";

function Informations(props) {
	return (
		<ScrollView contentContainerStyle={{ flex: 1 }}>
			<View style={styles.container}>

				<View>
					<Ionicons style={styles.construct} name="construct"  />
				</View>

				<Text style={styles.title}>Work in Progress</Text>

				<View style={styles.contact}>
					<Ionicons name="person-circle-outline" size={35} color={Colors.primary} />
					<Text style={styles.information}>Stéphane Marin</Text>
				</View>

				<View style={styles.contact}>
					<Ionicons name="call-outline" size={35} color={Colors.primary} />
					<Text style={styles.information}>06 49 95 89 29</Text>
				</View>

				<View style={styles.contact}>
					<Ionicons name="mail-outline" size={35} color={Colors.primary} />
					<TouchableWithoutFeedback onPress={() => Linking.openURL("mailto:stephane@roxsys.net")}>
						<Text style={{ ...styles.information, fontSize: 20 }}>stephane@roxsys.net</Text>
					</TouchableWithoutFeedback>
				</View>

				<TouchableOpacity onPress={() => props.navigation.goBack()}>
					<View style={styles.button}>
						<Ionicons name="close" size={23} color="white" />
					</View>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	construct:{
		fontSize:50,
		color: Colors.primary,
		marginBottom:20,
	},	
	title: {
		textTransform: "uppercase",
		fontSize: 17,
		color: Colors.primary,
		fontWeight: "bold",
	},
	button: {
		backgroundColor: Colors.primary,
		borderRadius: 25,
		width: 50,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 150,
	},
	contact: {
		flexDirection: "row",
		alignItems: "center",
		// justifyContent: "space-between",
		width: Dimensions.get("window").width * 0.7,
		marginTop: 30,
	},
	information: {
		fontWeight: "bold",
		fontSize: 25,
		marginLeft: 20,
	},
});

export default Informations;
