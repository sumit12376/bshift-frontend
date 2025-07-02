'use client';

import React from 'react';
import { Box, Button, FormControl, TextField, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getDefaultStore, useAtomValue } from 'jotai';
import { openNewRestaurantModalAtom } from '../../state/modals-drawers';
import { queryParamsAtom } from '../../state/filter';

function HeaderFilter() {
  const store = getDefaultStore();
  const queryParams = useAtomValue(queryParamsAtom);

  return (
    <Box sx={{ display: 'flex', gap: 1.5, ml: 'auto', mt:5 }}>


      <FormControl sx={{ minWidth: 250 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={queryParams.filter.searchQuery}
          onChange={(e) => {
            store.set(queryParamsAtom, {
              ...queryParams,
              filter: {
                ...queryParams.filter,
                searchQuery: e.target.value,
              },
            });
          }}
        />
      </FormControl>
<Button
  variant="contained"
  startIcon={<AddIcon />}
  sx={{ minWidth: 155, ml: 20 }}
  onClick={() => store.set(openNewRestaurantModalAtom, true)}
>
  New Restaurant
</Button>

     
    </Box>
  );
}

export default HeaderFilter;
