import { useEffect, useState } from 'react';
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
import { fetchItems } from './api/itemsApi';
import { ItemDetails, type DetailsTab } from './components/ItemDetails';
import { ItemsTable } from './components/ItemsTable';
import type { Item } from './types/item';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [selectedGuid, setSelectedGuid] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<DetailsTab>('properties');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    fetchItems()
      .then((data) => {
        if (cancelled) return;
        setItems(data);
        setStatus('succeeded');
        if (data.length > 0) setSelectedGuid(data[0].guid);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message);
        setStatus('failed');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedItem = selectedGuid
    ? items.find((item) => item.guid === selectedGuid) ?? null
    : null;

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
              <ItemsTable
                items={items}
                selectedGuid={selectedGuid}
                onSelect={setSelectedGuid}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <ItemDetails
                item={selectedItem}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
