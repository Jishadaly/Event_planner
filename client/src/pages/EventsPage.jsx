import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "../componets/ui/Button";
import EventCard from "../componets/events/EventCard";
import EventFilters from "../componets/events/EventFilters";
import EventSearch from "../componets/events/EventSearch";
import { useEvents } from "../api/querys/useEvents";
import { Loader2 } from "lucide-react";

export default function EventsListingPage() {
  // Filters & Pagination state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 6; // per page

  // Query hook (fetch data)
  const {
    events,
    isLoading,
    isError,
    refetch,
    pagination
  } = useEvents({
    status: selectedStatus !== "All" ? selectedStatus : undefined,
    search: searchQuery || undefined,
    page,
    limit,
    sortBy: "-createdAt",
    category: selectedCategory !== "All" ? selectedCategory : undefined,
  });

  console.log(events)
  
  

  // Pagination Handlers
  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  // UI Rendering
  return (
    <div className="min-h-screen bg-background">

      {/* Filters + Search */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-4">
          <EventSearch value={searchQuery} onChange={setSearchQuery} />
          <EventFilters
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            onCategoryChange={setSelectedCategory}
            onStatusChange={setSelectedStatus}
          />
        </div>

        {/* Loading & Error */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-lg font-medium text-destructive">Failed to load events</p>
            <p className="mt-2 text-muted-foreground">Please try again later</p>
          </div>
        )}

        {/* Events Grid */}
        {!isLoading && !isError && (
          <>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {events.length} of {pagination?.total || 0} events
              </p>
            </div>

            {events.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card p-12 text-center">
                <p className="text-lg font-medium">No events found</p>
                <p className="mt-2 text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}

            {/* Pagination */}
            {pagination > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={handlePrev}
                >
                  ← Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {page} of {pagination.total}
                </span>
                <Button
                  variant="outline"
                  disabled={page === pagination.total}
                  onClick={handleNext}
                >
                  Next →
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
