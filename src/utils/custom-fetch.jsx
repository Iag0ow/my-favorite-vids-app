import { logOut } from "./config";

export const customFetch = async (url, options) => {
  const token = localStorage.getItem("token");
  if (!token) return redirectToLogin();


  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) return redirectToLogin();

    return response.json();
  } catch (error) {
    return null;
  }
};

export const customFetchNoAuth = async (url, options) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(url, { ...options, headers });

    return response.json();
  } catch (error) {
    return null;
  }
};
export const fetchImg = async (url, options) => {
  const token = localStorage.getItem("token");
  if (!token) return redirectToLogin();

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) return redirectToLogin();

    return response.blob();
  } catch (error) {
    return null;
  }
};
export const redirectToLogin = () => {
  logOut();
  window.location.href = "/login";
};
