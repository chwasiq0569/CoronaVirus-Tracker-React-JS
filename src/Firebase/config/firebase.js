import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDatj0uVvhm6pzQpZJ2timsopt06EmiR9o",
    authDomain: "coronavirustracker-2bc65.firebaseapp.com",
    databaseURL: "https://coronavirustracker-2bc65.firebaseio.com",
    projectId: "coronavirustracker-2bc65",
    storageBucket: "coronavirustracker-2bc65.appspot.com",
    messagingSenderId: "526499025817",
    appId: "1:526499025817:web:2a5f6711775f7a34aab908",
    measurementId: "G-12C85MYJK6"
};
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
