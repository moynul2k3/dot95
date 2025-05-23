import {setCookie} from 'cookies-next/client'
import axios from "axios";

const API_URL =
    process.env.NEXT_PUBLIC_PRODUCTION === "true"
        ? process.env.NEXT_PUBLIC_PRODUCTION_API
        : process.env.NEXT_PUBLIC_LOCAL_API;

const option1 = {
    path: "/", // Available across the entire site
    secure: true, // Ensures it's sent over HTTPS
    sameSite: "strict" as "lax", // TypeScript fix: explicitly set type
    httpOnly: false,
    maxAge: 60, //1 min   
};
const option2 = {
    path: "/", // Available across the entire site
    secure: true, // Ensures it's sent over HTTPS
    sameSite: "strict" as "lax", // TypeScript fix: explicitly set type
    httpOnly: false,
    maxAge: 60*60*24*30, //1 month   
};

export const checkUserExists = async (email: string) => {
    try {
        const response = await axios.get(`${API_URL}/auth/check-user-exists/`, {
            params: { email },
            withCredentials: false,
        });
        return response.data.exists;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(
            `${API_URL}/auth/signin/`,
            { email, password },
            {
                withCredentials: false, // Send cookies
            }
        );
        setCookie("ac_T", response.data.access, option1);
        setCookie("rf_T", response.data.refresh, option2);
        setCookie("u_id", response.data.u_id, option2);
        return { status: response.data.status, message: response.data.message };
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (email:string, password:string, confirm_password:string) => {
    try {
        const response = await axios.post(
            `${API_URL}/auth/signup/`,
            { email, password, confirm_password},
            {
                withCredentials: false, // Send cookies
            }
        );
        setCookie("ac_T", response.data.access, option1);
        setCookie("rf_T", response.data.refresh, option2);
        setCookie("u_id", response.data.u_id, option2);
        return { status: response.data.status, message: response.data.message };
    } catch (error) {
        throw error;
    }
};

export const sendOtp = async (email:string) => {
    try {
        const response = await axios.post(
            `${API_URL}/auth/send_otp/`,
            { email},
            {
                withCredentials: false, // Send cookies
            }
        );
        return { status: response.data.status, message: response.data.message };
    } catch (error) {
        throw error;
    }
};

export const verifyOtp = async (email:string, otpValue:string) => {
    try {
        const response = await axios.post(
            `${API_URL}/auth/verify_otp/`,
            { email, otpValue},
            {
                withCredentials: false, // Send cookies
            }
        );
        return { status: response.data.status, message: response.data.message };
    } catch (error) {
        throw error;
    }
};

export const resetPassword = async (email:string, password:string, confirm_password:string) => {
    try {
        const response = await axios.post(
            `${API_URL}/auth/forgot_password/`,
            { email, password, confirm_password },
            {
                withCredentials: false, // Send cookies
            }
        );
        
        setCookie("ac_T", response.data.access, option1);
        setCookie("rf_T", response.data.refresh, option2);
        setCookie("u_id", response.data.u_id, option2);
        return { status: response.data.status, message: response.data.message };
    } catch (error) {
        throw error;
    }
};

