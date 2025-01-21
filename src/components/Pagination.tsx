import { Button, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface PaginationProps {
  onPageChange: (direction: "next" | "prev") => void;
  hasNext: boolean;
  hasPrev: boolean;
}

interface PaginationProps {
  onPageChange: (direction: "next" | "prev") => void;
  hasNext: boolean;
  hasPrev: boolean;
  totalResults: number | null;
}

const Pagination = ({ onPageChange, hasNext, hasPrev, totalResults }: PaginationProps) => {
  return (
    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIcon />}
        onClick={() => onPageChange("prev")}
        disabled={!hasPrev}
      >
        Prev
      </Button>

      <Button
        variant="contained"
        color="primary"
        endIcon={<ArrowForwardIcon />}
        onClick={() => onPageChange("next")}
        disabled={!hasNext || totalResults === 0}
      >
        Next
      </Button>
    </Stack>
  );
};

export default Pagination;
