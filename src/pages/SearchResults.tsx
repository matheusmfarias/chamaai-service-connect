
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import SearchResultsContainer from '@/components/search/SearchResultsContainer';
import { LoginModalProvider } from '@/components/search/LoginModalProvider';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    setSearchParams(params);
  }, [searchQuery, setSearchParams]);
  
  return (
    <Layout>
      <LoginModalProvider>
        <SearchResultsContainer 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </LoginModalProvider>
    </Layout>
  );
};

export default SearchResults;
