import supabase from "./supabase";

export async function getDrivingData({
  page,
  sortBy,
  pageSize,
  dates,
  filterYear,
  filterMonth,
  filterDay,
  isDashboard,
}) {
  let query = supabase.from("history").select("*", { count: "exact" });

  //FILTERING
  if (filterYear) {
    const yearStart = `${filterYear}-01-01`;
    const yearEnd = `${Number(filterYear) + 1}-01-01`;
    query = query.gte("startDate", yearStart).lt("startDate", yearEnd);
  }

  if (filterYear && filterMonth) {
    const month = Number(filterMonth);
    const year = Number(filterYear);
    const nextMonth = String(month + 1).padStart(2, "0");
    const monthStart = `${filterYear}-${filterMonth}-01`;
    const monthEnd =
      month < 12 ? `${filterYear}-${nextMonth}-01` : `${year + 1}-01-01`;
    query = query.gte("startDate", monthStart).lt("startDate", monthEnd);
  }

  if (filterYear && filterMonth && filterDay) {
    const chosenDate = `${filterYear}-${filterMonth}-${filterDay}`;
    query = query.eq("startDate", chosenDate);
  }

  //SORTING
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

    query = query.order("id", {
      ascending: sortBy.direction === "asc",
    });
  }

  //PAGINATION
  if (page && isDashboard === false) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);
  }

  //DATA FOR DATES
  // if (dates) {
  //   query = supabase.from("history").select("startDate");
  // }

  if (dates) {
    query = supabase.from("history").select("startDate");

    if (filterYear) {
      const yearStart = `${filterYear}-01-01`;
      const yearEnd = `${Number(filterYear) + 1}-01-01`;
      query = query.gte("startDate", yearStart).lt("startDate", yearEnd);
    }

    if (filterYear && filterMonth) {
      const month = Number(filterMonth);
      const year = Number(filterYear);
      const nextMonth = String(month + 1).padStart(2, "0");
      const monthStart = `${filterYear}-${filterMonth}-01`;
      const monthEnd =
        month < 12 ? `${filterYear}-${nextMonth}-01` : `${year + 1}-01-01`;
      query = query.gte("startDate", monthStart).lt("startDate", monthEnd);
    }
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Driving data could not be fetched");
  }

  return { data, error, count };
}

export async function deleteDrivingData(id, userId) {
  if (!id) {
    const { data, error } = await supabase
      .from("history")
      .delete()
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      throw new Error("All driving data could not be deleted");
    }

    return data;
  }

  const { data, error } = await supabase.from("history").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Driving data could not be deleted");
  }

  return data;
}

export async function updateDrivingRoadType(id, roadType) {
  const { data, error } = await supabase
    .from("history")
    .update({ roadType })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Road type could not be updated");
  }

  return data;
}

export async function updateDrivingData(id, fields) {
  const { data, error } = await supabase
    .from("history")
    .update(fields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Could not update driving data");
  }

  return data;
}

export async function createBulkDrivingData(newDrivingDataArray) {
  const { data, error } = await supabase
    .from("history")
    .insert(newDrivingDataArray)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Bulk driving data could not be created");
  }

  return data;
}
