import { PixelRatio } from "react-native";

export const pixelRatio = (num) =>{
    return num*PixelRatio.get();
} 