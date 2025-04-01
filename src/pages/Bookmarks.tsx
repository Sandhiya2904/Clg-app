
import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ResourceCard from "@/components/ResourceCard";
import { Resource } from "@/components/ResourceCard";
import Navbar from "@/components/Navbar";
import { BookmarkIcon } from "lucide-react";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Resource[]>([]);

  useEffect(() => {
    // Load bookmarks from localStorage
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">Your Bookmarks</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Quick access to your saved study materials
          </p>
        </div>
        
        {bookmarks.length === 0 ? (
          <Card className="mx-auto max-w-md">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <BookmarkIcon className="h-12 w-12 text-gray-400" />
              </div>
              <CardTitle>No bookmarks yet</CardTitle>
              <CardDescription>
                Start adding bookmarks by clicking the bookmark icon on any resource.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Bookmarks;
