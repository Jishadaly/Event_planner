export function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
  
  export function formatTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }
  
  export function formatDateFull(date) {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
  
  export function getDayOfWeek(date) {
    return new Date(date).toLocaleDateString("en-US", { weekday: "long" })
  }
  