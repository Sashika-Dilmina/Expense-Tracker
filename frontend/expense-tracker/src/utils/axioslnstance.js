import axios from "axios";
import { BASE_URL } from "./apiPath";
import { base } from "../../../../backend/models/User";
import { head } from "../../../../backend/routes/authRoutes";


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    });

    //Request Interceptor
    axiosInstance.interceptors.request.use(
        (config) => {
            const accessToken = localStorage.getItem("token");
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );



    //Response Interceptor
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response) {
                // Handle specific status codes
                if (error.response.status === 401) {
                    // Unauthorized, possibly redirect to login
                     window.location.href = "/login"; // Uncomment to enable redirection

                
                } else if (error.response.status === 500) {
                    console.error("Server error! Please try again later.");
                }
            } else if (error.code === "ECONNABORTED") {
                console.error("Request timeout. Please try again.");
             
            }
            return Promise.reject(error);
        }
    );

    export default axiosInstance;


    