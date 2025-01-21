import { useState, useEffect } from "react";
import { matchDogs, getDogDetails } from "../api/dogs";
import { useFavorites } from "../context/FavoritesContext";
import DogCard from "../components/DogCard";
import styles from "./MatchPage.module.css";
import {Box, CircularProgress, Alert} from "@mui/material";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const MatchPage = () => {
  const { favorites } = useFavorites();
  const [matchedDogs, setMatchedDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const findMatch = async () => {
      if (favorites.length === 0) {
        setError("Select at least one favorite dog to find a match.");
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const { match } = await matchDogs(favorites);
        const dogDetails = await getDogDetails([match]);
        
        setMatchedDogs(dogDetails);
      } catch (err) {
        console.error("🚨 Error finding match:", err);
        setError("Could not generate a match. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    findMatch();
  }, [favorites]);


  return (
    <div className={styles.container}>
      <h1>Your next dog awaits! Adopt today!</h1>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginY: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      ) : (
        <div className={styles.results}>
          {matchedDogs.length > 0 ? (
            matchedDogs.map((dog) => <DogCard key={dog.id} dog={dog} />)
          ) : (
            <p>No matches found.</p>
          )}
        </div>
      )}

    </div>
  );
};

export default MatchPage;
