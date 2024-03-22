import { initializeApp } from 'firebase/app';
import { getAuth, deleteUser } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyCUsdzag6kqlqZ_kshGdDluclR6jC_6nFw",
//   authDomain: "dgya-fb.firebaseapp.com",
//   projectId: "dgya-fb",
//   storageBucket: "dgya-fb.appspot.com",
//   messagingSenderId: "793437038075",
//   appId: "1:793437038075:web:3602e9004388938340d75e"
// };
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROYECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage, deleteUser };
