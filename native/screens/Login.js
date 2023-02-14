import { Text, View, SafeAreaView, StyleSheet, TextInput, Image, PixelRatio, Keyboard, TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'
import useUser from '../hooks/UserProvider'
import { useEffect, useState } from 'react'

import { Button } from '@rneui/themed';
import { pixelRatio } from '../constants/pixelRatio';

import { url } from '../constants/localhost'





const Login = ({navigation}) => {

    const { setUser, user } = useUser();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)


    function handleLogin () {
        fetch(`${url}/api/login`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({username: username.toLowerCase(), password: password})
        })
        .then(r=>{
            if (r.ok) {
                r.json().then((user)=>{
                    setUser(user)
                    setUsername("")
                    setPassword("")
                    setError(null)
                })
            }
            else {
                r.json().then((obj)=>setError(obj.error))
            }
        })
        

    }

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <SafeAreaView backgroundColor={COLORS.primary} style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Image
                    source={require('../assets/Logo.png')}
                    style={{width: pixelRatio(30), height: pixelRatio(25)}}
                />
                <Text style={{                
                    fontFamily: "SansBold",
                    letterSpacing: pixelRatio(1.5),
                    fontSize: pixelRatio(10)
                    
                }}>
                    PatioGarden
                </Text>
            </View>
            {error?<Text style={{fontFamily: "SansRegular",fontSize: pixelRatio(5), color:"red"}}>{error}</Text>:<Text style={{fontFamily: "SansRegular",fontSize: pixelRatio(5)}}>{''}</Text>}
            <TextInput
                style={{
                borderRadius: 8,
                height: 40,
                width: "85%",
                borderColor: 'gray',
                borderWidth: 1,
                margin: pixelRatio(2),
                paddingHorizontal: pixelRatio(4)
                }}
                placeholder="username"
                onChangeText={setUsername}
                value={username}
            />
            <TextInput
                secureTextEntry
                style={{
                borderRadius: 8,
                height: 40,
                width: "85%",
                borderColor: 'gray',
                borderWidth: 1,
                margin: pixelRatio(2),
                marginBottom: pixelRatio(10),
                paddingHorizontal: pixelRatio(4)
                }}
                onChangeText={setPassword}
                returnKeyType="done"
                placeholder="password"
                value={password}
                onSubmitEditing={handleLogin}
            />
            
            <Button title="Login" color={COLORS.secondary} onPress={handleLogin}/>

            <View style={{
                marginTop: pixelRatio(6),
                flexDirection:"row",        
                alignItems:"center",
            }}>
                <Text style={{
                    fontFamily: "SansRegular",
                    fontSize: pixelRatio(5)
                }}>
                    Don't have an Account?
                    
                </Text>   
                <Button title="Sign Up"
                        type="clear"
                        size="sm"
                        titleStyle={{
                            fontFamily: "SansRegular",
                            fontSize: pixelRatio(5)
                        }}
                        onPress={()=>navigation.navigate("Signup")}
                />
            </View>

        </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    mainContainer: {      
        flex:1,  
        justifyContent:'center',
        alignItems:"center"
    },
    titleContainer: {
        flexDirection:"row",        
        alignItems:"center",
        marginBottom: pixelRatio(15)
    }
})

export default Login