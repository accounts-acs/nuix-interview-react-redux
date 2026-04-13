import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setActiveTab } from '../features/items/itemsSlice';
import { selectActiveTab, selectSelectedItem } from '../features/items/selectors';
import type { DetailsTab } from '../features/items/itemsSlice';
import { ImageTab } from './ImageTab';
import { PropertiesTab } from './PropertiesTab';

export function ItemDetails() {
  const dispatch = useAppDispatch();
  const item = useAppSelector(selectSelectedItem);
  const activeTab = useAppSelector(selectActiveTab);

  if (!item) {
    return (
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography color="text.secondary">Select an item to see details.</Typography>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined">
      <Tabs
        value={activeTab}
        onChange={(_, value: DetailsTab) => dispatch(setActiveTab(value))}
        aria-label="item details tabs"
      >
        <Tab label="Properties" value="properties" />
        <Tab label="Image" value="image" />
      </Tabs>
      <Box>
        {activeTab === 'properties' ? (
          <PropertiesTab item={item} />
        ) : (
          <ImageTab guid={item.guid} />
        )}
      </Box>
    </Paper>
  );
}
