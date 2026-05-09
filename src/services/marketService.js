import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'markets';

export const getMarkets = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching markets:", error);
    throw error;
  }
};

export const addMarket = async (marketData) => {
  try {
    // We use setDoc instead of addDoc because we want the ID to be the slug (e.g., 'us')
    const docRef = doc(db, COLLECTION_NAME, marketData.slug);
    await setDoc(docRef, {
      ...marketData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return marketData.slug;
  } catch (error) {
    console.error("Error adding market:", error);
    throw error;
  }
};

export const updateMarket = async (id, marketData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...marketData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating market:", error);
    throw error;
  }
};

export const deleteMarket = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting market:", error);
    throw error;
  }
};
