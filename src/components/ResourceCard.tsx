
import { Bookmark, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type Resource = {
  id: string;
  title: string;
  description: string;
  subjectCode: string;
  type: "note" | "video" | "book" | "simplified";
  imageUrl?: string;
  link: string;
};

interface ResourceCardProps {
  resource: Resource;
  className?: string;
}

const ResourceCard = ({ resource, className }: ResourceCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    
    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter((b: Resource) => b.id !== resource.id);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    } else {
      bookmarks.push(resource);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-lg card-glow", className)}>
      {resource.imageUrl && (
        <div className="h-40 overflow-hidden">
          <img 
            src={resource.imageUrl} 
            alt={resource.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{resource.title}</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleBookmark}
            className={cn(
              "h-8 w-8 rounded-full transition-colors",
              isBookmarked ? "text-primary" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            )}
          >
            <Bookmark className={cn("h-5 w-5", isBookmarked ? "fill-primary" : "")} />
          </Button>
        </div>
        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
          {resource.subjectCode}
        </span>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-600 dark:text-gray-300">{resource.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <a 
          href={resource.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          View Resource <ExternalLink className="ml-1 h-4 w-4" />
        </a>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
