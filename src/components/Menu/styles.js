import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginBottom: 20
  },
  active: {
    borderBottomColor: '#11aa11',
    borderBottomWidth: 4,
  },
  notSelected: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  header: {
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center'
  },
  viewTitle: {
    marginBottom: 30
  },
  textTitle: {
    fontSize: 20,
    color: 'white',
  },
  textItem: {
    color: 'white',
    marginLeft: 5
  },
  touchItem: {
    width:'50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5
  }  
})