import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD95YjgE14Nl6hopcZlcwSPL1sSNIYWuD0",
  authDomain: "gunluk-app-47d4c.firebaseapp.com",
  projectId: "gunluk-app-47d4c",
  storageBucket: "gunluk-app-47d4c.firebasestorage.app",
  messagingSenderId: "247756125507",
  appId: "1:247756125507:web:2f017467b9b868ca706bf6",
  measurementId: "G-5Q46NMPSYX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

document.getElementById("loginBtn").addEventListener("click", async () => {
  const result = await import { getRedirectResult, signInWithRedirect } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Giriş butonu event listener
document.getElementById("loginBtn").addEventListener("click", () => {
  signInWithRedirect(auth, provider);
});

// Sayfa yüklenirken redirect sonucu kontrol et
getRedirectResult(auth)
  .then((result) => {
    if (result) {
      alert(`Hoş geldin ${result.user.displayName}`);
    }
  })
  .catch((error) => {
    console.error(error);
  });;
  alert(`Hoş geldin ${result.user.displayName}`);
});

document.getElementById("saveBtn").addEventListener("click", async () => {
  const content = document.getElementById("content").value;
  await addDoc(collection(db, "entries"), {
    text: content,
    timestamp: serverTimestamp()
  });
  document.getElementById("content").value = "";
});

onSnapshot(collection(db, "entries"), (snapshot) => {
  const container = document.getElementById("entries");
  container.innerHTML = "";
  snapshot.forEach((doc) => {
    container.innerHTML += `<p>${doc.data().text}</p><hr>`;
  });
});
