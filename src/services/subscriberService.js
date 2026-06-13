import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'subscribers';

export const getSubscribers = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a, b) => {
      const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
      const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
      return bTime - aTime;
    });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    throw error;
  }
};

export const addSubscriber = async (subscriberData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...subscriberData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding subscriber:", error);
    throw error;
  }
};

export const updateSubscriber = async (id, subscriberData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...subscriberData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating subscriber:", error);
    throw error;
  }
};

export const deleteSubscriber = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    throw error;
  }
};

export const validateToken = async (token) => {
  if (!token) return { isValid: false, reason: "empty_token" };
  try {
    const q = query(collection(db, COLLECTION_NAME), where("token", "==", token), where("isActive", "==", true));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return { isValid: false, reason: "invalid_or_inactive" };
    }
    
    const subData = snapshot.docs[0].data();
    
    // Check expiry
    if (subData.expiresAt) {
      // Handle both Firestore Timestamp and string date formats
      let expiryTime;
      if (typeof subData.expiresAt === 'string') {
        expiryTime = new Date(subData.expiresAt).getTime();
      } else if (subData.expiresAt.toMillis) {
        expiryTime = subData.expiresAt.toMillis();
      } else {
         expiryTime = new Date(subData.expiresAt).getTime();
      }
      
      if (Date.now() > expiryTime) {
        return { isValid: false, reason: "expired" };
      }
    }
    
    return { isValid: true, data: { planId: subData.planId, planNameEn: subData.planNameEn } };
  } catch (error) {
    console.error("Error validating token:", error);
    return { isValid: false, reason: "error" };
  }
};
