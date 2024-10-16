import { initializeApp } from "firebase/app";
import "dotenv/config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

console.log("Start du programme V1 !");

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getFactures = async (db) => {
  const facturesCol = collection(db, "factures");
  const facturesSnapshot = await getDocs(facturesCol);
  //  Bien pour une seule donnée
  const factures = facturesSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return factures;
};

const factures = await getFactures(db);
// console.log(factures);
const ref = collection(db, "factures");

factures.forEach((factures) => {
  if (factures.totalTTC) {
    console.log(factures);
  }
});
