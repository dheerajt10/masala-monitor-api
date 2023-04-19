const { getFirestoreInstance } = require('./firestoreAdmin');
const { Timestamp, FieldValue } = require('firebase-admin/firestore');

const db = getFirestoreInstance();

//update user information
const updateUser = async (userId, updatedData) => {
    const userRef = db.collection("users").doc(userId);
    await userRef.update(updatedData);
};

//getting user data by userid
const getUserbyId = async(userId)=> {
  userDoc = await db.collection('users').doc(userId).get();
  return userDoc.exists ? userDoc.data(): null;
};

//getting the userdata and userid from the database
const getUser = async (email) =>{
  const querySnapshot = await db.collection("users").where("email", "==", email).get();
    if (querySnapshot.empty) {
      return null;
    }
    const userData = querySnapshot.docs[0].data(); //getting the data i.e. email and hashed password
    const userId = querySnapshot.docs[0].id; //getting the userid
    return [userData, userId]; //returning both odf them in an array
};


//creating user in the database
const createUser = async (user) => {
  const docRef = await db.collection("users").doc();
  await docRef.set(user);
  return docRef.id;
};

const deleteUser = async (userId) =>{
  const docRef = await db.collection("users").doc(userId);
  const docSnapshot = await docRef.get();
  if (docSnapshot.exists) {
    await docRef.delete();
  }
}

//get emails
const getEmails = async () => {
  const users = await db.collection("users");
  let snapshot;
  snapshot = await users.get();  
  const emails = await Promise.all(
    snapshot.docs.map(async (doc) => {
        const userData=  await doc.data();
        return userData.email;        
    })
  ).then((result) => result.filter((item) => item !== undefined)); // filter out undefined items
  return emails;
};



module.exports = {updateUser, getUser, createUser, getUserbyId, deleteUser, getEmails }