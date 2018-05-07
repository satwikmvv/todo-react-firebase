import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDSOBmRTVr-xg7NhyS5uAF5PfKtqcwpw0I",
    authDomain: "todo-react-satwikmvv.firebaseapp.com",
    databaseURL: "https://todo-react-satwikmvv.firebaseio.com",
    projectId: "todo-react-satwikmvv",
    storageBucket: "todo-react-satwikmvv.appspot.com",
    messagingSenderId: "505915909156"
  };

  const fire = firebase.initializeApp(config)

  export {fire}