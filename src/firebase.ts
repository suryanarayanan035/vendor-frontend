import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";
// const app = initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// });

const firebaseConfig = {
  apiKey: "AIzaSyDihUPRt-wSwlLf7KL0BU9fMv26e0DjjUI",
  authDomain: "test-f8201.firebaseapp.com",
  databaseURL: "https://test-f8201-default-rtdb.firebaseio.com",
  projectId: "test-f8201",
  storageBucket: "test-f8201.appspot.com",
  messagingSenderId: "1032517068228",
  appId: "1:1032517068228:web:86090b124cb6837e2a3091",
  measurementId: "G-DQH21MHYM5",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);

export const firebaseSignInWithEmailAndPassword = async (
  auth: any,
  email: string,
  password: string
) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error("Error occured");
    alert(error.message);
  }
};

export const firebaseSignout = () => {
  auth.signOut();
};

export default app;
