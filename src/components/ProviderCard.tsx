
import { motion } from "framer-motion";
import { Star, MapPin, Clock, BadgeCheck, Tag, Paintbrush, Plug, ShowerHead, Hammer, Sparkles, Leaf, Wrench } from "lucide-react";
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

const getCategoryData = (category: string) => {
  const categoryMap: Record<string, { color: string; icon: JSX.Element }> = {
    "limpeza": {
      color: "border-blue-300 bg-blue-50",
      icon: <Sparkles className="w-3 h-3 text-blue-500" />
    },
    "pintura": {
      color: "border-orange-300 bg-orange-50",
      icon: <Paintbrush className="w-3 h-3 text-orange-500" />
    },
    "eletrica": {
      color: "border-yellow-300 bg-yellow-50",
      icon: <Wrench className="w-3 h-3 text-yellow-600" />
    },
    "hidraulica": {
      color: "border-green-300 bg-green-50",
      icon: <ShowerHead className="w-3 h-3 text-green-500" />
    },
    "jardinagem": {
      color: "border-emerald-300 bg-emerald-50",
      icon: <Leaf className="w-3 h-3 text-emerald-500" />
    },
    "montagem de móveis": {
      color: "border-gray-300 bg-gray-50",
      icon: <Hammer className="w-3 h-3 text-gray-500" />
    },
    "reforma": {
      color: "border-gray-300 bg-gray-50",
      icon: <Hammer className="w-3 h-3 text-gray-500" />
    }
  };
  
  const key = category.toLowerCase();
  return categoryMap[key] || { 
    color: "border-gray-200",
    icon: <Tag className="w-3 h-3 text-gray-500" />
  };
};

const getProviderAvailability = (provider: ServiceProvider) => {
  const statusOptions = ["available", "busy", "unavailable"];
  const randomIndex = Math.floor(provider.id.charCodeAt(0) % 3);
  return statusOptions[randomIndex];
};

const getResponseTime = (provider: ServiceProvider) => {
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
    
  const location = provider.profiles.city || "";
  const availability = getProviderAvailability(provider);
  const responseTime = getResponseTime(provider);
  
  // Get the category data for this provider
  const categoryData = getCategoryData(provider.category);
  
  return (
    <motion.div variants={fadeIn}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-gray-100">
              <AvatarImage src={profileImage} alt={provider.profiles.full_name} />
              <AvatarFallback className="text-xl bg-chamaai-lightblue text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold">{provider.profiles.full_name}</h3>
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="text-sm font-medium ml-0.5">
                    {provider.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">
                    ({provider.total_reviews})
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline" className={categoryData.color}>
                  {React.cloneElement(categoryData.icon, { className: "w-3 h-3 mr-1" })}
                  {provider.category}
                </Badge>
                {provider.is_verified && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <BadgeCheck className="w-3 h-3 mr-1" />
                    Verificado
                  </Badge>
                )}
                {availability === "available" && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Clock className="w-3 h-3 mr-1" />
                    Responde rápido
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <MapPin className="w-4 h-4 mr-1 shrink-0" />
                <span>{location}</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{provider.description}</p>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      onClick={onViewProfile} 
                      className="w-full bg-chamaai-blue hover:bg-chamaai-lightblue"
                    >
                      Ver Perfil
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visualize avaliações completas, fotos e entre em contato — após login.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProviderCard;
