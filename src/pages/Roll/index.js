import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native'
import { useNavigation, useRoute} from '@react-navigation/native';
import { Audio } from 'expo-av';
import Menu from '../../components/Menu';
import styles from './styles';
import { getImages } from '../../Service/image'
export default function Roll()  {
  const navigation = useNavigation();
  const route = useRoute();
  const [images, setImages] = useState([]);
  const [imageSelected, setImageSelected] = useState();
  useEffect(() => {
    getImages().then( lista => setImages(lista) );
  }, [route.params.listImage])
  async function SelectImage() {
    console.log(images)
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
      {imageSelected && <Image source={{ uri: imageSelected.uri }} style={{ width: 300, height: 400, resizeMode: 'cover', backgroundColor: 'black' }} />}
    </View>
  )
}