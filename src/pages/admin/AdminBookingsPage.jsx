import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAdminCancelBookingMutation,
  useAdminMarkCompletedMutation,
  useGetAdminBookingsQuery,
} from "../../redux/adminDashboardApi";
import BookingsControls from "./bookings/BookingsControls";
import BookingsKpiCards from "./bookings/BookingsKpiCards";
import BookingsPageHeader from "./bookings/BookingsPageHeader";
import BookingsPagination from "./bookings/BookingsPagination";
import BookingsTable from "./bookings/BookingsTable";

const ITEMS_PER_PAGE = 10;

export function AdminBookingsPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter]);

  const { data, isLoading, isFetching } = useGetAdminBookingsQuery({
    page,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch,
    status: statusFilter,
  });

  const [adminCancelBooking] = useAdminCancelBookingMutation();
  const [adminMarkCompleted] = useAdminMarkCompletedMutation();

  const bookings = data?.bookings || [];
  const pagination = data?.pagination || { total: 0, totalPages: 1 };
  const kpis = data?.kpis || {};

  const { total, totalPages } = pagination;
  const startIndex = total > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0;
  const endIndex = Math.min(page * ITEMS_PER_PAGE, total);

  const handleAction = async (action, bookingId) => {
    setLoadingId(bookingId);
    try {
      let response;
      if (action === "cancel") {
        response = await adminCancelBooking(bookingId).unwrap();
      }
      if (action === "complete") {
        response = await adminMarkCompleted(bookingId).unwrap();
      }
      toast.success(response?.message || "Action completed");
    } catch (err) {
      toast.error(err?.data?.message || "Action failed. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = new Set([1, totalPages, page, page - 1, page + 1]);
    return [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  };

  const formatDate = (dateStr, time) => {
    if (!dateStr) {
      return "-";
    }
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return time ? `${formattedDate} . ${time}` : formattedDate;
  };

  const formatPrice = (finalPrice, price) => {
    const displayPrice = finalPrice != null ? finalPrice : price;
    return displayPrice != null ? `$${Number(displayPrice).toFixed(2)}` : "-";
  };

  return (
    <div className="p-5 sm:p-6 space-y-6">
      <BookingsPageHeader />

      <BookingsKpiCards isLoading={isLoading} kpis={kpis} />

      <BookingsControls
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <BookingsTable
        bookings={bookings}
        isLoading={isLoading}
        isFetching={isFetching}
        itemsPerPage={ITEMS_PER_PAGE}
        loadingId={loadingId}
        navigate={navigate}
        onAction={handleAction}
        formatDate={formatDate}
        formatPrice={formatPrice}
      >
        <BookingsPagination
          isLoading={isLoading}
          total={total}
          startIndex={startIndex}
          endIndex={endIndex}
          page={page}
          totalPages={totalPages}
          pageNumbers={getPageNumbers()}
          onPrevious={() => setPage((p) => Math.max(p - 1, 1))}
          onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
          onSetPage={setPage}
        />
      </BookingsTable>
    </div>
  );
}
