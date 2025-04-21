// src/services/authService.js
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;

class AuthService {
  async login(username:string, password:string) {
    try {
      const response = await axios.post(`${API_URL}login`, {
        username,
        password,
      });

      const data = response.data;

      // Save token to localStorage if needed
      if (data.token) {
        Object.entries({
            token: data.token,
            username: data.username,
            userId: data.userId,
            userRole: data.userRole
          }).forEach(([key, value]) => localStorage.setItem(key, value));
          
      }

      return data;
    } catch (error:any) {
      // Check if error has response from server
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || "Login failed");
      } else {
        throw new Error("Network Error");
      }
    }
  }

  logout() {
    localStorage.removeItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }


}

export default new AuthService();
