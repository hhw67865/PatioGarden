import React from 'react';
import {View, StyleSheet} from 'react-native';
import { pixelRatio } from '../constants/pixelRatio';

import { Card } from '@rneui/themed';

const ProfilePlantCard = ({plant}) => {
    return (
        <Card>
            <Card.Image
                style={styles.card}
                source={{
                uri:
                    plant.image_url,
                }}
            />
            <Card.Divider />
            <Card.Title>{plant.name}</Card.Title>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        width: pixelRatio(50),
        height: pixelRatio(50)
    }
})

export default ProfilePlantCard;
