import React, { useEffect, useState,  } from 'react';
import { Image, View, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Menu from '../../components/Menu';
import AddImage from '../../components/AddImage'
import { createImage, getImages, save } from '../../Service/image';
import styles from './styles';
export default function Images() {
  const [listImage, setListImage] = useState([]);
  const [open, setOpen] = useState(false);
  function deleteImage(uri) {
    let lista = listImage.filter( (image) => image.uri != uri );
    save(lista);
    setListImage(lista);
  }
  function pushImages (images) {
    Promise.all(images.map( i =>{
      return createImage(i.uri)
    })).then(resultado => { 
      save(listImage.concat(resultado));
      setListImage(listImage.concat(resultado));
      setOpen(false);
    })
  }
  useEffect(()  =>  {
    getImages().then(images => setListImage(images))
  }, []);  
  return (
    <View style={[styles.container ]}>
      <Menu listImage={listImage} addImage={ () => setOpen(!open)}  ></Menu>
      { open && <AddImage pushImages={pushImages} /> }
      {!open && <FlatList
        data={listImage}
        keyExtractor={image => String(image.uri)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: image }) => (
           <View style={{marginBottom: 10, backgroundColor: '#424242', width: 270, alignItems: 'center'}} >
             <Image source={{ uri: image.uri }} style={{ width: 200, height: 300, resizeMode: 'cover' }}/>
             <TouchableOpacity style={{ position: 'absolute', right: 1, top: 10 }} onPress={ () => { deleteImage(image.uri) } } >
              <AntDesign name="delete" size={25} color="#e82041"  />
             </TouchableOpacity>
           </View>
        )}
        />}

      </View>
    ); 
}