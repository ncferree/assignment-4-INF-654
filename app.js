// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, query, where, updateDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8pD3hCOC6_EN3ShcwWT-sdnpZsssDXpE",
  authDomain: "restaurants-96466.firebaseapp.com",
  projectId: "restaurants-96466",
  storageBucket: "restaurants-96466.appspot.com",
  messagingSenderId: "28116858928",
  appId: "1:28116858928:web:32893ee09364b2a93795f5",
  measurementId: "G-MEJ0X5T0G2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
async function getRestaurants(db) {
    const restaurantsCol = collection(db, "restaurant");
    const restaurantSnapshot = await getDocs(restaurantsCol);
    const restaurantList = restaurantSnapshot.docs.map((doc) => doc.data());
    return restaurantList;
}

getRestaurants(db);

const restaurantList = document.querySelector('#restaurant-list');
const form = document.querySelector('#add-restaurant-form')

function renderRestaurant(dc) {
    let li = document.createElement("li");
    let name = document.createElement("span");
    let location = document.createElement("span");
    let cross = document.createElement('div');

    li.setAttribute('data-id', dc.id);
    name.textContent = dc.data().name;
    location.textContent = dc.data().location;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(location);
    li.appendChild(cross);

    restaurantList.appendChild(li);

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        deleteDoc(doc(db, "restaurant", id))
    })
}

const restaurants = getDocs(collection(db, "restaurant")).then((snapshot) => {
    snapshot.forEach((doc) => {
        renderRestaurant(doc)
    })
})

const q = query(collection(db, "restaurant"), where("location", "==", "denver"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data())
})

const upDoc = doc(db, "restaurant", "SazNMdlY0VSuFbcGzhHZ");

updateDoc(upDoc, {
    name: "Venice Ristorante & Wine Bar"
})

form.addEventListener(('submit'), (e) => {
    e.preventDefault();
    const docRef = addDoc(collection(db, "restaurant"), {
        location: form.location.value,
        name: form.name.value
    })
})
