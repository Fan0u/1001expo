// Librairies
import React from "react";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";

// Navigators
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";

// Composants
import HeaderButton from "../components/UI/HeaderButton/HeaderButton";
import DrawerContentScreen from "../screens/drawer/DrawerContentScreen";

// Ecrans
import HomeScreen from "../screens/Home";
import ParcoursScreen from "../screens/Parcours";
import PlacesScreen from "../screens/Places";
import InformationsScreen from "../screens/Informations";
import AddProductScreen from "../screens/AddProduct";
import AddProduct from "../screens/AddProduct";

// Variable
const headerOptions = {
	headerTintColor: Platform.OS === "ios" ? Colors.primary : "white",
	headerStyle: {
		backgroundColor: Platform.OS === "ios" ? "transparent" : Colors.primary,
		borderColor: Colors.primary,
		borderBottomWidth: 1,
	},
};

// MainStackNavigator
const MainStackNavigatorComponent = createStackNavigator();

const MainStackNavigator = () => {
	return (
		<MainStackNavigatorComponent.Navigator>
			<MainStackNavigatorComponent.Screen
				name="Home"
				component={HomeScreen}
				options={(props) => ({
					title: "Accueil",
					...headerOptions,
					headerRight: () => (
						<HeaderButtons HeaderButtonComponent={HeaderButton}>
							<Item title="Places" iconName="information-circle-outline" onPress={() => props.navigation.navigate("Informations")} />
						</HeaderButtons>
					),
					// headerShown: false,
				})}
			/>
			<MainStackNavigatorComponent.Screen
				name="Parcours"
				component={ParcoursScreen}
				options={(props) => ({
					title: "Parcours",
					...headerOptions,
					headerRight: () => (
						<HeaderButtons HeaderButtonComponent={HeaderButton}>
							<Item title="Places" iconName="information-circle-outline" onPress={() => props.navigation.navigate("Informations")} />
						</HeaderButtons>
					),
					// headerShown: false,
				})}
			/>
			<MainStackNavigatorComponent.Screen
				name="Places"
				component={PlacesScreen}
				options={{
					title: "Les salons Starbucks",
					...headerOptions,
				}}
			/>
		</MainStackNavigatorComponent.Navigator>
	);
};

// ModalStackNavigator
const ModalNavigator = createStackNavigator();

const ModalStackNavigator = () => {
	return (
		<ModalNavigator.Navigator mode="modal">
			<ModalNavigator.Screen name="Main" component={MainStackNavigator} options={{ headerShown: false }} />
			<ModalNavigator.Screen name="Informations" component={InformationsScreen} options={{ headerShown: false }} />
		</ModalNavigator.Navigator>
	);
};

// ParcoursStackNavigator
const ParcoursNavigator = createStackNavigator();

const ParcoursStackNavigator = () => {
	return (
		<ParcoursNavigator.Navigator>
			<ParcoursNavigator.Screen
				name="Parcours"
				component={ParcoursScreen}
				// options={{ headerShown: false }}
				options={({ navigation }) => ({
					title: "Parcours",
					headerLeft: () => (
						<HeaderButtons HeaderButtonComponent={HeaderButton}>
							<Item title="Drawer" iconName="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
						</HeaderButtons>
					),
					...headerOptions,
				})}
			/>
			<ParcoursNavigator.Screen name="Informations2" component={InformationsScreen} options={{ headerShown: false }} />
		</ParcoursNavigator.Navigator>
	);
};

// PlacesStackNavigator
const PlacesNavigator = createStackNavigator();

const PlacesStackNavigator = () => {
	return (
		<PlacesNavigator.Navigator>
			<PlacesNavigator.Screen
				name="StackPlaces"
				component={PlacesScreen}
				options={({ navigation }) => ({
					title: "Salons",
					headerLeft: () => (
						<HeaderButtons HeaderButtonComponent={HeaderButton}>
							<Item title="Drawer" iconName="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
						</HeaderButtons>
					),
					...headerOptions,
				})}
			/>
		</PlacesNavigator.Navigator>
	);
};

// AddProductStackNavigator
const AddProductNavigator = createStackNavigator();

const AddProductStackNavigator = () => {
	return (
		<AddProductNavigator.Navigator>
			<AddProductNavigator.Screen
				name="AddProduct"
				component={AddProductScreen}
				options={{ title: "Proposer un produit", ...headerOptions }}
			/>
		</AddProductNavigator.Navigator>
	);
};

// AppTabNavigator
const TabNavigator = createBottomTabNavigator();

const AppTabNavigator = () => {
	return (
		<TabNavigator.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "TabHome") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "TabParcours") {
						iconName = focused ? "map" : "map-outline";
					} else if (route.name === "TabPlaces") {
						iconName = focused ? "location" : "location-outline";
					} else if (route.name === "TabAddProduct") {
						iconName = focused ? "add-circle" : "add-circle-outline";
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}
			tabBarOptions={{
				// Couleur de la "bottom bar"
				activeTintColor: Colors.primary,
			}}
		>
			<TabNavigator.Screen name="TabHome" component={ModalStackNavigator} options={{ title: "Accueil" }} />
			<TabNavigator.Screen name="TabParcours" component={ParcoursStackNavigator} options={{ title: "Parcours" }} />
			<TabNavigator.Screen name="TabPlaces" component={PlacesStackNavigator} options={{ title: "Salons" }} />
			<TabNavigator.Screen name="TabAddProduct" component={AddProductStackNavigator} options={{ title: "Proposer" }} />
		</TabNavigator.Navigator>
	);
};

// AppDrawerNavigator (SideMenu)
const DrawerNavigator = createDrawerNavigator();

export const AppDrawerNavigator = () => {
	return (
		<DrawerNavigator.Navigator
			drawerContentOptions={{
				activeTintColor: Colors.primary,
			}}
			drawerContent={(props) => <DrawerContentScreen {...props} />}
			screenOptions={{ swipeEnabled: false }}
			// drawerPosition="right"
			// openByDefault={true}
			// drawerType="permanent"
		>
			<DrawerNavigator.Screen
				name="DrawerApp"
				component={AppTabNavigator}
				options={{
					title: "Accueil",
					drawerIcon: ({ focused, color, size }) => <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />,
				}}
			/>
			<DrawerNavigator.Screen
				name="Parcours"
				component={AppTabNavigator}
				options={{
					title: "Parcours",
					drawerIcon: ({ focused, color, size }) => <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />,
				}}
			/>
			
		</DrawerNavigator.Navigator>
	);
};

// Drawer
// Tab
// Stack
