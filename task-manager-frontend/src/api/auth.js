const BASE_URL = "https://task-management-web-application-j1u.vercel.app/api";

/**
 * REGISTER USER
 */
export const registerUser = async (userData) => {
  
    const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include", // 🔥 REQUIRED for cookies
    body: JSON.stringify(userData)
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};



/**
 * GET CURRENT USER
 */
export const getMe = async () => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    credentials: "include"
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Not authenticated");
  }

  return data;
};

/**
 * LOGOUT USER
 */
export const logoutUser = async () => {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include"
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Logout failed");
  }

  return data;
};



/**
 * LOGIN USER
 */
export const loginUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include", // 🔥 IMPORTANT for HTTP-only cookie
    body: JSON.stringify(userData)
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};