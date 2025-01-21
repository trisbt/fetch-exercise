import { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface SortDropdownProps {
    onSortChange: (sort: string) => void;
    selectedSort?: string;
  }
  

const SortDropdown = ({ onSortChange }: SortDropdownProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSortChange = (value: string) => {
        onSortChange(value);
        handleClose();
    };

    return (
        <>
            <Button
                variant="contained"
                endIcon={<ArrowDropDownIcon />}
                onClick={handleOpen}
            >
                Sort
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={isOpen}
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
                <MenuItem onClick={() => handleSortChange("breed:asc")}>Breed (A-Z)</MenuItem>
                <MenuItem onClick={() => handleSortChange("breed:desc")}>Breed (Z-A)</MenuItem>
                <MenuItem onClick={() => handleSortChange("name:asc")}>Name (A-Z)</MenuItem>
                <MenuItem onClick={() => handleSortChange("name:desc")}>Name (Z-A)</MenuItem>
                <MenuItem onClick={() => handleSortChange("age:asc")}>Age (Youngest First)</MenuItem>
                <MenuItem onClick={() => handleSortChange("age:desc")}>Age (Oldest First)</MenuItem>
            </Menu>
        </>
    );
};

export default SortDropdown;
