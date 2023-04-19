const { getFirestoreInstance } = require('./firestoreAdmin');
const { Timestamp, FieldValue } = require('firebase-admin/firestore');

const db = getFirestoreInstance();




const email = async () => {
    const users = await db.collection("users");
    let snapshot;
    snapshot = await users.get();  
    for (const doc of snapshot.docs) {
      const user = await firestore_user.getUserbyId(doc.id);
      const userData = await doc.data();
      // Call your function here for each document
      myFunction(user, userData);
    }
  };


module.exports = {email};