import {AsyncStorage} from 'react-native';
export async function createImage(uri){
  let image = { uri: uri };
  return image;
}
export async function save(images) {
    await AsyncStorage.setItem('images', JSON.stringify(images) );
};
export async function getImages () {
  try {
    let value = await AsyncStorage.getItem('images');
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