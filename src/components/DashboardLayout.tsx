
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="container mx-auto">
          {children}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardLayout;
