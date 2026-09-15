/**
 * District & State Service
 * Provides live API fetching from backend `/api/advisory/districts` with fallback to local master directory.
 */
import api from './api';
import { stateDistrictsData } from '../data/districtDirectory';

export const fetchLiveStatesAndDistricts = async () => {
  try {
    const res = await api.get('/advisory/districts');
    if (res.data && res.data.directory) {
      return res.data;
    }
  } catch (err) {
    console.debug('Using verified local Local Government Directory (LGD)...');
  }
  return {
    states: stateDistrictsData.map(s => s.state),
    directory: stateDistrictsData.reduce((acc, s) => {
      acc[s.state] = s.districts.map(d => d.name);
      return acc;
    }, {})
  };
};

export const fetchDistrictsForState = async (stateName) => {
  if (!stateName) return [];
  try {
    const res = await api.get('/advisory/districts', { params: { state: stateName } });
    if (res.data && Array.isArray(res.data.districts) && res.data.districts.length > 0) {
      return res.data.districts;
    }
  } catch (err) {
    // Fallback to local
  }
  const match = stateDistrictsData.find(s => s.state.toLowerCase() === stateName.toLowerCase());
  return match ? match.districts.map(d => d.name) : [];
};
