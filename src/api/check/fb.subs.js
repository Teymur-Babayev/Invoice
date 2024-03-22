import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";

export class SubsCtrl {
  async getSubs() {
    const dataCollection = collection(db, "Subs");
    const dataSnapshot = await getDocs(dataCollection);
    const newData = dataSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return newData;
  }

  async getMySub(id) {
    try {
      // Comprobar si el usuario existe en la colección 'users'
      let userData;
      const userRef = doc(db, "User", id);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        userData === false;
      } else {
        userData === true;
      }

      // Devolver los datos del usuario
      return userData;
    } catch (error) {
      throw `Error de firebase : ${error}`;
    }
  }

  async createBlog(subData) {
    try {
      const blogRef = doc(db, "Subs", subData.uid);
  
      const docSnapshot = await getDoc(blogRef);
  
      if (docSnapshot.exists()) {
        await updateDoc(blogRef, subData);
      } else {
        await setDoc(blogRef, subData);
      }
  
      return true;
    } catch (error) {
      console.error("Error al crear o actualizar el blog:", error);
      return false;
    }
  }
}
