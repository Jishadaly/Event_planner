import { useState, useMemo } from "react";
import EventCard from "../componets/events/EventCard";
import EventFilters from "../componets/events/EventFilters";
import EventSearch from "../componets/events/EventSearch";
import { useEvents } from "../api/querys/useEvents";
import { Loader2 } from "lucide-react";
import { useDebounce } from "../hooks/useHooks";
import Pagination from "../componets/common/Pagination";

export default function EventsListingPage() {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 6;

  const debouncedSearch = useDebounce(searchQuery, 500)

  const { events, isLoading, error, pagination } = useEvents({
    status: selectedStatus !== "All" ? selectedStatus : undefined,
    search: debouncedSearch || '',
    page,
    limit,
    sortBy: "-createdAt",
    category: selectedCategory !== "All" ? selectedCategory : undefined,
  });

  const handleNext = () => {
    if (page < pagination.pages) setPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };


  return (
    <div className="min-h-screen bg-background">


      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-4">
          <EventSearch value={searchQuery} onChange={setSearchQuery} />

        </div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-lg font-medium text-destructive">Failed to load events</p>
            <p className="mt-2 text-muted-foreground">Please try again later</p>
          </div>
        )}

        {!isLoading && !error && (
          <>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-5">
              <p className="text-sm text-muted-foreground">
                Showing {events.length} of {pagination?.total || 0} events
              </p>

              <EventFilters
                selectedCategory={selectedCategory}
                selectedStatus={selectedStatus}
                onCategoryChange={setSelectedCategory}
                onStatusChange={setSelectedStatus}
              />
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
            {pagination.pages > 1 && (
              <Pagination page={page} pages={pagination.pages} onPrev={handlePrev} onNext={handleNext} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
