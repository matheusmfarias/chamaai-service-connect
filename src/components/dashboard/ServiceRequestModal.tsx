
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ServiceRequestForm } from "./forms/ServiceRequestForm";

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServiceRequestModal = ({ isOpen, onClose }: ServiceRequestModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Solicitar novo serviço</DialogTitle>
        </DialogHeader>
        <ServiceRequestForm onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRequestModal;
