import React, { useEffect, useState,  } from 'react';
import { Image, View, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Menu from '../../components/Menu';
import AddImage from '../../components/AddImage'
import { createImage, getImages, save, generateId } from '../../Service/image';
import styles from './styles';
export default function Images() {
  const [listImage, setListImage] = useState([]);
  const [open, setOpen] = useState(false);
  function deleteImage(elem) {
    let lista = listImage.filter(image => image.id !== elem.id);
    setListImage(lista);
    save(lista);
  }
  function pushImages (images) {
    Promise.all(images.map( i =>{
      return createImage(i.uri)
    })).then(resultado => {
      save(listImage.concat(resultado));
      setListImage(generateId(listImage.concat(resultado)));
      setOpen(false);
    })
  }
  useEffect(()  =>  {
    getImages().then(images =>{
      setListImage(generateId(images))
    })
  }, []);  
  return (
    <View style={[styles.container ]}>
      <Menu listImage={listImage} addImage={ () => setOpen(!open)}  ></Menu>
      { open && <AddImage pushImages={pushImages} /> }
      {!open && <FlatList
        data={listImage}
        keyExtractor={image => String(image.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: image }) => (
           <View style={{marginBottom: 10, backgroundColor: '#000', width: 270, alignItems: 'center'}} >
             <Image source={{ uri: image.uri }} style={{ width: 200, height: 300, resizeMode: 'stretch'}}/>
             <TouchableOpacity style={{ position: 'absolute', right: 1, top: 10 }} onPress={ () => { deleteImage(image) } } >
              <AntDesign name="delete" size={25} color="#e82041"  />
             </TouchableOpacity>
           </View>
        )}
        />}

      </View>
    ); 
}