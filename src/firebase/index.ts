'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { 
  getFirestore, 
  Firestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  where, 
  onSnapshot, 
  deleteDoc, 
  updateDoc, 
  limit, 
  orderBy,
  Query,
  DocumentData,
  QuerySnapshot,
  DocumentSnapshot
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firebaseConfig } from './config';

// ✅ Initialize Firebase (SINGLETON)
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const firestore: Firestore = getFirestore(app);

// ✅ ✅ ADD THIS FUNCTION (FIX)
export function initializeFirebase(): {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
} {
  return { app, auth, firestore };
}

// Export instances for direct use
export { app, auth, firestore as db };

// Custom hook to get Firestore instance
export const useFirestore = (): Firestore => firestore;

// Custom hook for collection with real-time updates
export const useCollection = (queryConstraint: Query<DocumentData> | null) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!queryConstraint) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      queryConstraint, 
      (snapshot: QuerySnapshot<DocumentData>) => {
        const items: any[] = [];
        snapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setData(items);
        setLoading(false);
      },
      (err: Error) => {
        console.error("Firestore error:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [queryConstraint]);

  return { data, loading, error };
};

// Helper function to save/update data
export const saveToFirestore = async (
  collectionName: string, 
  id: string, 
  data: Record<string, any>
): Promise<{ success: boolean; id?: string; error?: any }> => {
  try {
    const docRef = doc(firestore, collectionName, id);
    await setDoc(docRef, data, { merge: true });
    return { success: true, id };
  } catch (error) {
    console.error(`Error saving to ${collectionName}:`, error);
    return { success: false, error };
  }
};

// Helper function to delete data
export const deleteFromFirestore = async (
  collectionName: string, 
  id: string
): Promise<{ success: boolean; error?: any }> => {
  try {
    const docRef = doc(firestore, collectionName, id);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting from ${collectionName}:`, error);
    return { success: false, error };
  }
};

// Helper function to update document
export const updateInFirestore = async (
  collectionName: string, 
  id: string, 
  data: Record<string, any>
): Promise<{ success: boolean; error?: any }> => {
  try {
    const docRef = doc(firestore, collectionName, id);
    await updateDoc(docRef, data);
    return { success: true };
  } catch (error) {
    console.error(`Error updating in ${collectionName}:`, error);
    return { success: false, error };
  }
};

// Helper function to get a single document
export const getDocument = async (
  collectionName: string, 
  id: string
): Promise<{ success: boolean; data?: any; error?: any }> => {
  try {
    const docSnap = await getDocs(
      query(collection(firestore, collectionName), where('__name__', '==', id))
    );

    if (!docSnap.empty) {
      return { 
        success: true, 
        data: { id: docSnap.docs[0].id, ...docSnap.docs[0].data() } 
      };
    }

    return { success: false, data: null };
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    return { success: false, error };
  }
};

// Helper function to get all documents
export const getAllDocuments = async (
  collectionName: string
): Promise<{ success: boolean; data?: any[]; error?: any }> => {
  try {
    const querySnapshot = await getDocs(collection(firestore, collectionName));
    const items: any[] = [];

    querySnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
      items.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, data: items };
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error);
    return { success: false, error };
  }
};

// Re-export firebase functions
export { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  where, 
  onSnapshot, 
  deleteDoc, 
  updateDoc, 
  limit,
  orderBy
};

// Export types
export type { Query, DocumentData, QuerySnapshot, DocumentSnapshot };

// Export existing modules
export * from './provider';
export * from './client-provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';