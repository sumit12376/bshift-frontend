'use client';

import React from 'react';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { getDefaultStore, useAtomValue } from 'jotai';
import { queryParamsAtoms } from '../../filter/filter';

function HeaderFilter() {
  const store = getDefaultStore();
  const queryParams = useAtomValue(queryParamsAtoms);

  return (
    <Box sx={{ display: 'flex', gap: 1.5, ml: 'auto' }}>
      <FormControl sx={{ minWidth: 250 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={queryParams.filter.searchQuery}
          onChange={(e) => {
            store.set(queryParamsAtoms, {
              ...queryParams,
              filter: {
                ...queryParams.filter,
                searchQuery: e.target.value,
              },
            });
          }}
        />
      </FormControl>
    </Box>
  );
}

export default HeaderFilter;
