// Librairies
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";

// Variables
import Colors from "../../constants/Colors";

function DrawerContentScreen(props) {
	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView>
				<View style={{ alignItems: "center" }}>
					{/* <Image
						source={{ uri: "https://believemy.com/uploads/6435acae7f1901acb1e4355395964ea5_ea186b839326aea1816bd1f3f2ab84b3.png" }}
						style={styles.logo}
					/> */}
					<Ionicons name="map-outline" size={80} color={Colors.primary} />
				</View>

				<DrawerItemList {...props} />
			</DrawerContentScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	logo: {
		width: 84,
		height: 84,
		marginBottom: 15,
	},
});

export default DrawerContentScreen;
