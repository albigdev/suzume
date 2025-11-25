import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDrivingData } from "../../services/apiDrivingData";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useDrivingHistory(isDashboard = false) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //PAGINATION
  const pageSize = Number(searchParams.get("pageSize")) || PAGE_SIZE;
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //SORTING
  const sortDefault = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortDefault.split("-");
  const sortBy = { field, direction };

  //FILTERING
  const filterYear = searchParams.get("year");
  const filterMonth = searchParams.get("month");
  const filterDay = searchParams.get("day");

  const {
    isLoading,
    data: { data: drivingData, count = 0 } = {},
    error,
  } = useQuery({
    queryKey: [
      "drivingData",
      page,
      sortBy,
      pageSize,
      filterYear,
      filterMonth,
      filterDay,
      isDashboard,
    ],
    queryFn: () =>
      getDrivingData({
        page,
        sortBy,
        pageSize,
        filterYear,
        filterMonth,
        filterDay,
        isDashboard,
      }),
  });

  const { data: { data: allDates } = {} } = useQuery({
    queryKey: [
      "drivingData",
      "dates",
      filterYear,
      filterMonth,
      filterDay,
      isDashboard,
    ],
    queryFn: () =>
      getDrivingData({
        dates: true,
        filterYear,
        filterMonth,
        filterDay,
        isDashboard,
      }),
  });

  //PRE-FETCHING PAGES
  const pageCount = Math.ceil(count / pageSize);

  // Next page
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [
        "drivingData",
        page + 1,
        sortBy,
        pageSize,
        filterYear,
        filterMonth,
        filterDay,
        isDashboard,
      ],
      queryFn: () =>
        getDrivingData({
          page: page + 1,
          sortBy,
          pageSize,
          filterYear,
          filterMonth,
          filterDay,
          isDashboard,
        }),
    });

  // Previous page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [
        "drivingData",
        page - 1,
        sortBy,
        pageSize,
        filterYear,
        filterMonth,
        filterDay,
        isDashboard,
      ],
      queryFn: () =>
        getDrivingData({
          page: page - 1,
          sortBy,
          pageSize,
          filterYear,
          filterMonth,
          filterDay,
          isDashboard,
        }),
    });

  return { isLoading, drivingData, allDates, error, count };
}
