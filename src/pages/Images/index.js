import React, { useEffect, useState,  } from 'react';
import { Button, Image, View, TouchableOpacity, Text, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { AntDesign } from '@expo/vector-icons';
import Menu from '../../components/Menu';
import { createImage, getImages, save } from '../../Service/image';
import styles from './styles';
export default function Images() {
  const [listImage, setListImage] = useState([]);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  function deleteImage(id) {
    let lista = listImage.filter( (image) => image.id != id );
    save(lista);
    setListImage(lista);
  }

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1
      });
      if (!result.cancelled) {
        let image = await createImage(result.uri);
        save(listImage.concat(image));
        setListImage(listImage.concat(image));
      }
    } catch (E) {
      console.log(E);
    }
  };
  useEffect(()  =>  {
    getImages().then(images => setListImage(images));
    getPermissionAsync();
  }, []);  
  return (
    <View style={[styles.container ]}>
        <Menu listImage={listImage} addImage={_pickImage}  ></Menu>
        <FlatList
        data={listImage}
        keyExtractor={image => String(image.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: image }) => (
           <View style={{marginBottom: 10, backgroundColor: '#424242', width: 270, alignItems: 'center'}} >
             <Image source={{ uri: image.uri }} style={{ width: 200, height: 300, resizeMode: 'cover' }}/>
             <TouchableOpacity style={{ position: 'absolute', right: 1, top: 10 }} onPress={ () => { deleteImage(image.id) } } >
              <AntDesign name="delete" size={25} color="#e82041"  />
             </TouchableOpacity>
           </View>
        )}
      />
      </View>
    ); 
}