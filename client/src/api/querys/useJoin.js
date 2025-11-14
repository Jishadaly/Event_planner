import { useMutation } from "@tanstack/react-query";
import apiClient from "../../config/axiosInstance";

export const useJoin = () => {
    return useMutation({
        mutationFn: async (eventId) =>
            await apiClient.post(`/event/${eventId}/join`),
    });
};

export const useLeave = () => {
    return useMutation({
        mutationFn: async (eventId) =>
            await apiClient.post(`/event/${eventId}/leave`),
    });
};