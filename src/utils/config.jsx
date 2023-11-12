import { useEffect, useState } from "react";
import { customFetch, customFetchNoAuth } from "./custom-fetch";

const API = "https://my-favorite-vids-api.vercel.app";

export const login = async (loginForm) => {
  const bodyForm = JSON.stringify(loginForm);

  const config = {
    method: "POST",
    body: bodyForm,
  };

  const auth = await customFetchNoAuth(`${API}/session/login`, config);

  if (auth?.error) {
    return {
      auth: false,
      message: auth.error.message,
    };
  } else {
    localStorage.setItem("user_id", auth?.id);
    localStorage.setItem("token", auth?.access_token);

    return true;
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
  localStorage.removeItem("user_id");
  return true;
};

export const getUser = async () => {
  const config = {
    method: "GET",
  };

  return customFetch(`${API}/api-user/profile`, config);
};

export const updateUser = async (user) => {
  const config = {
    method: "PATCH",
    body: JSON.stringify(user),
  };

  return customFetch(`${API}/api-user/profile`, config);
};

export const deleteUser = async (user) => {
    const config = {
      method: "DELETE",
      body: JSON.stringify(user),
    };

    let result = await customFetch(`${API}/api-user/profile`, config);
    if (result.status === 204) return true;

    return result;
};

export const createVideo = async (data) => {
    const config = {
      method: "POST",
      body: JSON.stringify(data),
    };

    let result = await customFetch(`${API}/api-user/videos`, config);
    if (result.ok) return true;

    return result;
};

export const getAllVideos = async (page, platformParam, searh) => {
    const config = {
      method: "GET",
    };

    return customFetch(
      `${API}/api-user/videos${page ? `?page=${page}` : ""}${
        platformParam ? `&platform=${platformParam}` : ""
      }${searh ? `&title=${searh}` : ""}`,
      config
    );
};

export const getDiscoverVideos = async (page, platformParam, searh) => {
    const config = {
      method: "GET",
    };

    return customFetch(
      `${API}/api-user/discover/videos${page ? `?page=${page}` : ""}${
        platformParam ? `&platform=${platformParam}` : ""
      }${searh ? `&title=${searh}` : ""}`,
      config
    );
};

export const deleteVideo = async (videoId) => {
    const config = {
      method: "DELETE",
    };

    let result = await customFetch(`${API}/api-user/videos/${videoId}`, config);
    if (result.ok) return true;

    return result;
};

export const getPlatforms = async () => {
    const config = {
      method: "GET",
    };

    return customFetch(`${API}/api-user/videos/platforms`, config);
};

export const getPlatformsDiscover = async () => {
    const config = {
      method: "GET",
    };

    return customFetch(`${API}/api-user/discover/videos/platforms`, config);
};

export const updateVideo = async (id, body) => {
    const config = {
      method: "PATCH",
      body: JSON.stringify(body),
    };

    return customFetch(`${API}/api-user/videos/${id}`, config);
};

export const getVideoById = async (id) => {
    const config = {
      method: "GET",
    };


    return customFetch(`${API}/api-user/videos/${id}`, config);
};

export const getPublicVideoById = async (id) => {

    let result = await fetch(`${API}/api-user/videos/${id}`, config);
    result = await result.json();
    return result;
  }
}
export const getPublicVideoById = async (user_id,page,platformParam,searh) => {
  const token = localStorage.getItem("token");
  if (token) {
    const config = {
      method: "GET",
    };

    return customFetch(`${API}/api-user/videos/public/${id}`, config);
};
    let result = await fetch(`${API}/discover/videos/users/${user_id}${page ? `?page=${page}` : ""}${platformParam ? `&platform=${platformParam}` : ""}${searh ? `&title=${searh}` : ""}`, config);

    result = await result.json();
    return result;
  }
}
