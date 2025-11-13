import apiClient from "../config/axiosInstance"

export const logout = async () => {
    try {
        const res = await apiClient.post("/auth/logout")
        return res.data
    } catch (error) {
        return error.response.data
    }
} 