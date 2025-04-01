
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, VideoIcon, Sparkles, BookmarkIcon, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    // In a real app, this would search across all materials
    navigate(`/notes?query=${encodeURIComponent(query)}`);
  };

  const features = [
    {
      icon: <VideoIcon className="h-10 w-10 text-primary" />,
      title: "Lecture Notes & Videos",
      description: "Access comprehensive notes and video tutorials for all your courses",
      link: "/notes"
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Books",
      description: "Browse textbooks and reference materials for all your subjects",
      link: "/books"
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "Simplified Learning",
      description: "Understand difficult concepts with our simplified explanations",
      link: "/simplified"
    },
    {
      icon: <BookmarkIcon className="h-10 w-10 text-primary" />,
      title: "Save for Later",
      description: "Bookmark your favorite materials for quick access",
      link: "/bookmarks"
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-3xl -top-40 -left-40" />
            <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-3xl top-1/3 right-0" />
            <div className="absolute w-[600px] h-[600px] rounded-full bg-pink-500/20 blur-3xl bottom-0 left-1/4" />
          </div>
          
          <div className="container px-4 z-10 text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Learn Smarter, Not Harder
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Access lecture notes, books, and simplified learning materials for your college courses
            </p>
            
            <div className="mb-10">
              <SearchBar onSearch={handleSearch} placeholder="Search for any subject (e.g. CS101, Biology)" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gradient">
              Everything You Need to Excel
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl glassmorphism flex flex-col items-center text-center card-glow cursor-pointer transition-transform hover:scale-105"
                  onClick={() => navigate(feature.link)}
                >
                  <div className="mb-4 rounded-full bg-primary/10 p-3">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
