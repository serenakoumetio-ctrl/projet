import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000/api';

const useContent = (section, defaultContent) => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${API_BASE}/content/${section}`);
        const result = await response.json();
        
        if (result.success) {
          setContent({ ...defaultContent, ...result.data });
        } else {
          setContent(defaultContent);
        }
      } catch (error) {
        console.error('Erreur:', error);
        setContent(defaultContent);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [section, defaultContent]);

  return { content, loading };
};

export default useContent;