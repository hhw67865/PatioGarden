import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { url } from '../constants/localhost';
import Swiper from 'react-native-swiper'
import { pixelRatio } from '../constants/pixelRatio';



const PostCardImage = ({post, liked, setLiked}) => {
    
    return (
        <View>
            <View>
                <Text style={styles.postTitle}>{post.title}</Text>
                {post.pictures?
                    <Swiper loop={false} width='100%' height={pixelRatio(80)} marginTop={pixelRatio(5)}>
                        {post.pictures.map((picture,i)=><Image
                            source={{uri: picture.replace("http://localhost:3000", url)}}
                            style={{width: '100%', height: pixelRatio(65)}}
                            resizeMode="contain"
                            key={i}
                        />)}
                        
                    </Swiper>
                    
                :null}    
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    postTitle: {
        fontFamily: "SansSemiBold",
        fontSize: pixelRatio(5),
        textAlign: "center"
      }
})

export default PostCardImage;
