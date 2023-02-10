import React from 'react';
import {View,Text, StyleSheet, SafeAreaView} from 'react-native';
import { Icon } from '@rneui/themed';
import { COLORS } from '../constants/theme';


const NavBar = () => {
    return (
        <SafeAreaView style={{
            borderTopWidth: 0.5,
            borderColor: 'black',
            }}>
            
            <View style={styles.headerContainer}>
                <Icon
                    name='home-outline'
                    type='ionicon'
                    color={COLORS.secondary}
                />
                <Icon
                    name='people-outline'
                    type='ionicon'
                    color={COLORS.tertiary}
                />
                <Icon
                    name='leaf-outline'
                    type='ionicon'
                    color={COLORS.tertiary}
                />
                <Icon
                    name='person-outline'
                    type='ionicon'
                    color={COLORS.tertiary}
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
        padding:10,
        paddingVertical:20
        
    }
})

export default NavBar;
