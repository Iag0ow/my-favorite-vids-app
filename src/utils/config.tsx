const API = "https://my-favorite-vids-api.vercel.app";
import { useEffect, useState } from "react";
export const login = async (loginForm) => {
  const bodyForm = JSON.stringify(loginForm);
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyForm,
  };
    const response = await fetch(`${API}/session/login`, config);
    const auth = await response.json();
    console.log('response: ', auth);
  if (auth.statusCode) {
    let authorization = {
      auth: false,
      message: auth.message,
    };
    return authorization;
  } else {
    let authorization = true;
    localStorage.setItem("user_id", auth.id);
    localStorage.setItem("token", auth.access_token);
    return authorization;
  }
};
export const getAuth = () => {
  const user = localStorage.getItem("token");

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [user]);

  return { auth };
};

export const logOut = () => {
    localStorage.removeItem("token");
  return true;
};