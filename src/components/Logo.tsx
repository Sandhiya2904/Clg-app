
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Logo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <Link to={isLoggedIn ? "/home" : "/login"} className="flex items-center gap-2 text-xl font-bold">
      <Sparkles className="h-6 w-6 text-primary" />
      <span className="text-gradient">LearnLight</span>
    </Link>
  );
};

export default Logo;
