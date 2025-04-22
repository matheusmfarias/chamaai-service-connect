
import { useState, useEffect } from 'react';

interface State {
  id: number;
  sigla: string;
  nome: string;
}

interface City {
  id: number;
  nome: string;
}

export function useLocationData() {
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        const data = await response.json();
        setStates(data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar estados');
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  const fetchCities = async (stateId: number) => {
    setCities([]);
    try {
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios?orderBy=nome`);
      const data = await response.json();
      setCities(data);
    } catch (err) {
      setError('Erro ao carregar cidades');
    }
  };

  return { states, cities, loading, error, fetchCities };
}
