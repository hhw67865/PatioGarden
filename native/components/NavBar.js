import React from 'react';
import {View,Text, StyleSheet, SafeAreaView} from 'react-native';


const NavBar = () => {
    return (
        <SafeAreaView>
            
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>My App</Text>
                <Text style={styles.headerText}>My App</Text>
                <Text style={styles.headerText}>My App</Text>
                <Text style={styles.headerText}>My App</Text>
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
