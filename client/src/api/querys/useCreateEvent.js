import { useMutation } from "@tanstack/react-query";
import apiClient from "../../config/axiosInstance";

export const useEventCreate = () => {

    const mutation = useMutation({
        mutationFn: async (payload) => {
            const form = new FormData();
            Object.keys(payload).forEach((key) => {
                if (key === "attachments") {
                    payload.attachments.forEach((file) => form.append("attachments", file));
                } else if (key === "image" && payload.image) {
                    form.append("image", payload.image);
                } else {
                    form.append(key, payload[key]);
                }
            });

            await apiClient.post("/event", form, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        }
    });

    return mutation;
};
