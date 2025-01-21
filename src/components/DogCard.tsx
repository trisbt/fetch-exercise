import { useFavorites } from "../context/FavoritesContext";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

interface DogProps {
  dog: {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
  };
}

const DogCard = ({ dog }: DogProps) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(dog.id);

  return (
    <Card sx={{
      width: 200,
    }}>
      <CardMedia
        component="img"
        src={dog.img}
        alt={dog.name}
        sx={{
          width: 200,
          height: 140,
          objectFit: "cover",
        }}
      >
      </CardMedia>
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography gutterBottom variant="h5" component="div">
          {dog.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Breed: {dog.breed}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Age: {dog.age}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Location: {dog.zip_code}
        </Typography>
        <IconButton
          aria-label="add to favorites"
          onClick={() => toggleFavorite(dog.id)}
          sx={{
            color: isFavorite ? 'red' : 'gray',
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default DogCard;
