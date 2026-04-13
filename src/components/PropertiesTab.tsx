import { Box, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import type { Item } from '../types/item';
import { classifyValue, formatValue } from '../utils/formatValue';

interface PropertiesTabProps {
  item: Item;
}

export function PropertiesTab({ item }: PropertiesTabProps) {
  const entries = Object.entries(item.properties);

  if (entries.length === 0) {
    return (
      <Box p={2}>
        <Typography color="text.secondary">No properties available.</Typography>
      </Box>
    );
  }

  return (
    <Table size="small" aria-label="properties">
      <TableBody>
        {entries.map(([key, value]) => {
          const kind = classifyValue(key, value);
          const align = kind === 'number' || kind === 'date' ? 'right' : 'left';
          return (
            <TableRow key={key}>
              <TableCell component="th" scope="row" sx={{ width: '40%' }}>
                {key}
              </TableCell>
              <TableCell align={align}>{formatValue(key, value)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
