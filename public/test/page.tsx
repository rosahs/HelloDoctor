'use client';

import { useState, useEffect } from 'react';

export default function TestPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/doctors')
      .then(res => res.json())
      .then(setData)
      .catch(setError);
  }, []);

  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  if (!data) return <div>Loading...</div>;

  return <div>API Response: {JSON.stringify(data)}</div>;
}