import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import useUser from "./hooks/UserProvider";

import Home from "./screens/Home";
import Details from "./screens/Details";
import NavBar from "./components/NavBar";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

const Stack = createStackNavigator()

const StackNavigator = () => {

    const { user } = useUser();

    return user ? (
        <>
            <Stack.Navigator screenOptions={{headerShown: false}}
            initialRouteName="Home">
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Details" component={Details}/>
            </Stack.Navigator>
            <NavBar/>
        </>
        ) : (
            <Stack.Navigator screenOptions={{headerShown: false}}
            initialRouteName="Login">
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Signup" component={Signup}/>
            </Stack.Navigator>
        )
}

export default StackNavigator