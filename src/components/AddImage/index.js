import React, { useEffect, useState,  } from 'react';
import { Button, Image, View, TouchableOpacity, Text, FlatList } from 'react-native';
import ImageBrowser  from '../ImageBrowser';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { AntDesign } from '@expo/vector-icons';
import { createImage, getImages, save } from '../../Service/image';
import styles from './styles';
export default function AddImage(props){
  useEffect(()  =>  {
    Permissions.askAsync(Permissions.CAMERA_ROLL).then(d => console.log(d))
  });  
  imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      props.pushImages(photos);
    }).catch((e) => console.log(e))
  }
  return (
    <View style={styles.container} >
      <ImageBrowser
          max={101} // Maximum number of pickable image. default is None
          headerButtonColor={'#e82041'} // Button color on header.
          badgeColor={'#e82041'} // Badge color when picking.
          emptyText={'Loading Images...'} // Empty Text
          callback={imageBrowserCallback} />
    </View>
  )
}