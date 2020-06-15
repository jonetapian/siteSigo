export const environment = {
  production: true,

  firebase: {
    apiKey: "AIzaSyCd_dUFIZKXp1tRyFZCFcTMB0PLz5QTErs",
    authDomain: "sigo-ffd8c.firebaseapp.com",
    databaseURL: "https://sigo-ffd8c.firebaseio.com",
    projectId: "sigo-ffd8c",
    storageBucket: "sigo-ffd8c.appspot.com",
    messagingSenderId: "747709319714",
    appId: "1:747709319714:web:283ed535c492206bd2d87b",
    measurementId: "G-JYWFWZL6SW"
  },
  sandbox:{
    auth: "https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?",
    send_code:"https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?"
  },
  database:{
    tag:"tags/",
    usuario:"usuarios/",
    produto:"produtos/"
  }
  ,
  cors: "https://cors-anywhere.herokuapp.com/"
};
