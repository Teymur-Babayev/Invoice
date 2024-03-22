import {
    collection,
    getDocs,
    doc,
    getDoc,
    query,
    where,
    updateDoc,
    setDoc,
    deleteDoc,
  } from "firebase/firestore";
  import { db, storage } from "../../utils/firebase";
  import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytesResumable,
  } from "@firebase/storage";

export class EstFinCtrl {

  async getEstadoFinancieros() {
    const dataCollection = collection(db, "EstadosFinancieros");
    const dataSnapshot = await getDocs(dataCollection);
    const newData = dataSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return newData;
  }

  async getEstadosFinancierosByUser(uid) {
    const q = query(collection(db, "EstadosFinancieros"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    const blogData = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return blogData;
  }

  async createEstFin(uid, cursoData) {
    try {
      const blogRef = doc(db, "EstadosFinancieros", uid);
      await setDoc(blogRef, cursoData);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  } 
  
  async updateEstFin(EstFinId, EstFinData) {
    try {
      const blogRef = doc(db, "EstadosFinancieros", EstFinId);
      await updateDoc(blogRef, EstFinData);
      return true;
    } catch (error) {
      console.error("Error updating blog: ", error);
      return false;
    }
  }

  async deleteEstFin(EstFinId, EstFinUrlRefPath) {
    try {
      // Eliminar el documento del blog de la colección "blogs"
      const blogRef = doc(db, "EstadosFinancieros", EstFinId);
      await deleteDoc(blogRef);

      // Eliminar la información de la imagen (u otro archivo) relacionada con el blog en Storage
      const storageImgRef = ref(storage, EstFinUrlRefPath); // blogImageRefPath debe ser la referencia al archivo en Storage
      await deleteObject(storageImgRef);

      return true;
    } catch (error) {
      console.error("Error al eliminar el blog:", error);
      return false;
    }
  }

  async uploadEstadoFin(file, uid, slug) {
    // Obtén la extensión del archivo
    const fileExtension = file.name.split(".").pop();

    // Crea el nombre del archivo en Firebase Storage
    const firebaseFileName = `${uid}.${fileExtension}`;

    const fileRef = ref(
      storage,
      `${uid}/EstadoFinancieros/${slug}/${firebaseFileName}`
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
}