import { initializeApp } from "firebase/app/"
import { getDatabase } from "firebase/database"

const config = {
  apiKey: "AIzaSyBZZFLjiwu-j7QMNplHqjKf4Bq0EeuHjPk",
  authDomain: "planit-poker.firebaseapp.com",
  databaseURL:
    "https://planit-poker-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "planit-poker",
  storageBucket: "planit-poker.appspot.com",
  messagingSenderId: "154196334219",
  appId: "1:154196334219:web:5ccc45f0173d2c81a0268e",
}

const app = initializeApp(config)

export const db = getDatabase(app)
