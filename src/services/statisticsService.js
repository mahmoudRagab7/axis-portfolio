import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'statistics';
const DOC_ID = 'main';

export const getStatistics = async () => {
  try {
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      // Return default stats if none exist
      return {
        id: DOC_ID,
        totalTrades: 0,
        successRate: 0,
        marketsCount: 0,
        yearsActive: 0,
        happyClients: 0
      };
    }
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};

export const updateStatistics = async (statsData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        ...statsData,
        updatedAt: serverTimestamp()
      });
    } else {
      await setDoc(docRef, {
        ...statsData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    return true;
  } catch (error) {
    console.error("Error updating statistics:", error);
    throw error;
  }
};
