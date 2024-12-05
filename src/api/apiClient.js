import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      alert("Session expired. Logging you out.");
      try {
        await apiClient.post("/auth/logout");
      } catch (logoutError) {
        console.error("Error during logout:", logoutError);
      }
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
