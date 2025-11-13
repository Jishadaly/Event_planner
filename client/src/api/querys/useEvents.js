import { useQuery } from "@tanstack/react-query";
import apiClient from "../../config/axiosInstance";


export const useEvents = (filters) => {
    const { status, search, page, limit, sortBy, category } = filters;
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["events", status, search, page, limit, sortBy, category],
        queryFn: async () => {
            const params = new URLSearchParams();

            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== "undefined") {
                    params.append(key, value);
                }
            });


            const { data } = await apiClient.get(`/event?${params.toString()}`);
            return data;
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });


    return {
        events: data?.events || [],
        pagination: data?.pagination,
        isLoading,
        error,
        refetch
    };

};
