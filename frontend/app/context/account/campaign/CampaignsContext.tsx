import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

interface Campaign {
  id: number;
  title: string;
  description: string;
  goal: number;
  raised: number;
  body: string;
}

interface CampaignState {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  fetchCampaigns: () => void;
}

const CampaignContext = createContext<CampaignState | undefined>(undefined);

export const CampaignProvider = ({ children }: { children: ReactNode }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = useCallback((): void => {
    setLoading(true);
    setError(null);
    // Use setTimeout to delay the fetch
    setTimeout(async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch campaigns');
        }
        const data = await response.json();
        setCampaigns(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching campaigns');
      } finally {
        setLoading(false);
      }
    }, 2000);
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchCampaigns, 2000);
    return () => clearTimeout(timer);
  }, [fetchCampaigns]);

  // Call fetchCampaigns only on component mount
  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const contextValue = useMemo(
    () => ({ campaigns, loading, error, fetchCampaigns }),
    [campaigns, loading, error, fetchCampaigns],
  );

  return (
    <CampaignContext.Provider value={contextValue}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaignContext = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error(
      'useCampaignContext must be used within a CampaignProvider',
    );
  }
  return context;
};