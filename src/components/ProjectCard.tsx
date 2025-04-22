
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Project } from "@/types"
import { useNavigate } from "react-router-dom"

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const { id, title, description, tasks } = project;
  
  const handleClick = () => {
    navigate(`/project/${id}`);
  };

  return (
    <Card 
      className="w-full transition-all duration-300 ease-in-out hover:shadow-lg hover:translate-y-[-2px] bg-white border-zinc-200 cursor-pointer group"
      onClick={handleClick}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex flex-col space-y-1.5">
          <CardTitle className="text-base font-mono text-zinc-800">
            {title}
          </CardTitle>
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] text-zinc-600 font-mono lowercase">{tasks.length} tasks</span>
          </div>
        </div>
      </CardHeader>
      {description && (
        <CardContent className="pt-1">
          <p className="text-xs text-zinc-600 font-mono line-clamp-2">
            {description}
          </p>
        </CardContent>
      )}
    </Card>
  )
}
