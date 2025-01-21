const BASE_URL = "https://frontend-take-home-service.fetch.com";

interface DogFilters {
  from?: string;
  breeds?: string[];
  ageMin?: number;
  ageMax?: number;
  zipCodes?: string[];
  sort?: string;
}

// Get all dog breeds
export const getBreeds = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/dogs/breeds`, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to fetch breeds.");
  return response.json();
};

// Searches for dogs with optional filters (breed, zip, age range, sorting, pagination)
export const searchDogs = async (filters: DogFilters) => {
  const queryParams = new URLSearchParams();

  if (filters.breeds && filters.breeds.length > 0) {
    filters.breeds.forEach((breed) => queryParams.append("breeds", breed));
  }

  if (filters.ageMin !== undefined) queryParams.append("ageMin", String(filters.ageMin));
  if (filters.ageMax !== undefined) queryParams.append("ageMax", String(filters.ageMax));
  if (filters.sort) queryParams.append("sort", filters.sort);
  if (filters.from) queryParams.append("from", filters.from);

  const apiUrl = `https://frontend-take-home-service.fetch.com/dogs/search?${queryParams.toString()}`;
  
  const response = await fetch(apiUrl, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dogs.");
  }

  return response.json();
};

// Fetches details for a list of dog IDs
export const getDogDetails = async (dogIds: string[]) => {
  const response = await fetch(`${BASE_URL}/dogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dogIds),
  });

  if (!response.ok) throw new Error("Failed to fetch dog details.");
  return response.json();
};

// Fetches the best match from selected favorite dogs
export const matchDogs = async (favoriteDogIds: string[]): Promise<{ match: string }> => {
  const response = await fetch(`${BASE_URL}/dogs/match`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(favoriteDogIds),
  });

  if (!response.ok) throw new Error("Failed to fetch dog match.");
  return response.json();
};
