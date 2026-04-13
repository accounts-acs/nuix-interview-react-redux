import { Box, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import type { Item } from '../types/item';
import { formatValue } from '../utils/formatValue';

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
        {entries.map(([key, value]) => (
          <TableRow key={key}>
            <TableCell component="th" scope="row">
              {key}
            </TableCell>
            <TableCell
              align={typeof value === 'number' ? 'right' : 'left'}
              sx={{ width: '1%', whiteSpace: 'nowrap' }}
            >
              {formatValue(key, value)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
