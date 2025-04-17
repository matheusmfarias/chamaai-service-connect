
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/ui/layout";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </Layout>
  );
};

export default DashboardLayout;
