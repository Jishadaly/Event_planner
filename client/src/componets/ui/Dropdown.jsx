import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export default function Dropdown({ label, options = [], value, onChange, className = "" }) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className={`relative w-full sm:w-48 ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <span className="truncate">{value || label}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-full rounded-md border border-border bg-popover shadow-md z-50">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option)
                setOpen(false)
              }}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground ${
                option === value ? "bg-accent text-accent-foreground" : ""
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
