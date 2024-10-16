import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";

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
const supprimerFacture = (factures) => {
  const rootEl = document.querySelector("#root");
  const buttonEl = document.createElement("button");
  rootEl.appendChild(buttonEl);
};
const afficheFactures = (factures) => {
  const rootEl = document.querySelector("#root");
  const ulEl = document.createElement("ul");
  factures.map((factures) => {
    const liEl = document.createElement("li");
    liEl.innerHTML +=
      factures.id +
      "<button class='deleteFacture' data-id='" +
      factures.id +
      "'>X</button>";
    ulEl.appendChild(liEl);
  });
  const buttonDelete = document.querySelectorAll(".deleteFacture");
  buttonDelete.forEach((button) => {
    button.addEventListener("click", (event) => {
      console.log("click");
      console.log(event.target.getAttribute("data-id"));
    });
  });
  rootEl.appendChild(ulEl);
};

const factures = await getFactures(db);
afficheFactures(factures);
