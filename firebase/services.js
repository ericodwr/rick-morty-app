import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from 'firebase/firestore';
import { db } from './index';

export const addLocation = async (data) => {
  try {
    const docRef = await addDoc(collection(db, 'location'), {
      name: data,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const getAllLocation = async () => {
  const querySnapshot = await getDocs(collection(db, 'location'));
  return querySnapshot.docs;
};

export const deleteLocation = async (id) => {
  try {
    await deleteDoc(doc(db, 'location', id));
    console.log('success delete');
  } catch (error) {
    console.log(error);
  }
};

export const addCharacter = async (locationId, idCharacter) => {
  try {
    const docRef = await setDoc(doc(db, 'location', locationId), {
      data: idCharacter,
    });

    console.log('Document written with ID: ');
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
