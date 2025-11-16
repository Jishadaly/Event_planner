import { useQuery } from "@tanstack/react-query";
import apiClient from "../../config/axiosInstance";

export const useAdminDashboard = () => {

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["adminDashboard"],
        queryFn: async () => {
            const res = await apiClient.get(`/dashboard/admin`);
            return res.data.data;
        },
        staleTime: 1000 * 60 * 1,
    });

    return {
        dashboardData: data,
        isLoading,
        error,
        refetchDashboard: refetch
    };
};


export const useOrganzerDashboard = () => {

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["organizerDashboard"],
        queryFn: async () => {
            const res = await apiClient.get(`/dashboard/organizer`);
            console.log(res)

            return res.data; 
        },
        staleTime: 1000 * 60 * 1,
    });


    return {
        dashboardData: data,
        isLoading,
        error,
        refetchDashboard: refetch
    };
};