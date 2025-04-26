import { Request, Response, NextFunction } from 'express';
import Campaign from '../model/campaign';

export const createCampaign = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        if (!req.body) {
            res.status(400).json({ error: true, message: 'Request body is required.' });
            return;
        } 
        const { name, description, leads, accountIDs } = req.body;
        if (!name || typeof name !== 'string') {
            res.status(400).json({ error: true, message: 'Name is required and must be a string.' });
            return;
        }

        if (!description || typeof description !== 'string') {
            res.status(400).json({ error: true, message: 'Description is required and must be a string.' });
            return;
        }

        if (!Array.isArray(leads) || leads.length === 0) {
            res.status(400).json({ error: true, message: 'Leads must be a non-empty array.' });
            return;
        }

        if (!Array.isArray(accountIDs) || accountIDs.length === 0) {
            res.status(400).json({ error: true, message: 'AccountIDs must be a non-empty array.' });
            return;
        }

        const campaign = new Campaign({
            name,
            description,
            leads,
            accountIDs,
            status: 'ACTIVE',
        });

        await campaign.save();
        res.status(201).json(campaign);
        return;
    } catch (error) {
        next(error);
    }
};

export const getAllCampaigns = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const campaigns = await Campaign.find({ status: { $ne: 'DELETED' } });
        res.status(200).json(campaigns);
        return;
    } catch (error) {
        next(error);
    }
};

export const getCampaignById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    try {
        const campaign = await Campaign.findOne({ _id: id, status: { $ne: 'DELETED' } });
        if (!campaign) {
            res.status(404).json({ error: true, message: 'Campaign not found' });
            return;
        }
        res.status(200).json(campaign);
        return;
    } catch (error) {
        next(error);
    }
};

export const updateCampaign = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;


    if (!req.body) {
        res.status(400).json({ error: true, message: 'Request body is required.' });
        return;
    }
    const { name, description, leads, accountIDs, status } = req.body;

    try {
        const existingCampaign = await Campaign.findById(id);
        if (!existingCampaign || existingCampaign.status === 'DELETED') {
            res.status(404).json({ error: true, message: 'Campaign not found or has been deleted' });
            return;  
        }

        
        const campaign = await Campaign.findByIdAndUpdate(
            id,
            { name, description, leads, accountIDs, status },
            { new: true, runValidators: true }
        );

        if (!campaign) {
            res.status(404).json({ error: true, message: 'Campaign not found' });
            return;  
        }

        res.status(200).json({error : false, message: 'Campaign updated successfully', campaign});
        return;
    } catch (error) {
        next(error);
    }
};


export const deleteCampaign = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    try {
        const existingCampaign = await Campaign.findById(id);
        if (!existingCampaign) {
            res.status(404).json({ error: true, message: 'Campaign not found' });
            return;
        }

        if (existingCampaign.status === 'DELETED') {
            res.status(400).json({ error: true, message: 'Campaign is already deleted' });
            return;
        }
        const campaign = await Campaign.findByIdAndUpdate(
            id,
            { status: 'DELETED' },
            { new: true }
        );

        res.status(200).json({ error: false, message: 'Campaign deleted successfully' });
    } catch (error) {
        next(error);
    }
};

