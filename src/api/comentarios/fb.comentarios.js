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

export class ComentCtrl {
  async getComent(id) {
    try {
      const cursosRef = collection(db, "Comentarios");
      const q = query(cursosRef, where("refId", "==", id));
      const querySnapshot = await getDocs(q);

      const ComentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return ComentsData;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async createComent(uid, comentData) {
    try {
      const ComentsRef = doc(db, "Comentarios", uid);
      await setDoc(ComentsRef, comentData);
      return true;
    } catch (error) {
      return false;
    }
  }

  async DeleteComent(id) {
    try {
      const ComentRef = doc(db, "Comentarios", id);
      await deleteDoc(ComentRef);
    } catch (error) {
      console.log("Error al elimnar el comentario");
    }
  }
}
