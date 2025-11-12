import { createContext, useContext, useState, useCallback } from "react";
import NotificationToast from "../componets/notification/NotificationToast";

const ToastContext = createContext()

export function ToastProvider({ children, position = "top-right", motion = "smooth", defaultDuration = 4000 }) {
    const [toasts, setToasts] = useState([])

    const showToast = useCallback((type, title, message, duration = defaultDuration) => {
        const id = Date.now()
        const newToast = { id, title, type, message, duration }
        setToasts((prev) => [...prev, newToast])
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, duration + 200)
    }, [defaultDuration])

    const hideToast = useCallback((id) => setToasts((prev) => prev.filter((t) => t.id !== id)), [])

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            {/* Toast stack container */}
            <div
                className={`fixed z-50 flex flex-col gap-3 ${getPositionClasses(position)
                    }`}
            >
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`transition-all duration-500 ${motion === "smooth" ? "animate-toast-in" : ""
                            }`}
                    >
                        <NotificationToast
                            message={toast.message}
                            title={toast.title}
                            type={toast.type}
                            duration={toast.duration}
                            onClose={() => hideToast(toast.id)}
                        />
                    </div>
                ))}
            </div>
        </ToastContext.Provider >
    )
}

//helper fn

function getPositionClasses(position) {
    const map = {
        "top-left": "top-4 left-4",
        "top-center": "top-4 left-1/2 -translate-x-1/2",
        "top-right": "top-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
        "bottom-right": "bottom-4 right-4",
    }

    return map[position] || map["top-right"]
}

export function useToast() {
    return useContext(ToastContext)
}