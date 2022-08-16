import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { AntDesign } from '@expo/vector-icons'; 
//import { useFonts, Lato_400Regular } from '@expo-google-fonts/lato';
//import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, ImageBackground, ScrollView, Modal, TouchableHighlight, TextInput } from 'react-native';

export default function App() {

  /*
  let [fontsLoaded] = useFonts({
    Lato_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  */

  useEffect(()=>{
    (async()=>{
      try{
        let actualWorks = await AsyncStorage.getItem('works');
        if(actualWorks == null)
        {
          setWorks([]);
        }
        else
          setWorks(JSON.parse(actualWorks));
      }catch(error){

      }
    })();
  },[]);


  const image = require('./resources/bg.jpg');


  const [works, setWorks] = useState([]);


  const [modal, setModal] = useState(false);

  const [actualWork, setActualWork] = useState('');
  


  function deleteWork(id)
  {
    alert('Tarefa com ID '+id+' foi deletada com sucesso');
    let newWork = works.filter(function(val){
      return val.id != id;
    });

    setWorks(newWork);

    (async()=>{
      try{
        await AsyncStorage.setItem('works', JSON.stringify(newWork));
      }catch(error){

      }
    })();
  }

  function addWork()
  {
      setModal(!modal);
      let id = 0;
      if(works.length > 0)
      {
        id = works[works.length-1].id + 1;
      }
      let work = {id:id, work:actualWork};
      setWorks([...works, work]);
      (async()=>{
        try{
          await AsyncStorage.setItem('works', JSON.stringify([...works, work]));
        }catch(error){
  
        }
      })();
  }



  return (
    <ScrollView style={{flex:1}}>
      <StatusBar hidden/>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput onChangeText={text => setActualWork(text)} autoFocus = {true}></TextInput>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => addWork()}>
              <Text style={styles.textStyle}>Adicionar tarefa</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>


      <ImageBackground source = {image} style = {styles.image}>
        <View style = {styles.coverView}>
          <Text style = {styles.textHeader}>Agenda</Text>
        </View>
      </ImageBackground>


      {
        works.map(function(val){
          return(
            <View style = {styles.singleWork}>
              <View style = {styles.viewSingleWork}>
                <Text>{val.work}</Text>
              </View>
              <View style = {styles.viewBtnMinus}>
                <TouchableOpacity onPress={()=>deleteWork(val.id)}>
                  <Text><AntDesign name="minuscircleo" size={24} color="black" /></Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })
      }

      <TouchableOpacity onPress = {()=> setModal(true)} style = {styles.btnAdd}>
        <Text style = {styles.btnAddText}>ADICIONAR TAREFA</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image:
  {
    width:"100%",
    height:100,
    resizeMode:"cover"
  },
  textHeader:
  {
    color:"white",
    fontSize:20,
    marginLeft:50,
    marginTop:35,
    //fontFamily: 'Lato_400Regular'
  },
  coverView:
  {
    width:"100%",
    height:100,
    backgroundColor:'rgba(0,0,0,0.3)'
  },
  singleWork:
  {
    marginTop:30,
    width:"100%",
    borderBottomWidth:1,
    borderBottomColor:'black',
    flexDirection:'row',
    paddingBottom:10
  },
  viewSingleWork:
  {
    flex:1,
    width:"100%",
    padding:10
  },
  viewBtnMinus:
  {
    flex:1,
    alignItems:'flex-end',
    padding:10
  },
  btnAdd:
  {
    width:180,
    padding:8,
    backgroundColor:'#fc8803',
    marginTop:20,
    marginHorizontal:100
  },
  btnAddText:
  {
    textAlign: 'center',
    color: 'white'
  },  
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex:5
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  }
});
