import { Box } from '@mui/material';
import { buildImageUrl } from '../api/itemsApi';

interface ImageTabProps {
  guid: string;
}

export function ImageTab({ guid }: ImageTabProps) {
  return (
    <Box p={2} display="flex" justifyContent="center" alignItems="center">
      <Box
        component="img"
        src={buildImageUrl(guid)}
        alt={`Image for ${guid}`}
        sx={{ maxWidth: '100%', maxHeight: 320, objectFit: 'contain', borderRadius: '10px' }}
      />
    </Box>
  );
}
