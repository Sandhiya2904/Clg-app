
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SearchBar from "@/components/SearchBar";
import ResourceCard from "@/components/ResourceCard";
import { Resource } from "@/components/ResourceCard";
import { getResourcesByType, getResourcesBySubjectCode } from "@/data/mockData";
import Navbar from "@/components/Navbar";

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<Resource[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const query = searchParams.get("query") || "";

  useEffect(() => {
    // Initial search if query param exists
    if (query) {
      handleSearch(query);
    } else {
      // Show all books by default
      setResults(getResourcesByType("book"));
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    setIsSearching(true);
    // Update URL
    setSearchParams({ query: searchQuery });

    // Simulate search delay
    setTimeout(() => {
      const filteredResults = getResourcesBySubjectCode(searchQuery).filter(
        r => r.type === "book"
      );
      setResults(filteredResults);
      setIsSearching(false);
    }, 500);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">Books & Textbooks</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Access digital books and textbooks for all your college courses
          </p>
        </div>
        
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search by subject code (e.g. CS101, BIO301)"
          />
        </div>
        
        {isSearching ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Searching...</p>
          </div>
        ) : results.length === 0 ? (
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle>No books found</CardTitle>
              <CardDescription>
                Try searching with a different subject code or browse all materials.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Books;
