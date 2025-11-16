export const getBackgroundColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-950"
      case "warning":
        return "bg-orange-50 dark:bg-orange-950"
      case "info":
        return "bg-blue-50 dark:bg-blue-950"
      default:
        return "bg-muted"
    }
  }