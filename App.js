import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import firebase from 'firebase';
import reducers from './src/reducers';


class App extends Component {
  componentWillMount(){
    const config = {
    apiKey: "AIzaSyCplaJg9FaxhW8nXcGZkGACvaELMAQXJ6Q",
    authDomain: "rn-manager-ff996.firebaseapp.com",
    databaseURL: "https://rn-manager-ff996.firebaseio.com",
    projectId: "rn-manager-ff996",
    storageBucket: "",
    messagingSenderId: "408271946511"
    }


    firebase.initializeApp(config);
  
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View>
          <Text>Hello!</Text>
        </View>
        
      </Provider>
     	
    )
  }


}

export default App;
