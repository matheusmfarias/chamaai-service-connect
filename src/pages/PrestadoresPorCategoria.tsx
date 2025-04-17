import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useServiceProviders, ServiceProvider } from "@/hooks/useServiceProviders";
import { Link } from "react-router-dom";

const PrestadoresPorCategoria = () => {
  const { categoria } = useParams<{ categoria: string }>();
  const { providers, isLoading, error } = useServiceProviders(categoria);
  const [categoryName, setCategoryName] = useState("");
  
  useEffect(() => {
    // Map category IDs to readable names
    const categoryNames: Record<string, string> = {
      "faxina": "Faxina",
      "pintura": "Pintura",
      "eletrica": "Elétrica",
      "hidraulica": "Hidráulica",
      "jardinagem": "Jardinagem",
      "montagem-moveis": "Montagem de Móveis"
    };
    
    setCategoryName(categoryNames[categoria || ""] || categoria || "");
  }, [categoria]);

  return (
    <Layout>
      <div className="container-custom py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Prestadores de {categoryName}
            </h1>
            <p className="text-gray-600">
              Encontre os melhores profissionais para o seu serviço
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="hidden sm:inline-flex"
          >
            Voltar
          </Button>
        </div>

        <div className="md:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full"
          >
            Voltar para categorias
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <p>Carregando prestadores...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            <p>Erro ao carregar prestadores. Tente novamente.</p>
          </div>
        ) : providers.length === 0 ? (
          <div className="text-center py-10">
            <p>Nenhum prestador encontrado para esta categoria.</p>
            <Button
              variant="default"
              className="mt-4 bg-chamaai-blue hover:bg-chamaai-lightblue"
              onClick={() => window.history.back()}
            >
              Voltar para categorias
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <Link to={`/prestador/${provider.id}`} key={provider.id}>
                <Card className="h-full card-hover">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {provider.profiles.full_name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {provider.profiles.city}, {provider.profiles.state}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="fill-yellow-500 w-5 h-5" />
                        <span className="font-medium">{provider.rating.toFixed(1)}</span>
                        <span className="text-gray-500 text-xs">({provider.total_reviews})</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Valor/hora:</span>
                        <span className="font-medium">R$ {provider.rate_per_hour.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Serviços realizados:</span>
                        <span className="font-medium">{provider.services_completed}</span>
                      </div>
                      {provider.response_time && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tempo de resposta:</span>
                          <span className="font-medium">{provider.response_time}</span>
                        </div>
                      )}
                    </div>

                    {provider.description && (
                      <p className="mt-4 text-gray-700 text-sm line-clamp-2">
                        {provider.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PrestadoresPorCategoria;
