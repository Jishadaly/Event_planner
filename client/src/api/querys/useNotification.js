import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../config/axiosInstance";

export const useNotification = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["notification"],
        queryFn: async () => await apiClient.get(`/notification`)
    });
    return { notifications: data?.data?.data, isLoading, error, refetchNotifcation: refetch }
};


// Mark as read
export const useMarkNotificationRead = () => {
    return useMutation({ mutationFn: async (notificationId) => apiClient.patch(`/notification/${notificationId}/read`) });
};

// Delete
export const useDeleteNotification = () => {
    return useMutation({ mutationFn: async (notificationId) => apiClient.delete(`/notification/${notificationId}`) });
};

// clearAll
export const useDeleteAllNotifications = () => {
    return useMutation({ mutationFn: async () => await apiClient.delete(`/notification`) })
};