import { motion } from "framer-motion";
import { Star, MapPin, Clock, Check, X, Paintbrush, Plug, ShowerHead, Hammer, Broom } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { ServiceProvider } from "@/hooks/useServiceProviders";

interface ProviderCardProps {
  provider: ServiceProvider;
  onViewProfile: () => void;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Map category to color classes and icons
const getCategoryData = (category: string) => {
  const categoryMap: Record<string, { color: string; icon: JSX.Element }> = {
    "faxina": {
      color: "border-blue-300 bg-blue-50",
      icon: <Broom className="w-4 h-4 text-blue-500" />
    },
    "pintura": {
      color: "border-orange-300 bg-orange-50",
      icon: <Paintbrush className="w-4 h-4 text-orange-500" />
    },
    "eletrica": {
      color: "border-yellow-300 bg-yellow-50",
      icon: <Plug className="w-4 h-4 text-yellow-600" />
    },
    "hidraulica": {
      color: "border-green-300 bg-green-50",
      icon: <ShowerHead className="w-4 h-4 text-green-500" />
    },
    "reforma": {
      color: "border-gray-300 bg-gray-50",
      icon: <Hammer className="w-4 h-4 text-gray-500" />
    }
  };
  
  return categoryMap[category.toLowerCase()] || { 
    color: "border-gray-200",
    icon: <Hammer className="w-4 h-4 text-gray-500" />
  };
};

// Mock function to get provider availability status
const getProviderAvailability = (provider: ServiceProvider) => {
  // In a real app, this would come from the provider data
  const statusOptions = ["available", "busy", "unavailable"];
  const randomIndex = Math.floor(provider.id.charCodeAt(0) % 3);
  return statusOptions[randomIndex];
};

// Mock function to get response time
const getResponseTime = (provider: ServiceProvider) => {
  // In a real app, this would come from the provider data
  const times = [30, 60, 120, 240];
  const randomIndex = Math.floor(provider.id.charCodeAt(0) % times.length);
  return times[randomIndex];
};

const getRandomProfileImage = () => {
  const images = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256",
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=256&h=256",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&h=256",
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=256&h=256"
  ];
  
  return images[Math.floor(Math.random() * images.length)];
};

const ProviderCard = ({ provider, onViewProfile }: ProviderCardProps) => {
  const profileImage = getRandomProfileImage();
  const initials = provider.profiles.full_name
    .split(" ")
    .map(name => name.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
    
  const location = [provider.profiles.city, provider.profiles.state]
    .filter(Boolean)
    .join(", ");
  
  const availability = getProviderAvailability(provider);
  const responseTime = getResponseTime(provider);
  
  const categoryData = getCategoryData(provider.category);
  
  return (
    <motion.div variants={fadeIn}>
      <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 border-2 ${categoryData.color}`}>
        <CardContent className="pt-6 pb-6">
          {/* Availability Badge */}
          <div className="absolute top-2 right-2">
            {availability === "available" && (
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                <Check className="w-3 h-3 mr-1" />Disponível
              </Badge>
            )}
            {availability === "busy" && (
              <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                <Clock className="w-3 h-3 mr-1" />Responde em até {responseTime} min
              </Badge>
            )}
            {availability === "unavailable" && (
              <Badge variant="default" className="bg-red-500 hover:bg-red-600">
                <X className="w-3 h-3 mr-1" />Indisponível
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16 border-2 border-gray-100">
              <AvatarImage src={profileImage} alt={provider.profiles.full_name} />
              <AvatarFallback className="text-xl bg-chamaai-lightblue text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-1">
                {provider.profiles.full_name}
              </h3>
              <div className="flex items-center gap-1 mb-1">
                {categoryData.icon}
                <span className="bg-chamaai-lightgray px-2 py-1 rounded-full text-xs">
                  {provider.category}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center text-amber-500 mb-2">
            <Star className="w-4 h-4 mr-1 fill-amber-500" />
            <span className="text-sm font-medium">
              {provider.rating.toFixed(1)} 
              <span className="text-gray-400 ml-1">
                ({provider.total_reviews} {provider.total_reviews === 1 ? "avaliação" : "avaliações"})
              </span>
            </span>
          </div>
          
          {location && (
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{location}</span>
            </div>
          )}
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button 
                    onClick={onViewProfile} 
                    className="w-full bg-chamaai-blue hover:bg-chamaai-lightblue"
                  >
                    Ver Perfil
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Visualize avaliações completas, fotos e entre em contato — após login.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProviderCard;
