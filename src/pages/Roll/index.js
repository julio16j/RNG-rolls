import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native'
import { useNavigation, useRoute} from '@react-navigation/native';
import { Audio } from 'expo-av';
import Menu from '../../components/Menu';
import styles from './styles';
import { getImages } from '../../Service/image';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
export default function Roll()  {
  const navigation = useNavigation();
  const route = useRoute();
  const [images, setImages] = useState([]);
  const [imageSelected, setImageSelected] = useState();
  useEffect(() => {
    getImages().then( lista => setImages(lista) );
  }, [route.params.listImage])
  async function SelectImage() {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('../../../assets/lifePointsSound.mp3'));
      await soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }
    let id = setInterval(() => {
        setImageSelected(images[Math.floor(Math.random()*images.length)]);
      }, 100);
    setTimeout(() => {
      clearInterval(id);
    }, 1000);
  }
  return (
    <View style={styles.container} >
      <Menu  roll={SelectImage} />
      {imageSelected &&
         <Image style={{ flex: 1, width: 300}}
                source={{uri: imageSelected.uri}}
                resizeMode="stretch" />}
    </View>
  )
}