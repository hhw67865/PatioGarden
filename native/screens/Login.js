import { Text, View, SafeAreaView, StyleSheet, TextInput, Image, PixelRatio, Button } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'
import useUser from '../hooks/UserProvider'

const pixelRatio = (num) =>{
    return num*PixelRatio.get();
} 

const Login = () => {

    const { setUser } = useUser();
    


  return (
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
            placeholder="password"
        />
        
        <Button title="Login" color={COLORS.secondary}/>

        <Text style={{
            fontFamily: "SansRegular",
            borderWidth: 1,
            borderColor: 'black',
        
        }}>
            Don't have an Account?
            <Button title="Sign Up"
            />
        </Text>   
    </SafeAreaView>
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
        marginBottom: pixelRatio(20)
    }
})

export default Login