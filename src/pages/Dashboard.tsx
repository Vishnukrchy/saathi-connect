import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingHistory from "@/components/dashboard/BookingHistory";
import ProfileManagement from "@/components/dashboard/ProfileManagement";
import SaathiSettings from "@/components/dashboard/SaathiSettings";
import { User, Calendar, Settings } from "lucide-react";

const Dashboard = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isSaathi = userRole === "saathi";

  return (
    <>
      <Helmet>
        <title>Dashboard - SaathiCircle</title>
        <meta 
          name="description" 
          content="Manage your bookings, profile, and settings on SaathiCircle." 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-subtle">
        <Navbar />
        
        <main className="flex-1 pt-24 pb-16 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back{user.user_metadata?.full_name ? `, ${user.user_metadata.full_name.split(' ')[0]}` : ''}!
              </h1>
              <p className="text-muted-foreground mt-2">
                {isSaathi 
                  ? "Manage your Saathi profile, availability, and bookings" 
                  : "View your bookings and manage your profile"
                }
              </p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="bookings" className="space-y-6">
              <TabsList className="bg-card shadow-sm border border-border p-1 h-auto flex-wrap">
                <TabsTrigger 
                  value="bookings" 
                  className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="hidden sm:inline">Bookings</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="profile" 
                  className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                {isSaathi && (
                  <TabsTrigger 
                    value="settings" 
                    className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline">Saathi Settings</span>
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="bookings" className="mt-6">
                <BookingHistory userRole={userRole} userId={user.id} />
              </TabsContent>

              <TabsContent value="profile" className="mt-6">
                <ProfileManagement userId={user.id} />
              </TabsContent>

              {isSaathi && (
                <TabsContent value="settings" className="mt-6">
                  <SaathiSettings userId={user.id} />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
