import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import type { Item } from '../types/item';

interface ItemsTableProps {
  items: Item[];
  selectedGuid: string | null;
  onSelect: (guid: string) => void;
}

export function ItemsTable({ items, selectedGuid, onSelect }: ItemsTableProps) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small" aria-label="items">
        <TableHead>
          <TableRow>
            <TableCell>GUID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Path</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.guid}
              hover
              selected={item.guid === selectedGuid}
              onClick={() => onSelect(item.guid)}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell>{item.guid}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.path.join('/')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
