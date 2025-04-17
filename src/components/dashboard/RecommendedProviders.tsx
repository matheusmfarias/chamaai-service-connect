
import { Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Dados simulados
const providers = [
  {
    id: "1",
    name: "Ana Silva",
    category: "Faxina",
    rating: 4.9,
    reviews: 52,
    image: null,
  },
  {
    id: "2",
    name: "Carlos Santos",
    category: "Elétrica",
    rating: 4.7,
    reviews: 38,
    image: null,
  },
  {
    id: "3",
    name: "Mariana Costa",
    category: "Pintura",
    rating: 4.8,
    reviews: 45,
    image: null,
  },
];

const RecommendedProviders = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Prestadores Recomendados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {providers.map((provider) => (
            <div key={provider.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  {provider.image ? (
                    <AvatarImage src={provider.image} />
                  ) : (
                    <AvatarFallback className="bg-chamaai-blue text-white">
                      {provider.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h3 className="font-medium text-sm">{provider.name}</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-2">{provider.category}</span>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 mr-1" />
                      <span>{provider.rating} ({provider.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Link to={`/prestador/${provider.id}`}>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4" asChild>
          <Link to="/prestadores">Ver todos os prestadores</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecommendedProviders;
