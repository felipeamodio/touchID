import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import TouchID from 'react-native-touch-id';




export default function App() {


  const [supported, setSupported] = useState(null);
  const [nome, setNome] = useState('Anonimo')


  useEffect(() => {
    TouchID.isSupported()
    .then(sucesso => {
      setSupported(true)
    }) //caso de sucesso
    .catch((error) =>{
      console.log("ERR TOUCH: " + error);
    }); //caso de erro
  }, []);


  
function handleLogin(){
  const configs ={
    title: 'Autenticação Touch ID',
    sensorErrorDescription: 'Touch ID invalido'
  };

  TouchID.authenticate("Login TouchID", configs).
  then(success =>{
    console.log('SEJA BEM-VINDO');
    setNome('Touch ID')
  })
  .catch((error) => {
    console.log('FALHA NA AUTENTICAÇÃO' + error);
  })
}


  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 30}}>{nome}</Text>
      <TouchableHighlight style={styles.btn} onPress={handleLogin}>
        <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>ENTRAR</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    borderRadius: 3,
    marginTop: 95,
    padding: 15,
    backgroundColor: '#0391B7'
  }
});
