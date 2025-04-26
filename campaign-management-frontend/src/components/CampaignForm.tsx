import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Campaign } from '../types/Campaign';
import { createCampaign, getCampaignById, updateCampaign } from '../utils/api';

interface CampaignFormProps {
  isEditing?: boolean;
}

export const CampaignForm: React.FC<CampaignFormProps> = ({ isEditing = false }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Campaign>({
    name: '',
    description: '',
    status: 'active',
    leads: [],
    accountIDs: []
  });
  
  // For handling multiple inputs in lead and accountID fields
  const [leadInput, setLeadInput] = useState('');
  const [accountIdInput, setAccountIdInput] = useState('');

  useEffect(() => {
    const fetchCampaign = async () => {
      if (isEditing && id) {
        try {
          setLoading(true);
          const data = await getCampaignById(id);
          setFormValues(data);
        } catch (err) {
          setError('Failed to fetch campaign details');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCampaign();
  }, [isEditing, id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const addLead = () => {
    if (leadInput.trim()) {
      setFormValues({
        ...formValues,
        leads: [...formValues.leads, leadInput.trim()]
      });
      setLeadInput('');
    }
  };

  const removeLead = (index: number) => {
    const updatedLeads = [...formValues.leads];
    updatedLeads.splice(index, 1);
    setFormValues({ ...formValues, leads: updatedLeads });
  };

  const addAccountId = () => {
    if (accountIdInput.trim()) {
      setFormValues({
        ...formValues,
        accountIDs: [...formValues.accountIDs, accountIdInput.trim()]
      });
      setAccountIdInput('');
    }
  };

  const removeAccountId = (index: number) => {
    const updatedAccountIds = [...formValues.accountIDs];
    updatedAccountIds.splice(index, 1);
    setFormValues({ ...formValues, accountIDs: updatedAccountIds });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing && id) {
        await updateCampaign(id, formValues);
      } else {
        await createCampaign(formValues);
      }
      navigate('/campaigns');
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} campaign`);
      console.error(err);
    }
  };

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Campaign' : 'Create New Campaign'}
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-4">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formValues.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Leads
            </label>
            <div className="flex">
              <input
                type="text"
                value={leadInput}
                onChange={(e) => setLeadInput(e.target.value)}
                placeholder="https://linkedin.com/in/profile"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
              <button
                type="button"
                onClick={addLead}
                className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600"
              >
                Add
              </button>
            </div>
            
            {formValues.leads.length > 0 && (
              <ul className="mt-2 space-y-1">
                {formValues.leads.map((lead, index) => (
                  <li key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                    <span className="text-sm text-gray-700 truncate">{lead}</span>
                    <button
                      type="button"
                      onClick={() => removeLead(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account IDs
            </label>
            <div className="flex">
              <input
                type="text"
                value={accountIdInput}
                onChange={(e) => setAccountIdInput(e.target.value)}
                placeholder="Account ID"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
              <button
                type="button"
                onClick={addAccountId}
                className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600"
              >
                Add
              </button>
            </div>
            
            {formValues.accountIDs.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formValues.accountIDs.map((id, index) => (
                  <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded">
                    <span className="text-sm text-gray-700 mr-2">{id}</span>
                    <button
                      type="button"
                      onClick={() => removeAccountId(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/campaigns')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {isEditing ? 'Update Campaign' : 'Create Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};