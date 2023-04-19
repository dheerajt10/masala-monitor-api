const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');


const filePath = path.join(__dirname, '../../utilities/forsure_firebase_key.json')
//authentication details
const serviceAccount = require(filePath);

//initializing the firestore database

initializeApp({
  credential: cert(serviceAccount)
},);

//starting a database constant
const getFirestoreInstance = () => {
  return getFirestore();
};

module.exports = {
  getFirestoreInstance
};
