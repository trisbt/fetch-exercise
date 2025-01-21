import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchDogs, getDogDetails } from "../api/dogs";
import DogCard from "../components/DogCard";
import SortDropdown from "../components/SortDropdown";
import FilterDropdown from "../components/FilterDropdown";
import Pagination from "../components/Pagination";
import { Box, CircularProgress, Alert } from "@mui/material";
import backgroundImage from "../assets/footer_75.webp";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const SearchPage = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState<{ next?: string; prev?: string }>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalResults, setTotalResults] = useState<number | null>(null);

  const filters = {
    breeds: searchParams.getAll("breeds"),
    ageMin: searchParams.get("ageMin") ? Number(searchParams.get("ageMin")) : undefined,
    ageMax: searchParams.get("ageMax") ? Number(searchParams.get("ageMax")) : undefined,
    sort: searchParams.get("sort") || "breed:asc",
    from: searchParams.get("from") || undefined,
  };

  useEffect(() => {
    const fetchDogs = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await searchDogs(filters);

        if (!data.resultIds || data.resultIds.length === 0) {
          console.error("No results found");
          setDogs([]);
          setError("No dogs found.");
          setPagination({ next: undefined, prev: undefined });
          setTotalResults(0);
          return;
        }

        setTotalResults(data.total); // Store total results count

        setPagination({
          next: data.resultIds.length === 25 && data.total > 25 ? data.next?.split("from=")[1] : undefined,
          prev: data.prev ? data.prev.split("from=")[1] : undefined,
        });

        const dogDetails = await getDogDetails(data.resultIds);
        setDogs(dogDetails);
      } catch (err) {
        console.error("Error fetching dogs:", err);
        setError("Could not load dogs.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDogs();
  }, [searchParams]);


  const updateSearchParams = (newFilters: Record<string, string | string[] | undefined>) => {
    const updatedParams = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      updatedParams.delete(key);

      if (Array.isArray(value)) {
        value.forEach((v) => updatedParams.append(key, v));
      } else if (value) {
        updatedParams.set(key, value);
      }
    });

    setSearchParams(updatedParams);
  };


  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && pagination.next && totalResults !== null && dogs.length < totalResults) {
      setSearchParams((prev) => {
        const updatedParams = new URLSearchParams(prev);
        updatedParams.set("from", pagination.next as string);
        return updatedParams;
      });
    } else if (direction === "prev" && pagination.prev) {
      setSearchParams((prev) => {
        const updatedParams = new URLSearchParams(prev);
        updatedParams.set("from", pagination.prev as string);
        return updatedParams;
      });
    }
  };

  return (
    <Box
      sx={{
        padding: "80px 20px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1} sx={{ width: "100%", marginBottom: 2 }}>
        <SortDropdown
          onSortChange={(sort) => updateSearchParams({ sort, from: undefined })}
          selectedSort={filters.sort || "breed:asc"}
        />
        <FilterDropdown
          onFilterChange={(newFilters) =>
            updateSearchParams({
              ...newFilters,
              ageMin: newFilters.ageMin !== undefined ? String(newFilters.ageMin) : undefined,
              ageMax: newFilters.ageMax !== undefined ? String(newFilters.ageMax) : undefined,
              from: undefined,
            })
          }
          selectedBreeds={filters.breeds}
          selectedAgeMin={filters.ageMin}
          selectedAgeMax={filters.ageMax}
        />
      </Box>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginY: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", width: "100%" }}>
          {dogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </Box>
      )}

      <Box sx={{ marginTop: "20px" }}>
        <Pagination
          onPageChange={handlePageChange}
          hasNext={!!pagination.next}
          hasPrev={!!pagination.prev}
          totalResults={totalResults}
        />
      </Box>
    </Box>
  );
};

export default SearchPage;
