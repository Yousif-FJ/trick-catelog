'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [csvContent, setCsvContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/fetch-csv');
        const result = await response.json();

        if (!response.ok) {
          setError(result.error || 'Failed to fetch CSV');
          return;
        }

        setCsvContent(result.data);
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching CSV:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCsvData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>CSV File Content</h1>
      
      {loading && <p>Loading CSV file...</p>}
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {csvContent && (
        <div>
          <h2>Raw CSV Content:</h2>
          <pre style={{ 
            padding: '10px', 
            borderRadius: '4px',
            overflow: 'auto',
            maxHeight: '500px'
          }}>
            {csvContent}
          </pre>
        </div>
      )}
    </div>
  );
}
