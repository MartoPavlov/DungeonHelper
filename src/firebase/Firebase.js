import React from 'react';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBerInsdhnewggJXU3rCPbfyjkVTQujczw",
  authDomain: "testingreact-dae38.firebaseapp.com",
  databaseURL: "https://testingreact-dae38.firebaseio.com",
  projectId: "testingreact-dae38",
  storageBucket: "testingreact-dae38.appspot.com",
  messagingSenderId: "605385683413",
  appId: "1:605385683413:web:b134394718a0ad1d814d5c",
  measurementId: "G-5B2K02F4J5"
}

const Firebase = firebase.initializeApp(config);

export default Firebase;