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
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { createUserWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import { db, storage, auth } from "../utils/firebase";
import { CursosCtrl } from "./fb.cursos";
import { BlogsCtrl } from "./fb.blogs";
import { Auth } from "./fb.auth";

const AuthCtrl = new Auth();
const blogsCtrl = new BlogsCtrl();
const cursoCtrl = new CursosCtrl();
export class User {
  async getMe(uid) {
    try {
      // Comprobar si el usuario existe en la colección 'users'
      let userData;
      const userRef = doc(db, "User", uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Si el usuario no existe, crear un nuevo documento con campos vacíos
        await setDoc(userRef, {
          Nombre: "",
          Apellido: "",
          Empresa: "",
          Cargo: "",
          Username: "",
        });
        // Obtener los datos del usuario recién creado
        userData = {
          uid: uid,
          Nombre: "",
          Apellido: "",
          Empresa: "",
          Cargo: "",
          Username: "",
        };
      } else {
        // Si el usuario existe, obtener sus datos

        userData = { ...userSnap.data(), uid };
      }

      // Devolver los datos del usuario
      return userData;
    } catch (error) {
      throw `Error de firebase : ${error}`;
    }
  }

  async uploadImage(file, user) {
    // Obtén la extensión del archivo
    const fileExtension = file.name.split(".").pop();

    // Crea el nombre del archivo en Firebase Storage
    const firebaseFileName = `${"img_user"}.${fileExtension}`;

    const fileRef = ref(storage, `${user}/${firebaseFileName}`);
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

  async resetPassword(email){
    try {
      await sendPasswordResetEmail(auth, email);

      return true
    } catch (error) {
      console.log(error)
      return false      
    }
  }

  async updateMe(uid, data) {
    const userRef = doc(db, "User", uid);
    await updateDoc(userRef, data);
    return data;
  }

  async getUsersWithRole() {
    const q = query(
      collection(db, "User"),
      where("UserRole", "in", ["Admin", "SubAdmin"])
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

  async getUsersWithOutRole() {
    const q = query(collection(db, "User"));

    const querySnapshot = await getDocs(q);
    const blogData = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return blogData;
  }

  async createUser(userData) {

    try {
      // const q = query(collection(db, 'User'), where('email', '==', userData.email));
      // const querySnapshot = await getDocs(q);
      // const products = querySnapshot.docs.map(doc => doc.data());
      // if(products.length != 0) {
        const { email, password } = userData;
        //crea el email y password en firebase auth
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
  
        const { uid } = userCredentials.user;
  
        let UserCollectionData = {
          Nombre: userData.Nombre,
          Apellido: userData.Apellido,
          Cargo: userData.Cargo,
          Empresa: userData.Empresa,
          Img_url: "https://mui.com/static/images/avatar/2.jpg",
          uid: uid,
          Username: userData.Username,
          UserPlan: userData.UserPlan,
          UserRole: userData.UserRole,
          email: userData.email,
        };
  
        const userDocRef = doc(db, "User", uid);
  
        await setDoc(userDocRef, UserCollectionData);
        return true;
      // }else{
      //   return "exist";
      // }
    } catch (error) {
      return error.message;
    }
  }

  async deleteUserCollection(user) {
    try {
      // Eliminar el documento del blog de la colección "blogs"
      const blogRef = doc(db, "User", user.uid);
      await deleteDoc(blogRef);

      // Eliminar la información de la imagen (u otro archivo) relacionada con el blog en Storage
      const storageImgRef = ref(storage, user.Img_url); // blogImageRefPath debe ser la referencia al archivo en Storage
      await deleteObject(storageImgRef);

      return true;
    } catch (error) {
      return false;
    }
  }

  async delUser(user) {
    try {
      let UserData;

      const UserInfo = await this.getMe(user.uid);
      const UserCursos = await cursoCtrl.getCursosByUser(user.uid);
      const BlogsUser = await blogsCtrl.getBlogsPorCriterio(user.uid);

      UserData = {
        UserInfo: UserInfo,
        UserCursos: UserCursos,
        UserBlogs: BlogsUser,
      };

      await this.deleteUserCollection(user);

      if (UserData.UserCursos && UserData.UserCursos.length > 0) {
        UserData.UserCursos.map(async (curso) => {
          await cursoCtrl.deleteCurso(curso);
        });
      }

      if (UserData.UserBlogs && UserData.UserBlogs.length > 0) {
        UserData.UserBlogs.map(async (blog) => {
          await blogsCtrl.deleteBlogPorCriterio(
            blog.Autor,
            blog.blog_img,
            blog.blogFileName
          );
        });
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async UpdatePlanById(uid, newData) {
    try {
      // Obtener referencia directamente con el uid
      const userRef = doc(db, "User", uid);
  
      // Actualizar documento
      await updateDoc(userRef, {
        UserPlan: newData,
      });
  
      // console.log("Plan actualizado con éxito");
      return true
    } catch (error) {
      return false
      // console.error("Error al actualizar el plan:", error);
    }
  }
}
