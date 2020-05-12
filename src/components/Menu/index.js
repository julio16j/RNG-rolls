import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute} from '@react-navigation/native';
import styles from './styles';
export default function Menu(props) {
  const [imageItemStyle, setImageItemStyle] = useState(styles.active);
  const [rollItemStyle, setRollItemStyle] = useState(styles.notSelected);
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(() => {
    setarAtivo(route.name);
  })
  function setarAtivo(nova){
    if(nova === 'Images'){
      setImageItemStyle(styles.active);
      setRollItemStyle(styles.notSelected);
    }
    else {
      setImageItemStyle(styles.notSelected);
      setRollItemStyle(styles.active);
    }
  }
  function mudarPagina(nova){
    setarAtivo(nova);
    navigation.navigate(nova, { listImage : props.listImage });
    if(nova == route.name && route.name == 'Images') {
      props.addImage();
    }
    if(nova == route.name && route.name == 'Roll') {
      props.roll();
    }
  }
  return (
    <View style={styles.container} >
      <View style={styles.viewTitle} >
        <Text style={styles.textTitle} >RNG Rolls</Text>
      </View>
      <View style={styles.header} >
        <TouchableOpacity onPress={() => mudarPagina('Images')} style={[imageItemStyle, styles.touchItem]} >
          <Entypo name="attachment" size={28} color="#e82041"  />
          <Text style={styles.textItem} >Images</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => mudarPagina('Roll')} style={[rollItemStyle, styles.touchItem]} >
          <FontAwesome5 name="dice" size={28} color="#e82041"  />
          <Text style={styles.textItem} >Roll It </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}