
import { HelpCircle, MessageCircle, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SupportSection = () => {
  return (
    <Card className="bg-gradient-to-br from-chamaai-blue to-chamaai-lightblue text-white">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <HelpCircle className="mr-2 h-5 w-5" />
          Ajuda Rápida
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4 text-white/90">
          Precisa de ajuda ou tem alguma dúvida sobre os serviços?
        </p>
        <div className="space-y-2">
          <Button variant="outline" className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30">
            <MessageCircle className="mr-2 h-4 w-4" />
            Chat ao vivo
          </Button>
          <Button variant="outline" className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30">
            <Phone className="mr-2 h-4 w-4" />
            (11) 9988-7766
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportSection;
