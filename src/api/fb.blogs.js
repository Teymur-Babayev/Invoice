import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db, storage } from "../utils/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import axios from "axios";

export class BlogsCtrl {
  async getBlog(slug) {
    const q = query(collection(db, "blogs"), where("Slug", "==", slug));

    const querySnapshot = await getDocs(q);
    const blogData = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return blogData[0];
  }

  async getBlogs() {
    const q = query(collection(db, "blogs"), orderBy("fecha", "desc"));
    const dataSnapshot = await getDocs(q);
    const newData = dataSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return newData;
  }

  async getBlogMDX(blogName) {
    if (blogName != null) {
      const resp = await axios.get(blogName);
      const mdx = resp.data;
      return mdx;
    }
  }

  async createBlog(uid, blogData) {
    try {
      const blogRef = doc(db, "blogs", uid);
      await setDoc(blogRef, blogData);
      return true;
    } catch (error) {
      return false;
    }
  }

  async uploadBlogImage(file, uid, slug) {
    // Obtén la extensión del archivo
    const fileExtension = file.name.split(".").pop();

    // Crea el nombre del archivo en Firebase Storage
    const firebaseFileName = `${uid}.${fileExtension}`;

    const fileRef = ref(
      storage,
      `${uid}/blogImages/${slug}/${firebaseFileName}`
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

  async uploadBlogMD(file, uid, slug) {
    // Obtén la extensión del archivo
    const fileExtension = file.name.split(".").pop();

    // Crea el nombre del archivo en Firebase Storage
    const firebaseFileName = `${uid}.${fileExtension}`;

    const fileRef = ref(storage, `${uid}/blogs/${slug}/${firebaseFileName}`);
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

  async updateBlog(blogId, blogData) {
    try {
      const blogRef = doc(db, "blogs", blogId);
      await updateDoc(blogRef, blogData);
      return true;
    } catch (error) {
      console.error("Error updating blog: ", error);
      return false;
    }
  }

  async deleteBlog(blogId, blogImageRefPath, blogMdRefPath) {
    try {
      // Eliminar el documento del blog de la colección "blogs"
      const blogRef = doc(db, "blogs", blogId);
      await deleteDoc(blogRef);
      console.log("Documento de blog eliminado con éxito.");

      // Eliminar la información de la imagen (u otro archivo) relacionada con el blog en Storage
      const storageImgRef = ref(storage, blogImageRefPath); // blogImageRefPath debe ser la referencia al archivo en Storage
      await deleteObject(storageImgRef);
      console.log("Imagen de blog en Storage eliminada con éxito.");

      // Eliminar la información de la imagen (u otro archivo) relacionada con el blog en Storage
      const storageMDRef = ref(storage, blogMdRefPath); // blogImageRefPath debe ser la referencia al archivo en Storage
      await deleteObject(storageMDRef);
      console.log("MD de blog en Storage eliminada con éxito.");

      return true;
    } catch (error) {
      console.error("Error al eliminar el blog:", error);
      return false;
    }
  }

  async deleteBlogPorCriterio(blogAutor, blogImageRefPath, blogMdRefPath) {
    try {
      // Eliminar el documento del blog de la colección "blogs"
      const blogsRef = collection(db, "blogs");
      const q = query(blogsRef, where("Autor", "==", blogAutor));
      const querySnapshot = await getDocs(q);

      // Eliminar cada documento encontrado
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // Eliminar la información de la imagen (u otro archivo) relacionada con el blog en Storage
      const storageImgRef = ref(storage, blogImageRefPath); // blogImageRefPath debe ser la referencia al archivo en Storage
      await deleteObject(storageImgRef);

      // Eliminar la información de la imagen (u otro archivo) relacionada con el blog en Storage
      const storageMDRef = ref(storage, blogMdRefPath); // blogImageRefPath debe ser la referencia al archivo en Storage
      await deleteObject(storageMDRef);

      return true;
    } catch (error) {
      console.error("Error al eliminar el blog:", error);
      return false;
    }
  }

  async getBlogsPorCriterio(uid) {
    try {
      const cursosRef = collection(db, "blogs");
      const q = query(cursosRef, where("Autor", "==", uid));
      const querySnapshot = await getDocs(q);

      let blogs = [];
      querySnapshot.docs.map((videos) => {
        blogs.push(videos.data());
      });
      return blogs;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async darLikeBlogs(likeData) {
    try {
      const { UserId, blogId } = likeData;

      const docRef = doc(db, "blogs", blogId);
      const docSnapshot = await getDoc(docRef);

      const likesData = await docSnapshot.data().likes;

      await updateDoc(docRef, {
        likes: [...likesData, UserId],
      });
    } catch (error) {
      console.log("Ocurrio un error al dar like");
    }
  }

  async darFavoritosBlogs(likeData) {
    try {
      const { UserId, blogId } = likeData;

      const docRef = doc(db, "blogs", blogId);
      const docSnapshot = await getDoc(docRef);

      const favsData = await docSnapshot.data().favs;

      await updateDoc(docRef, {
        favs: [...favsData, UserId],
      });
    } catch (error) {
      console.log("Ocurrio un error al dar like");
    }
  }

  async darUnFavoritosBlogs(likeData) {
    try {
      const { UserId, blogId } = likeData;

      const docRef = doc(db, "blogs", blogId);
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

  async darDislikeBlogs(likeData) {
    try {
      const { UserId, blogId } = likeData;

      const docRef = doc(db, "blogs", blogId);
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

  async getFavBlogs(userId){
    const q = query(collection(db, "blogs"), where("favs","array-contains",userId));
    const dataSnapshot = await getDocs(q);
    const newData = dataSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return newData;
  }
}
