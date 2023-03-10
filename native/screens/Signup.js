import { Text, View, SafeAreaView, StyleSheet, TextInput, Image, PixelRatio, Keyboard, TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'
import { useState } from 'react';
import { Input } from '@rneui/themed';

import { Button } from '@rneui/themed';
import { pixelRatio } from '../constants/pixelRatio';
import { url } from '../constants/localhost';


const Signup = ({navigation}) => {

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [errors, setErrors] = useState(null)
  const [availability,setAvailability] = useState(false)
  const [check, setCheck] = useState(false)
  
  function handleSignup() {
    if (signupData.password!==passwordConfirmation) {
      setErrors(["Password confirmation does not match."])
      return
    }
    
    fetch(`${url}/api/signup`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(signupData)
      })
      .then(r=>{
        if (r.ok) {            
          setErrors(null)
          setSignupData({
              username: "",
              email: "",
              password: ""
          })
          setPasswordConfirmation("")
          navigation.goBack()
        }
        else {
          r.json().then((obj)=>{
            setErrors(obj.errors)
          })
        }
      })
    
  }

  function checkAvailability () {
    setCheck(true)
    if (signupData.username.length<4){
      setAvailability(false)
      return
    }
    fetch(`${url}/api/usernames`)
    .then(r=>r.json())
    .then(list=>{
      if (list.usernames[signupData.username.toLowerCase()]) {
        setAvailability(false)
      }
      else {
        setAvailability(true)
      }
    })
  }

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <SafeAreaView backgroundColor={COLORS.primary} style={styles.mainContainer}>
        <View style={styles.titleContainer}>          
          <Text style={{                
              fontFamily: "SansBold",
              letterSpacing: pixelRatio(1),
              fontSize: pixelRatio(10)
              
          }}>
              Join PatioGarden
          </Text>
        </View>

        <Input
          inputContainerStyle={{borderBottomWidth:0}}
          inputStyle={{
            fontFamily: "SansRegular",
            fontSize: pixelRatio(5)
          }}
          containerStyle={styles.input}
          placeholder="username"
          onChangeText={text=>{setSignupData({...signupData, username: text})}}
          value={signupData.username}
          rightIcon={check?availability?{type: "ionicon", name:"checkmark-circle-outline", color: "green"}:{type: "ionicon", name:"close-outline", color: "red"}:null}
          rightIconContainerStyle={{height:"100%"}}
          onBlur={checkAvailability}
          onFocus={()=>setCheck(false)}
        />
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="email"
          onChangeText={text=>setSignupData({...signupData, email: text})}
          value={signupData.email}
          
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          // onBlur={()=>Keyboard.dismiss()}
          returnKeyType="done"
          placeholder="password"
          onChangeText={text=>setSignupData({...signupData, password: text})}
          value={signupData.password}
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          returnKeyType="done"
          placeholder="confirm password"
          onChangeText={setPasswordConfirmation}
          value={passwordConfirmation}
          onSubmitEditing={handleSignup}
        />
        {errors?errors.map((error, i)=><Text key={i} style={{fontFamily: "SansRegular",fontSize: pixelRatio(5), color:"red"}}>{error}</Text>):<Text style={{fontFamily: "SansRegular",fontSize: pixelRatio(5)}}>{''}</Text>}

        <Button title="Sign up!" style={{marginTop: pixelRatio(10)}} color={COLORS.secondary} onPress={handleSignup}/>

        <View style={{
                marginTop: pixelRatio(6),
                flexDirection:"row",        
                alignItems:"center",
        }}>   
          <Button title="Already have an account? Login!"
                  type="clear"
                  size="sm"
                  titleStyle={{
                      fontFamily: "SansRegular",
                      fontSize: pixelRatio(5)
                  }}
                  onPress={()=>navigation.goBack()}
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
    marginBottom: pixelRatio(20)
  },
  input: {
    borderRadius: 8,
    height: 40,
    width: "85%",
    borderColor: 'gray',
    borderWidth: 1,
    margin: pixelRatio(2),
    paddingHorizontal: pixelRatio(4),
    fontFamily: "SansRegular",
    fontSize: pixelRatio(5)    
  }
})

export default Signup