import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import type { Item } from '../types/item';
import { ImageTab } from './ImageTab';
import { PropertiesTab } from './PropertiesTab';

export type DetailsTab = 'properties' | 'image';

interface ItemDetailsProps {
  item: Item | null;
  activeTab: DetailsTab;
  onTabChange: (tab: DetailsTab) => void;
}

export function ItemDetails({ item, activeTab, onTabChange }: ItemDetailsProps) {
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
        onChange={(_, value: DetailsTab) => onTabChange(value)}
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
