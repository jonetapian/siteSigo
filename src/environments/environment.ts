// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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
    send_code:"https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?",
    transaction:"https://ws.sandbox.pagseguro.uol.com.br/v2/transactions/"
  },
  database:{
    tag:"tags/",
    usuario:"usuarios/",
    produto:"produtos/"
  }
  ,
  cors: "https://cors-anywhere.herokuapp.com/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
