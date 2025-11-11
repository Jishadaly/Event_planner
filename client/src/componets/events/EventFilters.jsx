import Dropdown from "../ui/Dropdown"

const CATEGORIES = ["All", "Technology", "Education", "Conference", "Networking", "Workshop"]
const STATUSES = ["All", "upcoming", "ongoing", "finished"]

export default function EventFilters({
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <Dropdown
        label="Select category"
        options={CATEGORIES}
        value={selectedCategory}
        onChange={onCategoryChange}
      />
      <Dropdown
        label="Select status"
        options={STATUSES}
        value={selectedStatus}
        onChange={onStatusChange}
      />
    </div>
  )
}
