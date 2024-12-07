import React, { createContext, useContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { Alert } from "react-native";
import { dataURL } from "./APIPort";

const AuthContext = createContext();

GoogleSignin.configure({
  webClientId: '831682381926-6ti7id1ibguu46b6lap86g1v79239mbh.apps.googleusercontent.com'
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      auth.EmailAuthProvider.credential()
      return await auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.error(e);
    }
  };
  const signInWithEmail = async (email, password) => {
    await auth().signInWithEmailAndPassword(email, password)
    .catch(()=>Alert.alert("Sign In Error", "Invalid Email or Password"))
  }
  const logOut = async () => {
    try {
      const currentUser = auth().currentUser;
        if (currentUser) {
          setUser(null)
          await GoogleSignin.signOut()
          await auth().signOut();
        }
    } catch (e) {
        console.error(e);
    }
  };
  const updateResult = async () => {
    await axios.get(dataURL + "auth/"+user.uid)
    .then(response=>setUser(response.data))
    .catch(e=>console.error(e))
  }
  const postUser = async (signedUser) => {
    const newUser = {
      uid: signedUser.uid,
      avatar: signedUser.photoURL,
      email: signedUser.email,
      name: signedUser.displayName
    };
    await axios.post(dataURL + "auth", newUser)
    .then((response) => {
      setUser(response.data)
    })
    .catch((e) => console.log(e));
  };
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((currentUser) => {
        if (currentUser!==null) {
            postUser(currentUser);
        }
    });
    return ()=> unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, signInWithEmail, updateResult, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};