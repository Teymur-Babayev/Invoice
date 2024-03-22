import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db, storage } from "../../utils/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "@firebase/storage";

export class InfoFiscal {
  async getInfoFiscal(id) {
    const docRef = doc(db, "InfoFiscalUser", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return false;
    }
  }

  async SubirFotoLogoTipo(file, uid, slug) {
    // Obtén la extensión del archivo
    const fileExtension = file.name.split(".").pop();

    // Crea el nombre del archivo en Firebase Storage
    const firebaseFileName = `${uid}.${fileExtension}`;

    const fileRef = ref(
      storage,
      `${uid}/logotipo/${firebaseFileName}`
    );
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

  async SubirArchivoCerKey(file, uid, slug) {
    // Obtén la extensión del archivo
    const fileExtension = file.name.split(".").pop();

    // Crea el nombre del archivo en Firebase Storage
    const firebaseFileName = `${uid}.${fileExtension}`;

    const fileRef = ref(
      storage,
      `${uid}/archivosInfo/${slug}/${firebaseFileName}`
    );
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

  async createInfoFiscal(uid, InfoFiscal) {
    try {
      const blogRef = doc(db, "InfoFiscalUser", uid);
      await setDoc(blogRef, InfoFiscal);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async createInfoCliente(uid, InfoFiscal) {
    try {
      const blogRef = doc(db, "InfoFiscalClientes", uid);
      await setDoc(blogRef, InfoFiscal);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getInfoMisClientes(id) {
    const usersRef = collection(db, 'InfoFiscalClientes');

    const q = query(usersRef, where("clienteDe", "==", id))

    const querySnapshot = await getDocs(q);
    const users = [];

    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return users;
  }

  async updateInfoMisClientes(id, ClientData) {
    try {
      const blogRef = doc(db, "InfoFiscalClientes", id);
      await updateDoc(blogRef, ClientData);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getInfoMisProductos(id) {
    const usersRef = collection(db, 'InfoFiscalProducts');

    const q = query(usersRef, where("productoDe", "==", id))

    const querySnapshot = await getDocs(q);
    const users = [];

    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return users;
  }

  async createInfoProduct(uid, InfoFiscal) {
    try {
      const blogRef = doc(db, "InfoFiscalProducts", uid);
      await setDoc(blogRef, InfoFiscal);
      return true;
    } catch (error) {
      return false;
    }
  }

}