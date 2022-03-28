// Librairies
import React from 'react';
import { AppDrawerNavigator } from './Navigators';
import { NavigationContainer } from '@react-navigation/native';

function AppNavigator() {
    return (
        <NavigationContainer>
            <AppDrawerNavigator />
        </NavigationContainer>
    ); 
}

export default AppNavigator;
