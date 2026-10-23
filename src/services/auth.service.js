import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import jwt from "jsonwebtoken";
import { auth, db } from "../config/firebase.js";

export const login = async (email, password) => {
  if (!email || !password) {
    const error = new Error("Email y contraseña son obligatorios");
    error.status = 400;
    throw error;
  }

  let credential;
  try {
    credential = await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    const error = new Error("Credenciales inválidas");
    error.status = 401;
    throw error;
  }

  const uid = credential.user.uid;

  const userSnap = await getDoc(doc(db, "usuarios", uid));
  const rol = userSnap.exists() ? userSnap.data().rol : "user";

  const token = jwt.sign(
    { uid, email: credential.user.email, rol },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, user: { uid, email: credential.user.email, rol } };
};