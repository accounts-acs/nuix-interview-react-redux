import { useEffect } from 'react';
import {
  Alert,
  AppBar,
  Box,
  CircularProgress,
  Container,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loadItems } from './features/items/itemsSlice';
import { selectError, selectStatus } from './features/items/selectors';
import { ItemDetails } from './components/ItemDetails';
import { ItemsTable } from './components/ItemsTable';

export default function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadItems());
    }
  }, [dispatch, status]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6">Nuix Items</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {status === 'loading' && (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        )}
        {status === 'failed' && error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {status === 'succeeded' && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <ItemsTable />
            </Grid>
            <Grid item xs={12} md={5}>
              <ItemDetails />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
