import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native'
import { useNavigation, useRoute} from '@react-navigation/native';
import { Audio } from 'expo-av';
import styles from './styles';
export default function Roll()  {
  const navigation = useNavigation();
  const route = useRoute();
  const [images, setImages] = useState([]);
  const [imageSelected, setImageSelected] = useState();
  useEffect(() => {
    setImages(route.params.listImage);
  }, [route.params.listImage])
  function NavigateToImages(){
    navigation.navigate('Images');
  }

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
      <Text>Roll Page</Text>
      <TouchableOpacity onPress={NavigateToImages}> 
        <Text>Nova Imagem</Text> 
      </TouchableOpacity>

      <TouchableOpacity onPress={SelectImage}> 
        <Text>RollOne</Text> 
      </TouchableOpacity>

      {imageSelected && <Image source={{ uri: imageSelected }} style={{ width: 200, height: 200 }} />}
    </View>
  )
}