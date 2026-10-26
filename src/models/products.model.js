import { db } from "../config/firebase.js";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const productosRef = collection(db, "productos");

export const findAll = async () => {
  const snapshot = await getDocs(productosRef);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const findById = async (id) => {
  const snapshot = await getDoc(doc(db, "productos", id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

export const create = async (product) => {
  const docRef = await addDoc(productosRef, product);
  return { id: docRef.id, ...product };
};

export const update = async (id, data) => {
  await updateDoc(doc(db, "productos", id), data);
  return { id, ...data };
};

export const remove = async (id) => {
  await deleteDoc(doc(db, "productos", id));
};