import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Icon, Overlay, Button } from '@rneui/themed';
import { useState } from 'react';
import { pixelRatio } from '../constants/pixelRatio';

import { url } from '../constants/localhost';




const ProfileBanner = ({user}) => {

    const [visible, setVisible] = useState(false)   
  
    const toggleOverlay = () => {
      setVisible(!visible)
    }
  
    const handleLogout = () => {
      fetch(`${url}/api/logout`, {
        method:"DELETE"
      })
      .then(r=>{
        if (r.ok) {
            setUser(null)         
        }
      })
    }

    return (
        <View style={{flexDirection: 'row', marginBottom: pixelRatio(7)}}>
            <Text style={{
                  fontFamily: "SansBold",
                  fontSize: pixelRatio(7),              
                  flexGrow:1
                }}>
                  @{user.username}
            </Text>
            <Icon
                name='menu-outline'
                type='ionicon'
                onPress={toggleOverlay}
            />
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}
              
              overlayStyle={{
                position:"absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "70%",
                
                borderRadius: 30
              }}
              >
                <Button title="Logout" type="clear" onPress={handleLogout}/>
            </Overlay>
          </View>
    );
}

const styles = StyleSheet.create({})

export default ProfileBanner;
