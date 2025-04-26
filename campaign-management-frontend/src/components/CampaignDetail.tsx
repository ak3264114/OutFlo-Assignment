import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Campaign } from '../types/Campaign';
import { getCampaignById, deleteCampaign } from '../utils/api';

export const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getCampaignById(id);
        setCampaign(data);
      } catch (err) {
        setError('Failed to fetch campaign details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        await deleteCampaign(id);
        navigate('/campaigns');
      } catch (err) {
        setError('Failed to delete campaign');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="flex justify-center p-8">Loading campaign details...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!campaign) return <div className="text-gray-500 p-4">Campaign not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
            <div className="flex space-x-2">
              <Link 
                to={`/campaigns/${id}/edit`}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
          <span className={`mt-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            campaign.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {campaign.status}
          </span>
        </div>
        
        <div className="px-6 py-4">
          <p className="text-gray-700 mb-4">{campaign.description}</p>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Leads ({campaign.leads.length})</h2>
            {campaign.leads.length > 0 ? (
              <ul className="space-y-1 list-disc list-inside text-gray-600">
                {campaign.leads.map((lead, index) => (
                  <li key={index} className="truncate">
                    <a href={lead} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {lead}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No leads added yet</p>
            )}
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Account IDs</h2>
            {campaign.accountIDs.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {campaign.accountIDs.map((id, index) => (
                  <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {id}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No account IDs added</p>
            )}
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <Link 
            to="/campaigns"
            className="text-indigo-600 hover:text-indigo-900 font-medium"
          >
            ← Back to Campaigns
          </Link>
        </div>
      </div>
    </div>
  );
};
