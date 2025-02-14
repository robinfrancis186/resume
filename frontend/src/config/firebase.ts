import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CONFIG ? 
    JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG).apiKey : '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_CONFIG ?
    JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG).authDomain : '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG ?
    JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG).projectId : '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_CONFIG ?
    JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG).storageBucket : '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG ?
    JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG).messagingSenderId : '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG ?
    JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG).appId : '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG ?
    JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG).measurementId : ''
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

// Initialize Analytics if supported
let analytics = null
if (typeof window !== 'undefined') {
  isSupported().then(yes => yes && (analytics = getAnalytics(app)))
}

export { app, auth, db, storage, analytics } 