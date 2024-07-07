// components/SearchField.js
import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchField = () => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
            width: "100%",
          borderRadius: '24px', // Adjust border radius as needed
          backgroundColor: '#808080', // Telegram-like background color
          '& fieldset': {
            border: 'none',
          },
          '&:hover fieldset': {
            border: 'none',
          },
          '&.Mui-focused fieldset': {
            border: 'none',
          },
        },
        '& .MuiInputBase-input': {
          padding: '10px 14px', // Adjust padding as needed
        },
      }}
    />
  );
};

export default SearchField;
