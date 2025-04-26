import React, { useState } from 'react';
import { LinkedInProfile } from '../types/LinkedInProfile';
import { generateLinkedInMessage } from '../utils/api';


export const LinkedInMessageGenerator: React.FC = () => {
    const [profile, setProfile] = useState<LinkedInProfile>({
        name: '',
        job_title: '',
        company: '',
        location: '',
        summary: '',
    });
    const [generatedMessage, setGeneratedMessage] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const generateMessage = async () => {
        try {
            setIsGenerating(true);
            setError(null);
            const response = await generateLinkedInMessage(profile);

            console.log("Generated LinkedIn Message:\n", response.message);
            setGeneratedMessage(response.message ?? '');
        } catch (err) {
            setError('Failed to generate message. Please try again.');
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    };

    const resetForm = () => {
        setProfile({
            name: '',
            job_title: '',
            company: '',
            location: '',
            summary: '',
        });
        setGeneratedMessage('');
        setError(null);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">LinkedIn Message Generator</h2>
                    <p className="text-blue-100">Create personalized outreach messages based on LinkedIn profiles</p>
                </div>

                <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">LinkedIn Profile Data</h3>

                            {['name', 'job_title', 'company', 'location'].map((field) => (
                                <div key={field}>
                                    <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                                        {field.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                    </label>
                                    <input
                                        type="text"
                                        id={field}
                                        name={field}
                                        value={(profile as any)[field]}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                                    />
                                </div>
                            ))}

                            <div>
                                <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Profile Summary</label>
                                <textarea
                                    id="summary"
                                    name="summary"
                                    rows={4}
                                    value={profile.summary}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                                />
                            </div>



     
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={generateMessage}
                                    disabled={isGenerating}
                                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {isGenerating ? 'Generating...' : 'Generate Message'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>

                   
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Generated Message</h3>

                            {error && (
                                <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md border border-red-200">
                                    {error}
                                </div>
                            )}

                            {generatedMessage ? (
                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                                        <div className="text-sm text-gray-500 mb-2">Preview:</div>
                                        <div className="whitespace-pre-wrap">{generatedMessage}</div>
                                    </div>

                                    <textarea
                                        value={generatedMessage}
                                        onChange={(e) => setGeneratedMessage(e.target.value)}
                                        rows={10}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                                    />

                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => navigator.clipboard.writeText(generatedMessage)}
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Copy to Clipboard
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-8 rounded-md border border-dashed border-gray-300 text-center text-gray-500">
                                    No message generated yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
