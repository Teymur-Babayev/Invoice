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
import { db, storage } from "../../utils/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "@firebase/storage";
import axios from "axios";

export class ContabilidadCtrl {
  async getSolicitudes() {
    const dataCollection = collection(db, "Solicitudes");
    const dataSnapshot = await getDocs(dataCollection);
    const newData = dataSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return newData;
  }

  async getSolicitud(uid) {
    const blogRef = doc(db, "Solicitudes", uid);
    const snapshotBlogPost = await getDoc(blogRef);
    const data = { ...snapshotBlogPost?.data() };

    return data;
  }

  async getFirma(uid) {
    const q = query(collection(db, "Solicitudes"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const blogData = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return blogData[0];
  }

  async getMisSolicitudes(uid) {
    const q = query(collection(db, "Solicitudes"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    const blogData = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return blogData;
  }

  async createSolicitud(uid, SoliData) {
    try {
      const blogRef = doc(db, "Solicitudes", uid);
      await setDoc(blogRef, SoliData);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteSolicitud(id, soli) {
    try {
      // Eliminar el documento del blog de la colección "blogs"
      const cursoRef = doc(db, "Solicitudes", id);
      await deleteDoc(cursoRef);

      // Eliminar la información de la imagen (u otro archivo) relacionada con el blog en Storage
      const storageImgRef = ref(storage, soli.FirmaDigitalUrl); // blogImageRefPath debe ser la referencia al archivo en Storage
      await deleteObject(storageImgRef);

      return true;
    } catch (error) {
      console.error("Error al eliminar la solicitud:", error);
      return false;
    }
  }

  async updateSolicitud(id, SoliData) {
    try {
      const soliRef = doc(db, "Solicitudes", id);
      await updateDoc(soliRef, SoliData);
      return true;
    } catch (error) {
      console.error("Error updating solicitud: ", error);
      return false;
    }
  }

  async uploadFirma(file, uid) {
    // Obtén la extensión del archivo
    const fileExtension = file.name.split(".").pop();

    // Crea el nombre del archivo en Firebase Storage
    const firebaseFileName = `Firma.${fileExtension}`;

    const fileRef = ref(storage, `${uid}/Firma/${firebaseFileName}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    // Espera a que la carga se complete
    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progreso de la carga
        },
        (error) => {
          // Error
          reject(error);
        },
        () => {
          // Completado
          resolve();
        }
      );
    });

    // Obtiene la URL de descarga
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  }

  async getInfoSat(rfc) {
    const response = await axios.get(`https://api.sat.mx/ventas-gastos/${rfc}`);
    return response.data;
  }
}
