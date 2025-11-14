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

export function getToday() {
  const today = new Date()
  return {
    today: today.getDate(),
    month: today.getMonth(), // 0-indexed: 0 = Jan
    year: today.getFullYear(),
    iso: today.toISOString(), // Full ISO string
  }
}
