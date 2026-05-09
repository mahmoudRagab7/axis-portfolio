import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'results';

// Get all results, optionally filtered by market
export const getResults = async (marketId = null) => {
  try {
    const resultsRef = collection(db, COLLECTION_NAME);
    let q;
    
    // To avoid requiring a composite index in Firestore, we use a simple query
    // and sort the results client-side.
    if (marketId && marketId !== 'all') {
      q = query(resultsRef, where("market", "==", marketId));
    } else {
      q = query(resultsRef);
    }

    const snapshot = await getDocs(q);
    const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Sort descending by createdAt
    return results.sort((a, b) => {
      const timeA = a.createdAt?.toMillis() || 0;
      const timeB = b.createdAt?.toMillis() || 0;
      return timeB - timeA;
    });
  } catch (error) {
    console.error("Error fetching results:", error);
    throw error;
  }
};

// Add a new result
export const addResult = async (resultData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...resultData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding result:", error);
    throw error;
  }
};

// Update a result
export const updateResult = async (id, resultData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...resultData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating result:", error);
    throw error;
  }
};

// Delete a result
export const deleteResult = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting result:", error);
    throw error;
  }
};
