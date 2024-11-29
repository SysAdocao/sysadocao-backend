import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBBLcwo4iofQ3mLeDtcE1_r8yZ1MwI6jIY",
  authDomain: "sysadocao-images.firebaseapp.com",
  projectId: "sysadocao-images",
  storageBucket: "sysadocao-images.firebasestorage.app",
  messagingSenderId: "44712712412",
  appId: "1:44712712412:web:221e8a8bc2eb3bb178bc19",
  measurementId: "G-ERMB25WG0V",
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
