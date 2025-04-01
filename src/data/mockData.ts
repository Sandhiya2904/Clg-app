
import { Resource } from "@/components/ResourceCard";

export const mockResources: Resource[] = [
  {
    id: "1",
    title: "Introduction to Computer Science",
    description: "Comprehensive notes covering the basics of programming and computer science fundamentals.",
    subjectCode: "CS101",
    type: "note",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80",
    link: "#"
  },
  {
    id: "2",
    title: "Data Structures & Algorithms",
    description: "Video tutorial series explaining essential data structures and algorithms for efficient programming.",
    subjectCode: "CS202",
    type: "video",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
    link: "#"
  },
  {
    id: "3",
    title: "Calculus for Engineers",
    description: "Digital textbook with interactive examples for calculus applied to engineering problems.",
    subjectCode: "MATH201",
    type: "book",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
    link: "#"
  },
  {
    id: "4",
    title: "Organic Chemistry Simplified",
    description: "Easy-to-understand explanations of complex organic chemistry concepts with visual aids.",
    subjectCode: "CHEM301",
    type: "simplified",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80",
    link: "#"
  },
  {
    id: "5",
    title: "Principles of Economics",
    description: "Comprehensive notes on microeconomics and macroeconomics with real-world examples.",
    subjectCode: "ECON101",
    type: "note",
    imageUrl: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&q=80",
    link: "#"
  },
  {
    id: "6",
    title: "Physics Mechanics",
    description: "Video lectures explaining Newtonian mechanics and problem-solving techniques.",
    subjectCode: "PHYS201",
    type: "video",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80",
    link: "#"
  },
  {
    id: "7",
    title: "Modern Literature Analysis",
    description: "Digital textbook exploring literary themes and techniques in 20th century novels.",
    subjectCode: "ENG302",
    type: "book",
    imageUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80",
    link: "#"
  },
  {
    id: "8",
    title: "Linear Algebra Made Easy",
    description: "Simplified explanations of vectors, matrices, and linear transformations with interactive visualizations.",
    subjectCode: "MATH203",
    type: "simplified",
    imageUrl: "https://images.unsplash.com/photo-1635241161466-541f065683ba?auto=format&fit=crop&q=80",
    link: "#"
  },
  {
    id: "9",
    title: "Database Systems",
    description: "Notes covering relational database design, SQL, and database management systems.",
    subjectCode: "CS403",
    type: "note",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80",
    link: "#"
  },
  {
    id: "10",
    title: "Human Anatomy",
    description: "Video tutorials with 3D models explaining human body systems and functions.",
    subjectCode: "BIO301",
    type: "video",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80",
    link: "#"
  },
  {
    id: "11",
    title: "Artificial Intelligence Fundamentals",
    description: "Digital book covering machine learning algorithms, neural networks, and AI applications.",
    subjectCode: "CS420",
    type: "book",
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80",
    link: "#"
  },
  {
    id: "12",
    title: "Quantum Physics Demystified",
    description: "Complex quantum concepts explained in an approachable way with helpful diagrams and examples.",
    subjectCode: "PHYS401",
    type: "simplified",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
    link: "#"
  }
];

export const getResourcesByType = (type: Resource["type"]) => {
  return mockResources.filter(resource => resource.type === type);
};

export const getResourcesBySubjectCode = (code: string) => {
  return mockResources.filter(resource => 
    resource.subjectCode.toLowerCase().includes(code.toLowerCase())
  );
};
