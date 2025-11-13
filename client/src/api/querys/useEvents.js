import { useQuery } from "@tanstack/react-query";
import apiClient from "../../config/axiosInstance";


export const useEvents = (filters) => {
    const query = useQuery({
      queryKey: ["events", filters],
      queryFn: async () => {
        const params = new URLSearchParams(filters);
        console.log(params.toString())
        const { data } = await apiClient.get(`/event?${params.toString()}`);
        return data;
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    });


  
    return {
        events: query.data?.events || [],
        pagination: query.data?.pagination,
        isLoading: query.isLoading,
        isError: query.isError,
        refetchEvents: query.refetch,
        error: query.error,
      };
      
  };
  