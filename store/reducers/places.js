import { DELETE_STORE } from '../actions/places';

const initialState = {
    places: [
        {
            country: 'Etats-Unis',
            id: 13,
            location: '3537 Pelandale Ave',
            phoneNumber: '+1 209-545-7961',
            store: require('../../assets/starbucks/13.png'),
        },
        {
            country: 'France',
            id: 7,
            location: '77 Rue Rambuteau, Paris',
            phoneNumber: '01 40 41 07 76',
            store: require('../../assets/starbucks/7.png'),
        },
        {
            country: 'France',
            id: 4,
            location: "26 Avenue de l'Opéra, Paris",
            phoneNumber: '01 40 20 08 37',
            store: require('../../assets/starbucks/4.png'),
        },
        {
            country: 'Etats-Unis',
            id: 11,
            location: '1521 N Carpenter Rd',
            phoneNumber: '+1 209-424-2102',
            store: require('../../assets/starbucks/11.png'),
        },
        {
            country: 'Japon',
            id: 18,
            location: 'Chuo City, Tokyo',
            phoneNumber: '+81 3-5324-0106',
            store: require('../../assets/starbucks/18.png'),
        },
        {
            country: 'Etats-Unis',
            id: 10,
            location: 'Cedar Village, San Jose, CA',
            phoneNumber: '+1 510-602-8273',
            store: require('../../assets/starbucks/10.png'),
        },
        {
            country: 'France',
            id: 6,
            location: 'Galeries Lafayette Haussmann, Paris',
            phoneNumber: '01 73 71 92 69',
            store: require('../../assets/starbucks/6.png'),
        },
        {
            country: 'Japon',
            id: 17,
            location: 'Shinjuku Gyoen Park, Tokyo',
            phoneNumber: '+81 3-5414-5851',
            store: require('../../assets/starbucks/17.png'),
        },
        {
            country: 'Etats-Unis',
            id: 9,
            location: 'River View, Cupertino, CA',
            phoneNumber: '+1 408-712-8597',
            store: require('../../assets/starbucks/9.png'),
        },
        {
            country: 'Japon',
            id: 19,
            location: 'Kitaaoyama, Tokyo',
            phoneNumber: '+81 3-3669-2024',
            store: require('../../assets/starbucks/19.png'),
        },
        {
            country: 'Japon',
            id: 16,
            location: 'Q FRONT Shibuya, Tokyo',
            phoneNumber: '+81 3-3770-2301',
            store: require('../../assets/starbucks/16.png'),
        },
        {
            country: 'France',
            id: 2,
            location: '11 Boulevard de Sébastopol, Paris',
            phoneNumber: '01 42 36 01 11',
            store: require('../../assets/starbucks/2.png'),
        },
        {
            country: 'Etats-Unis',
            id: 14,
            location: 'Ripon, CA',
            phoneNumber: '+1 209-599-0947',
            store: require('../../assets/starbucks/14.png'),
        },
        {
            country: 'Japon',
            id: 15,
            location: 'Meguro City, Tokyo',
            phoneNumber: '+81 3-6417-0202',
            store: require('../../assets/starbucks/15.png'),
        },
        {
            country: 'France',
            id: 5,
            location: '4 Rue de Sèze, Paris',
            phoneNumber: '01 40 06 02 29',
            store: require('../../assets/starbucks/5.png'),
        },
        {
            country: 'France',
            id: 3,
            location: '46 Rue de Rivoli, Paris',
            phoneNumber: '01 44 78 94 78',
            store: require('../../assets/starbucks/3.png'),
        },
        {
            country: 'Etats-Unis',
            id: 8,
            location: 'The Crossroads, Cupertino, CA',
            phoneNumber: '+1 408-973-8358',
            store: require('../../assets/starbucks/8.png'),
        },
        {
            country: 'France',
            id: 1,
            location: '3 Boulevard des Capucines, Paris',
            phoneNumber: '01 42 68 11 20',
            store: require('../../assets/starbucks/1.png'),
        },
    ],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_STORE:
            const updatedPlaces = state.places.filter(
                place => place.id !== action.storeId,
            );

            return {
                ...state,
                places: updatedPlaces,
            };
        default:
            return state;
    }
};
