
import SearchSection from "@/components/dashboard/SearchSection";
import RecentRequests from "@/components/dashboard/RecentRequests";
import { useAuth } from "@/contexts/AuthContext";

const ClientDashboard = () => {
  const { userProfile } = useAuth();

  return (
    <div className="container-custom py-8 space-y-8">
      {userProfile && (
        <h1 className="text-2xl font-bold mb-6">Olá, {userProfile.full_name}!</h1>
      )}
      <SearchSection />
      <RecentRequests />
    </div>
  );
};

export default ClientDashboard;
