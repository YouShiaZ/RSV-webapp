import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Lead } from './types';

const LEADS_COLLECTION = 'leads';

export const leadService = {
  async getAll(): Promise<Lead[]> {
    const leadsRef = collection(db, LEADS_COLLECTION);
    const q = query(leadsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Lead[];
  },

  async create(lead: Omit<Lead, 'id' | 'createdAt'>): Promise<string> {
    const leadsRef = collection(db, LEADS_COLLECTION);
    
    const docRef = await addDoc(leadsRef, {
      ...lead,
      createdAt: Timestamp.now(),
    });
    
    return docRef.id;
  },
};
