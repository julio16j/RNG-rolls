import {AsyncStorage} from 'react-native';
export async function createImage(uri){
  let counter = 1;
  try {
    counter = await AsyncStorage.getItem('imageCounter').then( c => Number (c) );
    console.log(counter);
  } catch (error) {
    console.log(error)
  }
  if(counter === null) counter = 0; 
  let image = { id: counter + 1 , uri: uri };
  return image;
}
export async function save(images) {
  console.log(images)
  try {
    let counter = await AsyncStorage.getItem('imageCounter').then( c => Number (c) );
    await AsyncStorage.setItem('images', JSON.stringify(images) );
    await AsyncStorage.setItem('imageCounter', '' + (counter + 1) );
  } catch (error) {
    console.log(error);
  }
};
export async function getImages () {
  try {
    const value = await AsyncStorage.getItem('images');
    if (value!== undefined && value !== null) {
      return JSON.parse(value);
    }
    else{
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};