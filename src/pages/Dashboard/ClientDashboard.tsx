
import SearchSection from "@/components/dashboard/SearchSection";
import RecentRequests from "@/components/dashboard/RecentRequests";

const ClientDashboard = () => {
  return (
    <div className="space-y-8">
      <SearchSection />
      <RecentRequests />
    </div>
  );
};

export default ClientDashboard;
