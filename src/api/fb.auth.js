import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

export class Auth {
  async login(email, password) {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      const user = userCredentials.user;

      return user;
    } catch (error) {
      const errorMessage = error.message;
      // Handle Errors here.
      // console.error("Error code:", errorCode);
      // console.error("Error message:", errorMessage);
      throw error;
    }
  }
}
