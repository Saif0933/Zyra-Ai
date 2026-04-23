import axios from "axios";
import { Platform } from "react-native";

/**
 * For React Native:
 * 1. Android Emulator uses 10.0.2.2 to access the host's localhost.
 * 2. iOS Simulator and Web use localhost.
 */
const BASE_URL = Platform.OS === "android" 
  ? "http://192.168.1.7:5000/api" 
  : "http://192.168.1.7:5000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Log the full error for debugging in development
    console.log("API Error Response:", error?.response?.data);
    console.log("API Error Status:", error?.response?.status);
    console.log("API Error Message:", error?.message);

    const message = 
      error?.response?.data?.message || 
      error?.message || 
      "Something went wrong";
      
    return Promise.reject(new Error(message));
  }
);