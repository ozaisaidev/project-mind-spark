
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Image, PresentationIcon, ChartBar } from "lucide-react";
import { Link } from "react-router-dom";

type SlideType = {
  id: number;
  title: string;
  content: string;
  type: "text" | "image" | "chart" | "list";
  imageUrl?: string;
  listItems?: string[];
  chartData?: any; // In a real app, this would have a more specific type
};

const demoSlides: SlideType[] = [
  {
    id: 1,
    title: "Project Overview",
    content: "A comprehensive task and project management system with analytics and timeline tracking.",
    type: "text"
  },
  {
    id: 2,
    title: "Project Structure",
    content: "Our application consists of the following main components:",
    type: "list",
    listItems: [
      "Project Dashboard - Overview of all projects",
      "Task Management - Create, edit, and track tasks",
      "Timeline View - Visualize project timelines",
      "Analytics - Track project performance metrics"
    ]
  },
  {
    id: 3,
    title: "Task Flow Diagram",
    content: "Visual representation of the task workflow:",
    type: "image",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&h=500"
  },
  {
    id: 4,
    title: "Project Analytics",
    content: "Key performance indicators and project metrics:",
    type: "chart"
  },
  {
    id: 5,
    title: "Next Steps",
    content: "Future development roadmap includes:\n- Mobile application\n- AI-powered task suggestions\n- Advanced reporting features\n- Team collaboration tools",
    type: "text"
  }
];

export default function Presentation() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = demoSlides[currentSlideIndex];

  const goToPreviousSlide = () => {
    setCurrentSlideIndex(prev => Math.max(0, prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlideIndex(prev => Math.min(demoSlides.length - 1, prev + 1));
  };

  const renderSlideContent = (slide: SlideType) => {
    switch (slide.type) {
      case "image":
        return (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-lg text-zinc-200 mb-4">{slide.content}</p>
            <div className="relative w-full max-w-3xl h-80 rounded-lg overflow-hidden">
              <img 
                src={slide.imageUrl} 
                alt={slide.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        );

      case "list":
        return (
          <div className="flex flex-col space-y-4">
            <p className="text-lg text-zinc-200">{slide.content}</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              {slide.listItems?.map((item, index) => (
                <li key={index} className="text-lg animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );

      case "chart":
        return (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-lg text-zinc-200 mb-4">{slide.content}</p>
            <div className="border border-zinc-700 rounded-lg p-8 bg-zinc-800/50 w-full max-w-3xl">
              <div className="flex justify-around items-end h-64">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-500 w-16 h-32 rounded-t-md"></div>
                  <span className="mt-2 text-zinc-400">Q1</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-500 w-16 h-48 rounded-t-md"></div>
                  <span className="mt-2 text-zinc-400">Q2</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-500 w-16 h-40 rounded-t-md"></div>
                  <span className="mt-2 text-zinc-400">Q3</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-500 w-16 h-56 rounded-t-md"></div>
                  <span className="mt-2 text-zinc-400">Q4</span>
                </div>
              </div>
              <div className="mt-6 text-center text-zinc-400">
                Project Completion Rate (%)
              </div>
            </div>
          </div>
        );

      default:
        return (
          <p className="text-xl text-zinc-200 leading-relaxed">
            {slide.content}
          </p>
        );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 pt-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-12">
          <Link to="/projects" className="flex items-center text-zinc-400 hover:text-white">
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span className="font-mono">Back to Projects</span>
          </Link>
          <div className="text-zinc-400 font-mono">
            Slide {currentSlideIndex + 1} of {demoSlides.length}
          </div>
        </div>

        {/* Presentation Slide */}
        <Card className="bg-zinc-800/60 border-zinc-700 shadow-xl">
          <CardContent className="p-12">
            <div className="flex items-center space-x-3 mb-8">
              <PresentationIcon className="h-8 w-8 text-red-500" />
              <h1 className="text-3xl font-bold text-white font-mono tracking-tight">
                {currentSlide.title}
              </h1>
            </div>
            
            <div className="min-h-[400px] flex items-center justify-center">
              {renderSlideContent(currentSlide)}
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex justify-between mt-8">
          <Button 
            onClick={goToPreviousSlide} 
            disabled={currentSlideIndex === 0}
            variant="outline" 
            className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Previous
          </Button>
          <Button 
            onClick={goToNextSlide} 
            disabled={currentSlideIndex === demoSlides.length - 1}
            variant="outline" 
            className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
          >
            Next
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        {/* Slide Thumbnails */}
        <div className="mt-12 grid grid-cols-5 gap-4">
          {demoSlides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`cursor-pointer p-2 rounded border ${
                index === currentSlideIndex 
                  ? 'border-red-500 bg-zinc-800' 
                  : 'border-zinc-700 bg-zinc-800/40'
              }`}
              onClick={() => setCurrentSlideIndex(index)}
            >
              <div className="h-20 flex items-center justify-center">
                {slide.type === 'image' && <Image className="h-6 w-6 text-zinc-400" />}
                {slide.type === 'chart' && <ChartBar className="h-6 w-6 text-zinc-400" />}
                {(slide.type === 'text' || slide.type === 'list') && (
                  <div className="w-full px-2">
                    <div className="h-2 bg-zinc-700 rounded mb-2 w-full"></div>
                    <div className="h-2 bg-zinc-700 rounded mb-2 w-3/4"></div>
                    <div className="h-2 bg-zinc-700 rounded w-1/2"></div>
                  </div>
                )}
              </div>
              <div className="text-[10px] text-center text-zinc-500 mt-2 truncate">
                {slide.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
