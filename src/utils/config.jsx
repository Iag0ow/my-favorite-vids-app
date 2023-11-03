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
  if (auth.hasOwnProperty("error")) {
    let authorization = {
      auth: false,
      message: auth.error.message,
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
    localStorage.removeItem("user_id");
  return true;
};

export const getUser = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };
    const result = await fetch(`${API}/api-user/profile`, config);
    const data = await result.json();
    return data;
  }
}

export const updateUser = async (user) => {
  const token = localStorage.getItem("token");

  if (token) {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    };
    let result = await fetch(`${API}/api-user/profile`, config);
    result = await result.json();
    return result;
  }
};

export const deleteUser = async (user) => {
  const token = localStorage.getItem("token");

  if (token) {
    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    };
    let result = await fetch(`${API}/api-user/profile`, config);
    if(result.status === 204){
      return true;
    }
    result = await result.json();
    return result;
  };
};

export const createVideo = async (data) => {
  const token = localStorage.getItem("token");

  if (token) {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    let result = await fetch(`${API}/api-user/videos`, config);
    if(result.ok){
      return true;
    }
    result = await result.json();
    return result;
  };
};


export const getAllVideos = async (page,platformParam) => {
  const token = localStorage.getItem("token");
  if (token) {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };
    const result = await fetch(`${API}/api-user/videos${page ? `?page=${page}` : ""}${platformParam ? `&platform=${platformParam}` : ""}`, config);
    const data = await result.json();
    return data;
  }
}

export const getDiscoverVideos = async (page,platformParam) => {
  const token = localStorage.getItem("token");
  if (token) {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };
    const result = await fetch(`${API}/api-user/discover/videos${page ? `?page=${page}` : ""}${platformParam ? `&platform=${platformParam}` : ""}`, config);
    const data = await result.json();
    console.log('discover:', data);
    return data;
  }
}


export const deleteVideo = async (videoId) => {
  const token = localStorage.getItem("token");

  if (token) {
    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let result = await fetch(`${API}/api-user/videos/${videoId}`, config);
    if(result.ok){
      return true;
    }
    result = await result.json();
    return result;
  };
};

export const getPlatforms = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let result = await fetch(`${API}/api-user/videos/platforms`, config);
    result = await result.json();

    return result;
  };
};

export const updateVideo = async (id,body) => {
  const token = localStorage.getItem("token");

  if (token) {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };
    let result = await fetch(`${API}/api-user/videos/${id}`, config);
    result = await result.json();
    return result;
  }
};

export const getVideoById = async (id) => {
  const token = localStorage.getItem("token");
  if (token) {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let result = await fetch(`${API}/api-user/videos/${id}`, config);
    result = await result.json();
    return result;
  }
}