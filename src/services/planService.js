import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'plans';

export const getPlans = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
};

export const addPlan = async (planData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...planData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding plan:", error);
    throw error;
  }
};

export const updatePlan = async (id, planData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...planData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating plan:", error);
    throw error;
  }
};

export const deletePlan = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting plan:", error);
    throw error;
  }
};
