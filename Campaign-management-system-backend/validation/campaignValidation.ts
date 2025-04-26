import Joi from 'joi';

export const campaignSchema = {
    body: Joi.object({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(5).required(),
        status: Joi.string().valid('ACTIVE', 'INACTIVE', 'DELETED').default('ACTIVE'),
        leads: Joi.array().items(Joi.string().uri()).default([]),
        accountIDs: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).default([]),
    })
};
