"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import {
  ExternalLink,
  Github,
  Code,
  Calendar,
  Star,
  Play,
  Filter,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import portfolioConfig from "../../data/portfolio-config.json";

const categoryFilters = [
  { id: "all", label: "All Projects", icon: Code },
  { id: "Full-Stack", label: "Full-Stack", icon: CheckCircle },
  { id: "DevOps", label: "DevOps", icon: Play },
  { id: "AI/ML", label: "AI/ML", icon: Sparkles },
  { id: "Open Source", label: "Open Source", icon: Star },
];

const statusColors = {
  Completed: "bg-green-500/10 text-green-500 border-green-500/20",
  "In Progress": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Ongoing: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredProjects =
    selectedCategory === "all"
      ? portfolioConfig.projects
      : portfolioConfig.projects.filter(
          (project) => project.category === selectedCategory
        );

  const featuredProjects = portfolioConfig.projects.filter(
    (project) => project.featured
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  } as const;

  return (
    <section id="projects" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Code className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                My Work
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Here are some of the projects I've worked on, showcasing my
              expertise in full-stack development, DevOps practices, and modern
              technologies.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categoryFilters.map((filter) => {
              const IconComponent = filter.icon;
              return (
                <Button
                  key={filter.id}
                  variant={
                    selectedCategory === filter.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(filter.id)}
                  className={`px-4 py-2 transition-all duration-300 ${
                    selectedCategory === filter.id
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {filter.label}
                </Button>
              );
            })}
          </motion.div>

          {/* Featured Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full border-primary/20 bg-card/80 backdrop-blur-sm hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 overflow-hidden">
                  {/* Project Image Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
                      <img src={project.image} alt="jholmomo" />
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <Badge
                        variant="outline"
                        className={`text-xs px-2 py-1 ${
                          statusColors[
                            project.status as keyof typeof statusColors
                          ] ||
                          "bg-muted/50 text-muted-foreground border-muted/20"
                        }`}
                      >
                        {project.status}
                      </Badge>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4 z-20">
                        <Badge
                          variant="default"
                          className="text-xs px-2 py-1 bg-primary/90 text-primary-foreground"
                        >
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{project.year}</span>
                          <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                          <Badge
                            variant="outline"
                            className="text-xs px-2 py-0.5 border-primary/10"
                          >
                            {project.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-muted-foreground leading-relaxed mt-3">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 flex-1 flex flex-col">
                    {/* Technologies */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs px-2 py-0.5 bg-primary/5 text-primary border-primary/10"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge
                            variant="secondary"
                            className="text-xs px-2 py-0.5 bg-primary/5 text-primary border-primary/10"
                          >
                            +{project.technologies.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="mb-6 flex-1">
                      <h4 className="text-sm font-medium text-foreground mb-2">
                        Key Features:
                      </h4>
                      <ul className="space-y-1">
                        {project.features.slice(0, 3).map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-muted-foreground"
                          >
                            <div className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-primary/20 hover:border-primary/40 hover:bg-primary/5 text-xs"
                        onClick={() => window.open(project.githubUrl, "_blank")}
                      >
                        <Github className="w-3 h-3 mr-2" />
                        Code
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary/90 text-xs"
                        onClick={() => window.open(project.liveUrl, "_blank")}
                      >
                        <ExternalLink className="w-3 h-3 mr-2" />
                        Live Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Show More Button */}
          {filteredProjects.length > 6 && (
            <motion.div variants={itemVariants} className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group"
              >
                <span className="mr-2">View All Projects</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}

          {/* GitHub CTA */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <Card className="max-w-2xl mx-auto border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Github className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Explore More on GitHub
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Check out my complete portfolio of open-source projects,
                  contributions, and experimental work.
                </p>
                <Button
                  size="lg"
                  className="px-8 py-3 bg-primary hover:bg-primary/90 transition-all duration-300 group"
                  onClick={() =>
                    window.open("https://github.com/Prabin70", "_blank")
                  }
                >
                  <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  <span>View GitHub Profile</span>
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
