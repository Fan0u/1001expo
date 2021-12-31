// Librairies
import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	FlatList,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Linking,
	Dimensions,
	SafeAreaView,
	Platform,
} from "react-native";
import { useSelector } from "react-redux";

// Composants
import Product from "../components/Product/Product";
import Logo from "../components/UI/Logo/Logo";
import Colors from "../constants/Colors";

// Variables
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

function Home(props) {
	// States
	const [isDisplayed, setIsDisplayed] = useState(false);
	const [dimensions, setDimensions] = useState({ window, screen });

	// Variable
	const products = useSelector((state) => state.products.products);

	// console.log(products);

	// Cycle de vie
	useEffect(() => {
		Dimensions.addEventListener("change", onChange);

		return () => {
			Dimensions.removeEventListener("change", onChange);
		};
	});

	// Fonction
	const onChange = ({ window, screen }) => {
		setDimensions({ window, screen });
	};

	let logoStyles = {
		width: dimensions.window.width * 0.23,
		maxWidth: 100,
		height: dimensions.window.width * 0.23,
		maxHeight: 100,
		marginBottom: 15,
	};

	return (
		<View style={{ backgroundColor: "white", flex: 1 }}>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.container}>
					{/* <Image
                        source={{
                            uri: 'https://believemy.com/uploads/6435acae7f1901acb1e4355395964ea5_ea186b839326aea1816bd1f3f2ab84b3.png',
                        }}
                        style={logoStyles}
                    /> */}
					<Logo dimensions={dimensions} navigation={props.navigation} />

					{/* {isDisplayed ? <Text>Que souhaitez-vous boire ?</Text> : <Text>Commencez par ouvrir le menu</Text>}
					<TouchableOpacity onPress={() => Linking.openURL("https://starbucks.fr")}>
						<Text>En savoir plus</Text>
					</TouchableOpacity> */}

					{/* {isDisplayed && (
						<FlatList
							data={products}
							renderItem={({ item }) => <Product item={item} />}
							keyExtractor={(item) => Math.random().toString()}
							style={{ width: "100%" }}
						/>
					)} */}
					<View style={{ marginTop: 40 }}>
						<TouchableWithoutFeedback onPress={() => setIsDisplayed((prevState) => !prevState)}>
							<View
								style={{
									width: "40%",
									backgroundColor: Colors.primary,
									paddingHorizontal: 15,
									paddingVertical: 10,
									borderRadius: 3,
								}}
							>
								<Text style={{ color: "white" }}>{isDisplayed ? "Fermer le menu" : "Ouvrir le menu"}</Text>
							</View>
						</TouchableWithoutFeedback>

						<View style={{ alignItems: "center", marginTop: 30 }}>
							<Text>
								Version <Text style={{ fontWeight: "bold" }}>{Platform.OS === "ios" ? "iPhone" : "Android"}</Text>
							</Text>
						</View>
					</View>
				</View>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 17,
		paddingBottom: 10,
	},
});

export default Home;
