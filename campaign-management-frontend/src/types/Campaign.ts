export interface Campaign {
    _id?: string;
    name: string;
    description: string;
    status: 'active' | 'inactive' | 'DELETED';
    leads: string[];
    accountIDs: string[];
  }