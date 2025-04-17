
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ServiceProvider } from "@/hooks/useServiceProviders";

interface ProviderCardProps {
  provider: ServiceProvider;
  onViewProfile: () => void;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
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
  
  return (
    <motion.div variants={fadeIn}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-40 bg-gradient-to-r from-chamaai-blue to-chamaai-lightblue">
          <div className="absolute -bottom-12 left-6">
            <Avatar className="h-24 w-24 border-4 border-white">
              <AvatarImage src={profileImage} alt={provider.profiles.full_name} />
              <AvatarFallback className="text-xl bg-chamaai-lightblue text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        
        <CardContent className="pt-14 pb-6">
          <h3 className="text-xl font-semibold mb-1">
            {provider.profiles.full_name}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-1">
            <span className="bg-chamaai-lightgray px-2 py-1 rounded-full text-xs">
              {provider.category}
            </span>
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
          
          <Button 
            onClick={onViewProfile} 
            className="w-full bg-chamaai-blue hover:bg-chamaai-lightblue"
          >
            Ver Perfil
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProviderCard;
