
import { ReactNode } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ServiceDescriptionLayoutProps {
  title: string;
  description: string;
  benefits: {
    title: string;
    description: string;
    icon: ReactNode;
  }[];
  serviceType: string;
  imageSrc?: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const ServiceDescriptionLayout = ({ 
  title, 
  description, 
  benefits, 
  serviceType,
  imageSrc 
}: ServiceDescriptionLayoutProps) => {
  const navigate = useNavigate();
  
  const handleExplore = () => {
    navigate(`/busca?q=${encodeURIComponent(serviceType)}`);
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">{title}</h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              {description}
            </p>
            
            <Button 
              onClick={handleExplore}
              className="bg-chamaai-blue hover:bg-chamaai-lightblue text-white px-8 py-6 text-lg rounded-lg"
            >
              Explorar profissionais de {serviceType}
            </Button>
          </motion.div>
          
          {imageSrc && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block"
            >
              <img 
                src={imageSrc} 
                alt={`Serviço de ${serviceType}`} 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </motion.div>
          )}
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Benefícios do serviço</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 h-full flex flex-col"
              >
                <div className="bg-chamaai-lightgray p-4 rounded-full inline-block mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDescriptionLayout;
