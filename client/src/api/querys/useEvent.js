import { useQuery } from "@tanstack/react-query";
import apiClient from "../../config/axiosInstance";

export const useEvent = (eventId) => {

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["event", eventId],
        queryFn: async () => await apiClient.get(`/event/${eventId}`)
    });
    console.log(data)
    return { event:data?.data?.event, isLoading, error, refetch }

};
