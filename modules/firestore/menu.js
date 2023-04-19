const { getFirestoreInstance } = require('./firestoreAdmin');
const { Timestamp, FieldValue } = require('firebase-admin/firestore');

const db = getFirestoreInstance();




const createMenu = async (date, menu) => {
    const docRef = await db.collection("menu").doc(date);
    await docRef.set(menu);
  };

const getMenu = async(date) =>{
  menuDoc = await db.collection('menu').doc(date).get();
  return menuDoc.exists ? menuDoc.data(): null;
}

module.exports = {createMenu, getMenu};
  