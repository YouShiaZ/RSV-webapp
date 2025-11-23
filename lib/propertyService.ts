import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { Property } from './types';
import { dummyProperties } from './dummyData';

const PROPERTIES_COLLECTION = 'properties';
const useDummyData = process.env.NEXT_PUBLIC_USE_DUMMY_DATA === 'true';

let cachedProperties: Property[] | null = null;

const getDb = async () => {
  const { db } = await import('./firebase');
  return db;
};

const mapDocToProperty = (snapshot: any): Property => ({
  id: snapshot.id,
  ...snapshot.data(),
  createdAt: snapshot.data().createdAt?.toDate() || new Date(),
  updatedAt: snapshot.data().updatedAt?.toDate() || new Date(),
});

const resolveProperties = (properties: Property[]) => {
  cachedProperties = properties;
  return properties;
};

const fallbackToDummy = () => resolveProperties(dummyProperties);

export const propertyService = {
  async getAll(options?: { force?: boolean }): Promise<Property[]> {
    if (!options?.force && cachedProperties) {
      return cachedProperties;
    }

    if (useDummyData) {
      return fallbackToDummy();
    }

    try {
      const db = await getDb();
      const propertiesRef = collection(db, PROPERTIES_COLLECTION);
      const q = query(propertiesRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const properties = snapshot.docs.map(mapDocToProperty) as Property[];

      if (properties.length === 0) {
        return fallbackToDummy();
      }

      return resolveProperties(properties);
    } catch (error) {
      console.error('Error fetching properties, using dummy data:', error);
      return fallbackToDummy();
    }
  },

  async getById(id: string): Promise<Property | null> {
    if (cachedProperties) {
      const cached = cachedProperties.find((property) => property.id === id);
      if (cached) return cached;
    }

    if (useDummyData) {
      return dummyProperties.find((property) => property.id === id) || null;
    }

    try {
      const db = await getDb();
      const docRef = doc(db, PROPERTIES_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }

      const property = mapDocToProperty(docSnap) as Property;
      cachedProperties = cachedProperties ? [...cachedProperties, property] : [property];
      return property;
    } catch (error) {
      console.error('Error fetching property, using dummy data:', error);
      return dummyProperties.find((property) => property.id === id) || null;
    }
  },

  async getFeatured(): Promise<Property[]> {
    const allProperties = await this.getAll();
    return allProperties.filter((property) => property.isFeatured);
  },

  async create(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const db = await getDb();
    const propertiesRef = collection(db, PROPERTIES_COLLECTION);
    const now = Timestamp.now();
    
    const docRef = await addDoc(propertiesRef, {
      ...property,
      createdAt: now,
      updatedAt: now,
    });

    cachedProperties = null;
    return docRef.id;
  },

  async update(id: string, property: Partial<Property>): Promise<void> {
    const db = await getDb();
    const docRef = doc(db, PROPERTIES_COLLECTION, id);
    await updateDoc(docRef, {
      ...property,
      updatedAt: Timestamp.now(),
    });

    cachedProperties = null;
  },

  async delete(id: string): Promise<void> {
    const db = await getDb();
    const docRef = doc(db, PROPERTIES_COLLECTION, id);
    await deleteDoc(docRef);
    cachedProperties = cachedProperties?.filter((property) => property.id !== id) || null;
  },
};
