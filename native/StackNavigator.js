import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import useUser from "./hooks/UserProvider";

import { useEffect } from 'react';
import { url } from './constants/localhost';

import Home from "./screens/Home";
import Account from './screens/Account';
import Community from './screens/Community';
import Plants from './screens/Plants';
import NavBar from "./components/NavBar";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Comments from './screens/Comments';
import EditProfile from './screens/EditProfile';

const Stack = createStackNavigator()

const StackNavigator = () => {

    const { user, setUser, update } = useUser();

    useEffect(()=>{
        fetch(`${url}/api/authorized`)
        .then(r=>{
            if (r.ok) {
                r.json().then(setUser)
            }
            else {
                r.json().then(console.log)
            }
        })
    },[update])

    return user ? (
        <>
            <Stack.Navigator screenOptions={{headerShown: false}}
            initialRouteName="Home">
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Plants" component={Plants}/>
                <Stack.Screen name="Account" component={Account}/>
                <Stack.Screen name="Community" component={Community}/>
                <Stack.Screen name="Comments" component={Comments} options={{headerShown: true}} /> 
                <Stack.Screen name="Edit Profile" component={EditProfile} options={{headerShown: true}} />
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