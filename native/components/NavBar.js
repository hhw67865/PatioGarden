import React, {useState} from 'react';
import {View,Text, StyleSheet, SafeAreaView} from 'react-native';
import { Icon } from '@rneui/themed';
import { COLORS } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { pixelRatio } from '../constants/pixelRatio';



const NavBar = () => {

    let navigation = useNavigation()
    const [screen, setScreen] = useState('Home')

    return (
        <SafeAreaView style={{
            borderTopWidth: 0.5,
            borderColor: 'black',
            }}>
            
            <View style={styles.headerContainer}>
                <Icon
                    name='home-outline'
                    type='ionicon'
                    color={screen==="Home"?COLORS.secondary:COLORS.tertiary}
                    onPress={()=>{
                        navigation.navigate('Home')
                        setScreen('Home')
                    }}
                    style={styles.navIcon}
                />
                <Icon
                    name='people-outline'
                    type='ionicon'
                    color={screen==="Community"?COLORS.secondary:COLORS.tertiary}
                    onPress={()=>{
                        navigation.navigate('Community')
                        setScreen('Community')
                    }}
                    style={styles.navIcon}
                />
                <Icon
                    name='leaf-outline'
                    type='ionicon'
                    color={screen==="Plants"?COLORS.secondary:COLORS.tertiary}
                    onPress={()=>{
                        navigation.navigate('Plants')
                        setScreen('Plants')
                    }}
                    style={styles.navIcon}
                />
                <Icon
                    name='person-outline'
                    type='ionicon'
                    color={screen==="Account"?COLORS.secondary:COLORS.tertiary}
                    onPress={()=>{
                        navigation.navigate('Account')
                        setScreen('Account')
                    }}
                    style={styles.navIcon}
                />
                
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:"center",        
    },
    navIcon: {
        padding: pixelRatio(6)
    }
})

export default NavBar;
