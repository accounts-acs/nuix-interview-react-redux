import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectItem } from '../features/items/itemsSlice';
import {
  selectAllItems,
  selectSelectedGuid,
} from '../features/items/selectors';

export function ItemsTable() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectAllItems);
  const selectedGuid = useAppSelector(selectSelectedGuid);

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
              onClick={() => dispatch(selectItem(item.guid))}
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
