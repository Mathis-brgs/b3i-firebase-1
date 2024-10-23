import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import {
  doc,
  deleteDoc,
  addDoc,
  setDoc,
  onSnapshot,
  query,
} from "firebase/firestore";

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
const supprimerFacture = (factures) => {
  const rootEl = document.querySelector("#root");
  const buttonEl = document.createElement("button");
  rootEl.appendChild(buttonEl);
};

// Add Factures id and button
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
    liEl.innerHTML +=
      "<button class='modifierFacture' data-id='" +
      factures.id +
      "'>Modifier</button>";
    ulEl.appendChild(liEl);
  });
  rootEl.innerHTML = "";
  rootEl.appendChild(ulEl);
  const buttonDelete = document.querySelectorAll(".deleteFacture");

  // Delete factures on button
  buttonDelete.forEach((button) => {
    button.addEventListener("click", async (event) => {
      if (confirm("Etes vous sur de vouloir supprimer cette facture ,")) {
        await deleteDoc(
          doc(db, "factures", event.target.getAttribute("data-id"))
        );
      }
    });
  });
  const buttonModif = document.querySelectorAll(".modifierFacture");
  // buttonModif.forEach((button) => {
  //   button.addEventListener("click", async (event) => {
  //     formEl.addEventListener("submit", async (event) => {
  //       await setDoc(doc(db, "factures", "data-id", data), {
  //         number: event.target[0].value,
  //         totalTTC: event.target[1].value,
  //       });
  //     });
  //   });
  // });
};

// Add factures in firebase
const formEl = document.querySelector("#formAdd form");
formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Submit add form", event.target[0].value, event.target[1].value);
  const docRef = await addDoc(collection(db, "factures"), {
    number: event.target[0].value,
    totalTTC: event.target[1].value,
  });
  // document.getElementById("formAdd form").reset();
});

const q = query(collection(db, "factures"));
onSnapshot(q, (snapshot) => {
  let factures = [];
  snapshot.docs.forEach((doc) => {
    factures.push({ ...doc.data(), id: doc.id });
  });
  afficheFactures(factures);
});
