import type { RootState } from '../../app/store';

export const selectAllItems = (state: RootState) => state.items.entities;
export const selectStatus = (state: RootState) => state.items.status;
export const selectError = (state: RootState) => state.items.error;
export const selectActiveTab = (state: RootState) => state.items.activeTab;
export const selectSelectedGuid = (state: RootState) => state.items.selectedGuid;

export const selectSelectedItem = (state: RootState) => {
  const guid = state.items.selectedGuid;
  return guid ? state.items.entities.find((item) => item.guid === guid) ?? null : null;
};
