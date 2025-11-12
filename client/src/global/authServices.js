
import apiClient from "../config/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
      try {
        const response = await apiClient.post("/auth/login", credentials);
  
        return response.data
      } catch (error) {
        return rejectWithValue(error.response?.data || "Login failed");
      }
    }
  );
  
  
  export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
      try {
        const response = await apiClient.post("/auth/register", userData);
  
        return response.data
      } catch (error) {
        return rejectWithValue(error.response?.data || "Registration failed");
      }
    }
  );