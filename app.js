// Firebase SDK'larını import et
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase projenin ayarları
const firebaseConfig = {
  apiKey: "AIzaSyD95YjgE14Nl6hopcZlcwSPL1sSNIYWuD0",
  authDomain: "gunluk-app-47d4c.firebaseapp.com",
  projectId: "gunluk-app-47d4c",
  storageBucket: "gunluk-app-47d4c.appspot.com",
  messagingSenderId: "247756125507",
  appId: "1:247756125507:web:2f017467b9b868ca706bf6",
  measurementId: "G-5Q46NMPSYX"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Günlük kaydetme işlemi
document.getElementById("saveBtn").addEventListener("click", async () => {
  const content = document.getElementById("content").value;
  if (content.trim() === "") {
    alert("Lütfen boş bir günlük yazmayın.");
    return;
  }

  try {
    await addDoc(collection(db, "entries"), {
      content: content,
      date: new Date().toISOString()
    });
    alert("Günlük kaydedildi!");
    document.getElementById("content").value = "";
    loadEntries();
  } catch (e) {
    console.error("Hata oluştu: ", e);
  }
});

// Kayıtlı günlükleri yükle
async function loadEntries() {
  const entriesDiv = document.getElementById("entries");
  entriesDiv.innerHTML = "<h3>Geçmiş Kayıtlar</h3>";
  const querySnapshot = await getDocs(collection(db, "entries"));
  querySnapshot.forEach((doc) => {
    const entry = doc.data();
    const p = document.createElement("p");
    p.textContent = `${new Date(entry.date).toLocaleString()}: ${entry.content}`;
    entriesDiv.appendChild(p);
  });
}

// Sayfa açıldığında günlükleri yükle
loadEntries();
