import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Property } from './types';

const PROPERTIES_COLLECTION = 'properties';

export const propertyService = {
  async getAll(): Promise<Property[]> {
    const propertiesRef = collection(db, PROPERTIES_COLLECTION);
    const q = query(propertiesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Property[];
  },

  async getById(id: string): Promise<Property | null> {
    const docRef = doc(db, PROPERTIES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate() || new Date(),
      updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
    } as Property;
  },

  async getFeatured(): Promise<Property[]> {
    const propertiesRef = collection(db, PROPERTIES_COLLECTION);
    const q = query(
      propertiesRef,
      where('isFeatured', '==', true),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Property[];
  },

  async create(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const propertiesRef = collection(db, PROPERTIES_COLLECTION);
    const now = Timestamp.now();
    
    const docRef = await addDoc(propertiesRef, {
      ...property,
      createdAt: now,
      updatedAt: now,
    });
    
    return docRef.id;
  },

  async update(id: string, property: Partial<Property>): Promise<void> {
    const docRef = doc(db, PROPERTIES_COLLECTION, id);
    await updateDoc(docRef, {
      ...property,
      updatedAt: Timestamp.now(),
    });
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, PROPERTIES_COLLECTION, id);
    await deleteDoc(docRef);
  },
};
