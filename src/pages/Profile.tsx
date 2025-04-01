
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Resource } from "@/components/ResourceCard";
import ResourceCard from "@/components/ResourceCard";
import { mockResources } from "@/data/mockData";
import { BookOpen, Clock, BookMarked } from "lucide-react";
import Navbar from "@/components/Navbar";

type User = {
  id: string;
  name: string;
  email: string;
  college: string;
  department: string;
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [recentResources, setRecentResources] = useState<Resource[]>([]);
  const [recommendedResources, setRecommendedResources] = useState<Resource[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast({
        title: "Authentication required",
        description: "Please log in to access your profile",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // Get mock recent activity and recommendations
    const recentItems = mockResources.slice(0, 3);
    setRecentResources(recentItems);
    
    // Get randomized recommendations
    const shuffled = [...mockResources].sort(() => 0.5 - Math.random());
    setRecommendedResources(shuffled.slice(0, 3));
  }, [navigate, toast]);

  if (!user) {
    return null; // Will redirect in useEffect
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 glassmorphism animate-fade-in">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" alt={user.name} />
                  <AvatarFallback className="text-xl bg-primary text-white">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">College</p>
                  <p className="font-semibold">{user.college}</p>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Department</p>
                  <p className="font-semibold">{user.department}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-3">
                  Quick Stats
                </h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="flex justify-center mb-1">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Materials</p>
                    <p className="font-semibold">24</p>
                  </div>
                  <div>
                    <div className="flex justify-center mb-1">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Hours</p>
                    <p className="font-semibold">12</p>
                  </div>
                  <div>
                    <div className="flex justify-center mb-1">
                      <BookMarked className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Bookmarks</p>
                    <p className="font-semibold">8</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="recent" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="recent" className="w-1/2">Recent Activity</TabsTrigger>
                <TabsTrigger value="recommended" className="w-1/2">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recent" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recommended" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendedResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
