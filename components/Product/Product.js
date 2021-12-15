// Librairies
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Alert,
    Dimensions,
} from 'react-native';
import Colors from '../../constants/Colors';

function Product(props) {
    return (
        <TouchableHighlight
            onPress={() => Alert.alert('Désolé', "Cette option n'est pas disponible")}
            activeOpacity={1}
            underlayColor={Colors.primaryFaded}
        >
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{props.item.name}</Text>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        padding: Dimensions.get('window').width < 400 ? 19 : 30,
        borderBottomWidth: 1,
        borderColor: '#182E28',
    },
});

export default Product;
