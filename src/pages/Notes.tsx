
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchBar from "@/components/SearchBar";
import ResourceCard from "@/components/ResourceCard";
import { Resource } from "@/components/ResourceCard";
import { mockResources, getResourcesByType, getResourcesBySubjectCode } from "@/data/mockData";
import Navbar from "@/components/Navbar";

const Notes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<Resource[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const query = searchParams.get("query") || "";

  useEffect(() => {
    // Initial search if query param exists
    if (query) {
      handleSearch(query);
    } else {
      // Show all notes and videos by default
      const notes = getResourcesByType("note");
      const videos = getResourcesByType("video");
      setResults([...notes, ...videos]);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    setIsSearching(true);
    // Update URL
    setSearchParams({ query: searchQuery });

    // Simulate search delay
    setTimeout(() => {
      let filteredResults = getResourcesBySubjectCode(searchQuery);
      
      // Filter by type if a tab is selected (other than 'all')
      if (activeTab !== "all") {
        filteredResults = filteredResults.filter(r => r.type === activeTab);
      } else if (activeTab === "all") {
        // For 'all' tab, only show notes and videos
        filteredResults = filteredResults.filter(r => r.type === "note" || r.type === "video");
      }
      
      setResults(filteredResults);
      setIsSearching(false);
    }, 500);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    let filteredResults;
    if (value === "all") {
      if (query) {
        filteredResults = getResourcesBySubjectCode(query).filter(
          r => r.type === "note" || r.type === "video"
        );
      } else {
        const notes = getResourcesByType("note");
        const videos = getResourcesByType("video");
        filteredResults = [...notes, ...videos];
      }
    } else {
      if (query) {
        filteredResults = getResourcesBySubjectCode(query).filter(r => r.type === value);
      } else {
        filteredResults = getResourcesByType(value as "note" | "video");
      }
    }
    
    setResults(filteredResults);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">Lecture Notes & Videos</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Access comprehensive lecture notes and video tutorials for all your college courses
          </p>
        </div>
        
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search by subject code (e.g. CS101, BIO301)"
          />
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={handleTabChange}>
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="note">Notes</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            {renderResults()}
          </TabsContent>
          
          <TabsContent value="note" className="mt-0">
            {renderResults()}
          </TabsContent>
          
          <TabsContent value="video" className="mt-0">
            {renderResults()}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );

  function renderResults() {
    if (isSearching) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Searching...</p>
        </div>
      );
    }

    if (results.length === 0) {
      return (
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>No results found</CardTitle>
            <CardDescription>
              Try searching with a different subject code or browse all materials.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    );
  }
};

export default Notes;
