import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import { pixelRatio } from '../constants/pixelRatio';
import ProfilePlantCard from '../components/ProfilePlantCard';


const ProfileRepertoire = ({user}) => {
    return (
        <View>
            <Text style={styles.repertoireHeader}>
                - {user.username}'s Garden Repertoire -
            </Text>
            <ScrollView style={{marginBottom: pixelRatio(10)}} horizontal>
                {user.plants.map((plant, i)=><ProfilePlantCard key={i} plant={plant}/>)}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    repertoireHeader: {
        fontFamily: "SansSemiBold",
        fontSize: pixelRatio(7),
        textAlign:"center",
        paddingVertical: pixelRatio(4),
        }
})

export default ProfileRepertoire;
