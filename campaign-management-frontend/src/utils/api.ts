
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL as string;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllCampaigns = async () => {
  try {
    const response = await api.get('/campaigns');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching campaigns');
  }
};

export const getCampaignById = async (id: string) => {
  try {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching campaign');
  }
};

export const createCampaign = async (data: any) => {
  try {
    const response = await api.post('/campaigns', data);
    return response.data;
  } catch (error) {
    throw new Error('Error creating campaign');
  }
};

export const updateCampaign = async (id: string, data: any) => {
  try {
    const response = await api.put(`/campaigns/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Error updating campaign');
  }
};

export const deleteCampaign = async (id: string) => {
  try {
    const response = await api.delete(`/campaigns/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting campaign');
  }
};
