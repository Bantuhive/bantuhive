import React from 'react';
import { useCampaignContext } from '../context/account/campaign/CampaignsContext';
import CampaignsLoader from '../loaders/CampaignsLoader';
import { Button } from '../components/button/Button';

export default function Campaigns() {
  const { campaigns, loading, error } = useCampaignContext();

  if (loading) return <CampaignsLoader />;

  if (error) {
    return <p>Error fetching campaigns: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Campaigns
      </h2>
      <p className="text-gray-500 dark:text-neutral-400 mb-4">
        Manage your active and past campaigns.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {campaigns?.map((campaign) => (
          <div
            key={campaign.id}
            className="p-4 bg-white dark:bg-neutral-800 rounded-lg shadow hover:bg-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {campaign.title}
            </h3>
            <p className="text-gray-500 dark:text-neutral-400">
              {campaign.body}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <Button
                className="px-4 py-2 text-green-500 rounded-full"
                variant="secondary"
                size="default"
              >
                Promote
              </Button>
              <span className="text-xs text-red-500 font-semibold">
                Active campaign
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
