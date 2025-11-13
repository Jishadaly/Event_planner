import { useState, useEffect } from "react";

/**
 * useDebounce Hook
 * Delays updating the value until after a given delay
 * (useful for search inputs, filters, etc.)
 */
export function useDebounce(value, delay = 500) {

    const [debouncedValue, setDebouncedValue] = useState("")

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), [delay])
        return () => clearTimeout(handler)
    }, [value, delay])
    
    return debouncedValue;
}