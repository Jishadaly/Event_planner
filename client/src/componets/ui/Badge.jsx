import React from "react"

export default function Badge({ className = "", ...props }) {
  return (
    <div
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}
      {...props}
    />
  )
}
