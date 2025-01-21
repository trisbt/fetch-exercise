import { useState, useEffect } from "react";
import { getBreeds } from "../api/dogs";
import {
  Menu,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  ListItemText,
  Divider,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface FilterDropdownProps {
  onFilterChange: (filters: { breeds?: string[]; ageMin?: number; ageMax?: number }) => void;
  selectedBreeds?: string[];
  selectedAgeMin?: number;
  selectedAgeMax?: number;
}

const FilterDropdown = ({ onFilterChange }: FilterDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [selectedAge, setSelectedAge] = useState<{ ageMin: number; ageMax: number } | null>(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const breedList = await getBreeds();
        setBreeds(breedList);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    fetchBreeds();
  }, []);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleBreed = (breed: string) => {
    setSelectedBreeds((prev) =>
      prev.includes(breed) ? prev.filter((b) => b !== breed) : [...prev, breed]
    );
  };

  const applyFilters = () => {
    onFilterChange({
      breeds: selectedBreeds.length > 0 ? selectedBreeds : undefined,
      ageMin: selectedAge ? selectedAge.ageMin : undefined,
      ageMax: selectedAge ? selectedAge.ageMax : undefined,
    });
    handleClose();
  };

  const resetFilters = () => {
    setSelectedBreeds([]); 
    setSelectedAge(null); 
    onFilterChange({ breeds: [], ageMin: undefined, ageMax: undefined }); 
    setTimeout(() => handleClose(), 100); 
  };


  return (
    <>
      <Button
        variant="contained"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleOpen}
      >
        Filter
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Paper sx={{ width: 250, padding: 1, boxShadow: 0, }}>
          <Box>
            <ListItemText primary="Breed" sx={{ fontWeight: "bold", marginBottom: 1 }} />
            <Paper
              sx={{
                maxHeight: 150,
                overflowY: "auto",
                boxShadow: 0,
                padding: 0,
              }}
            >
              {breeds.map((breed) => (
                <MenuItem
                  key={breed}
                  onClick={() => toggleBreed(breed)}
                  sx={{
                    paddingY: 0,
                    minHeight: "32px",
                    marginLeft: "-10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Checkbox
                    checked={selectedBreeds.includes(breed)}
                    sx={{ padding: 0, marginRight: 0.5 }}
                  />
                  <Typography variant="body2">{breed}</Typography>
                </MenuItem>
              ))}
            </Paper>
          </Box>


          <Box>
            <ListItemText primary="Age" sx={{ fontWeight: "bold", marginBottom: 1 }} />
            <Box
              display="grid"
              gridTemplateColumns="1fr 1fr"
              gap={0}
              alignItems="center"
            >
              <FormControlLabel
                control={<Checkbox checked={selectedAge?.ageMin === 0} />}
                label={
                  <Box display="flex" flexDirection="column">
                    <Typography sx={{ fontSize: ".75rem" }}>Puppy</Typography>
                    <Typography sx={{ fontSize: "0.7rem" }}>0-1 years</Typography>
                  </Box>
                }
                onClick={() => setSelectedAge({ ageMin: 0, ageMax: 1 })}
              />
              <FormControlLabel
                control={<Checkbox checked={selectedAge?.ageMin === 2} />}
                label={
                  <Box display="flex" flexDirection="column">
                    <Typography sx={{ fontSize: ".75rem" }}>Young Adult</Typography>
                    <Typography sx={{ fontSize: "0.7rem" }}>2-3 years</Typography>
                  </Box>
                }
                onClick={() => setSelectedAge({ ageMin: 2, ageMax: 3 })}
              />
              <FormControlLabel
                control={<Checkbox checked={selectedAge?.ageMin === 4} />}
                label={
                  <Box display="flex" flexDirection="column">
                    <Typography sx={{ fontSize: ".75rem" }}>Adult</Typography>
                    <Typography sx={{ fontSize: "0.7rem" }}>4-6 years</Typography>
                  </Box>
                }
                onClick={() => setSelectedAge({ ageMin: 4, ageMax: 6 })}
              />
              <FormControlLabel
                control={<Checkbox checked={selectedAge?.ageMin === 7} />}
                label={
                  <Box display="flex" flexDirection="column">
                    <Typography sx={{ fontSize: ".75rem" }}>Senior</Typography>
                    <Typography sx={{ fontSize: "0.7rem" }}>7+ years</Typography>
                  </Box>
                }
                onClick={() => setSelectedAge({ ageMin: 7, ageMax: 20 })}
              />
            </Box>
          </Box>

          <Divider sx={{ marginY: 1 }} />

          <Box display="flex" justifyContent="space-around">
            <Button onClick={resetFilters} color="error">Reset</Button>
            <Button onClick={applyFilters} variant="contained">Apply</Button>
          </Box>
        </Paper>
      </Menu>
    </>
  );
};

export default FilterDropdown;
