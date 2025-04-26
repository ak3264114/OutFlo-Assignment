import mongoose, { Document, Schema } from 'mongoose';

export interface ICampaign extends Document {
    name: string;
    description: string;
    status: 'ACTIVE' | 'INACTIVE' | 'DELETED';
    leads: string[];
    accountIDs: mongoose.Types.ObjectId[];
}

const campaignSchema = new Schema<ICampaign>({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
        default: 'ACTIVE',
    },
    leads: {
        type: [String],
        default: [],
    },
    accountIDs: {
        type: [String],
        default: [],
    },
}, { timestamps: true });

const Campaign = mongoose.model<ICampaign>('Campaign', campaignSchema);

export default Campaign;
