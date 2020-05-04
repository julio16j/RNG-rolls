import React, { useEffect, useState,  } from 'react';
import { Button, Image, View, TouchableOpacity, Text, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { useNavigation} from '@react-navigation/native';
import {AsyncStorage} from 'react-native';
import styles from './styles'
export default function Images() {
  const [listImage, setListImage] = useState([]);
  const navigation = useNavigation();
  function NavigateToRoll(){
    navigation.navigate('Roll', { listImage });
  }
  salvarImagem = async (images) => {
    try { 
      await AsyncStorage.setItem('images', JSON.stringify(images) );
    } catch (error) {
      console.log(error);
      console.log('erroaqui')
    }
  }; 
  async function getImages () {
    try {
      const value = await AsyncStorage.getItem('images');
      if (value!== undefined && value !== null) {
        return JSON.parse(value);
      }
      else{
        console.log("nenhuma imagem");
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        
        setListImage(listImage.concat(result.uri));
        console.log(listImage);
        this.salvarImagem(listImage);
      }
    } catch (E) {
      console.log(E);
    }
  };
  
  useEffect(()  =>  {
    getImages().then(images => setListImage(images));
    getPermissionAsync();
  }, [])
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={_pickImage} />
        <TouchableOpacity onPress={NavigateToRoll}> 
          <Text>Get Some Randoms</Text> 
        </TouchableOpacity>
        <FlatList
        data={listImage}
        keyExtractor={image => String(image.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={() => console.log('lol')}
        onEndReachedThreshold={0.2}
        renderItem={({ item: image }) => (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      />
      </View>
    ); 
}