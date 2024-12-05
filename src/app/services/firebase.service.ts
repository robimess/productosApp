import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth'
import { User } from '../models/user.models';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore'


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

  //===========AUTENTICACION===========
  getAuth(){
     return getAuth();
  }

  //===========SIGNIN===========
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  //===========CREAR USUARIO===========
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  //===========ACTUALIZAR USUARIO===========
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }
  //===========BASE DE DATOS===========
  //===SET===
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }
  //===GET===
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }
  //====RECUPERAR CONTRASEÑA====
  sendrecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

}

