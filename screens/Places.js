// Librairies
import React from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

// Composant
import Place from '../components/Place/Place';

function Places(props) {
    // Variables
    const places = useSelector(state => state.places.places);

    return (
        <View>
            <FlatList
                data={places}
                renderItem={item => <Place item={item.item} />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

export default Places;
