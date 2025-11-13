import { useMutation } from "@tanstack/react-query";
import apiClient from "../../config/axiosInstance";
import { useToast } from "../../context/ToastContext";

export const useEventCreate = () => {
    const { showToast } = useToast();

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

            const { data } = await apiClient.post("/event", form, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return data;
        },
        onSuccess: () => {
            showToast("success", "Event Created", "Your event has been successfully added!");
        },
        onError: (err) => {
            console.error("Event creation failed:", err.response?.data?.message);
            showToast(
                "error",
                "Failed to Create Event",
                err.response?.data?.message || "Try again later"
            );
        },
    });

    return mutation;
};
