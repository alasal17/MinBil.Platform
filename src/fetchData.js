// fetchData.js
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./firebase"; // Juster stien hvis nødvendig

// Hent et enkelt dokument
export const fetchDocument = async (collectionName, documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn("Dokumentet finnes ikke:", documentId);
      return null;
    }
  } catch (error) {
    console.error("Feil ved henting av dokument:", error);
    return null;
  }
};

// Hent alle dokumenter i en samling
export const fetchCollection = async (collectionName) => {
  try {
    const colRef = collection(db, collectionName);
    const colSnap = await getDocs(colRef);
    if (!colSnap.empty) {
      return colSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } else {
      console.warn("Samlingen er tom:", collectionName);
      return [];
    }
  } catch (error) {
    console.error("Feil ved henting av samling:", error);
    return [];
  }
};

// Real-time lytter for en samling
export const listenToCollection = (collectionName, callback) => {
  try {
    const colRef = collection(db, collectionName);
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      callback(data);
    });
    return unsubscribe;
  } catch (error) {
    console.error("Feil ved lytting til samling:", error);
    return null;
  }
};
