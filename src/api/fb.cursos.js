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
  orderBy,
} from "firebase/firestore";
import { db, storage } from "../utils/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "@firebase/storage";

export class CursosCtrl {
  async getCursos() {
    const q = query(
      collection(db, "Cursos"),
      orderBy("fecha", "desc")
    );
    const dataSnapshot = await getDocs(q);
    const newData = dataSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return newData;
  }

  async getCurso(id) {
    const docRef = doc(db, "Cursos", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return "Error";
    }
  }

  async getCursosByUser(uid) {
    const q = query(collection(db, "Cursos"), where("Autor", "==", uid));

    const querySnapshot = await getDocs(q);
    const blogData = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return blogData;
  }

  async getVideosCurso(id) {
    const q = query(
      collection(db, "Modulos"), 
      where("curso", "==", id), 
    );

    const querySnapshot = await getDocs(q);
    const blogData = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return blogData;
  }

  async getVideo(id) {
    const docRefVideo = doc(db, "Modulos", id);
    const docSnapVideo = await getDoc(docRefVideo);

    if (!docSnapVideo.exists()) throw "Error";

    return docSnapVideo.data();
  }

  async updateCurso(blogId, blogData) {
    try {
      const blogRef = doc(db, "Cursos", blogId);
      await updateDoc(blogRef, blogData);
      return true;
    } catch (error) {
      console.error("Error updating blog: ", error);
      return false;
    }
  }

  async uploadCursoImage(file, uid, slug) {
    // Obtén la extensión del archivo
    const fileExtension = file.name.split(".").pop();

    // Crea el nombre del archivo en Firebase Storage
    const firebaseFileName = `${uid}.${fileExtension}`;

    const fileRef = ref(
      storage,
      `${uid}/cursoImages/${slug}/${firebaseFileName}`
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

  async createCurso(uid, cursoData) {
    try {
      const blogRef = doc(db, "Cursos", uid);
      await setDoc(blogRef, cursoData);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async createVideoCurso(uid, videoData) {
    try {
      const blogRef = doc(db, "Modulos", uid);
      await setDoc(blogRef, videoData);
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateVideo(videoId, videoData) {
    try {
      const blogRef = doc(db, "Modulos", videoId);
      await updateDoc(blogRef, videoData);
      return true;
    } catch (error) {
      console.error("Error updating blog: ", error);
      return false;
    }
  }

  async uploadVideoImage(file, autorId, slug) {
    // Obtén la extensión del archivo
    const fileExtension = file.name.split(".").pop();

    // Crea el nombre del archivo en Firebase Storage
    const firebaseFileName = `${autorId}.${fileExtension}`;

    const fileRef = ref(
      storage,
      `${autorId}/videoImages/${slug}/${firebaseFileName}`
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

  async deleteCurso(curso) {
    try {
      // Eliminar el documento del blog de la colección "blogs"
      const cursoRef = doc(db, "Cursos", curso.id);
      await deleteDoc(cursoRef);

      // Eliminar la información de la imagen (u otro archivo) relacionada con el blog en Storage
      const storageImgRef = ref(storage, curso.curso_img); // blogImageRefPath debe ser la referencia al archivo en Storage
      await deleteObject(storageImgRef);

      if (curso.videos && curso.videos.length > 0) {
        curso.videos.map(async (video) => {
          await this.deleteVideo(video);
        });
      }

      return true;
    } catch (error) {
      console.error("Error al eliminar el Curso:", error);
      return false;
    }
  }

  async deleteVideo(video) {
    try {
      // Eliminar el documento del blog de la colección "blogs"
      const cursoRef = doc(db, "Modulos", video.id);
      await deleteDoc(cursoRef);

      // Eliminar la información de la imagen (u otro archivo) relacionada con el blog en Storage
      const storageImgRef = ref(storage, video.modulo_img); // blogImageRefPath debe ser la referencia al archivo en Storage
      await deleteObject(storageImgRef);

      return true;
    } catch (error) {
      console.error("Error al eliminar el Video:", error);
      return false;
    }
  }

  async darFavoritosCursos(likeData) {
    try {
      const { UserId, CursoId } = likeData;

      const docRef = doc(db, "Cursos", CursoId);
      const docSnapshot = await getDoc(docRef);

      const favsData = await docSnapshot.data().favs;

      await updateDoc(docRef, {
        favs: [...favsData, UserId],
      });
    } catch (error) {
      console.log("Ocurrio un error al dar like");
    }
  }

  async darUnFavoritosCursos(likeData) {
    try {
      const { UserId, CursoId } = likeData;

      const docRef = doc(db, "Cursos", CursoId);
      const docSnapshot = await getDoc(docRef);

      const favsData = await docSnapshot.data().favs;

      // Verificar si el usuario ya dio like
      if (favsData.includes(UserId)) {
        // Remover like
        await updateDoc(docRef, {
          favs: favsData.filter((id) => id !== UserId),
        });
      }

    } catch (error) {
      console.log("Ocurrio un error al dar like");
    }
  }

  async darDislikeCursos(likeData) {
    try {
      const { UserId, CursoId } = likeData;

      const docRef = doc(db, "Cursos", CursoId);
      const docSnapshot = await getDoc(docRef);

      const likesData = await docSnapshot.data().likes;

      // Verificar si el usuario ya dio like
      if (likesData.includes(UserId)) {
        // Remover like
        await updateDoc(docRef, {
          likes: likesData.filter((id) => id !== UserId),
        });
      }
    } catch (error) {
      console.log("Ocurrio un error al dar like");
    }
  }

  async darLikeCursos(likeData) {
    try {
      const { UserId, CursoId } = likeData;

      const docRef = doc(db, "Cursos", CursoId);
      const docSnapshot = await getDoc(docRef);

      const likesData = await docSnapshot.data().likes;

      await updateDoc(docRef, {
        likes: [...likesData, UserId],
      });
    } catch (error) {
      console.log("Ocurrio un error al dar like");
    }
  }

  async getFavCursos(userId){
    const q = query(collection(db, "Cursos"), where("favs","array-contains",userId));
    const dataSnapshot = await getDocs(q);
    const newData = dataSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return newData;
  }

}
