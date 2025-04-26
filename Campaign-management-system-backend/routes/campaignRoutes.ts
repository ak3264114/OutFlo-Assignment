import express from 'express';
import {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
} from '../controllers/campaignController';

const router = express.Router();

router.post('/campaigns', createCampaign);
router.get('/campaigns', getAllCampaigns);
router.get('/campaigns/:id', getCampaignById);
router.put('/campaigns/:id', updateCampaign);
router.delete('/campaigns/:id', deleteCampaign);

export default router;
