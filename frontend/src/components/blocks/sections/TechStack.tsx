"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Progress } from "../ui/Progress";
import {
  Code,
  Server,
  Database,
  Cloud,
  Wrench,
  Monitor,
  Layers,
  Zap,
} from "lucide-react";
import portfolioConfig from "../../data/portfolio-config.json";

const categoryIcons = {
  frontend: {
    icon: Monitor,
    label: "Frontend Technologies",
    color: "text-blue-500",
  },
  backend: {
    icon: Server,
    label: "Backend Technologies",
    color: "text-green-500",
  },
  database: { icon: Database, label: "Databases", color: "text-purple-500" },
  devops: { icon: Cloud, label: "DevOps & Cloud", color: "text-orange-500" },
  tools: { icon: Wrench, label: "Tools & Others", color: "text-pink-500" },
};

const SkillCard = ({ skill, index }: { skill: any; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group"
    >
      <Card className="border-primary/20 bg-card/80 backdrop-blur-sm hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {skill.name}
                </h4>
                <Badge
                  variant="outline"
                  className="mt-1 text-xs px-2 py-0.5 border-primary/10"
                >
                  {skill.level}% Proficiency
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Skill Level</span>
                <span className="font-medium text-primary">{skill.level}%</span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: "100%" } : {}}
                transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                className="w-full bg-muted rounded-full h-2 overflow-hidden"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{
                    delay: index * 0.1 + 0.7,
                    duration: 1.2,
                    ease: "easeOut",
                  }}
                  className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                />
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const TechStack = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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

  const allSkills = Object.values(portfolioConfig.techStack).flat();
  const displayedSkills = selectedCategory
    ? portfolioConfig.techStack[
        selectedCategory as keyof typeof portfolioConfig.techStack
      ] || []
    : allSkills;

  return (
    <section id="tech-stack" className="py-20 bg-background">
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
              <Layers className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                Technology
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              My Tech Stack
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A comprehensive overview of the technologies, frameworks, and
              tools I work with regularly. Continuously learning and adapting to
              new technologies.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
          >
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className={`p-4 h-auto flex flex-col items-center gap-2 transition-all duration-300 ${
                selectedCategory === null
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              }`}
            >
              <Zap className="w-5 h-5" />
              <span className="text-xs font-medium">All Skills</span>
            </Button>

            {Object.entries(categoryIcons).map(
              ([key, { icon: IconComponent, label, color }]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(key)}
                  className={`p-4 h-auto flex flex-col items-center gap-2 transition-all duration-300 ${
                    selectedCategory === key
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  <IconComponent
                    className={`w-5 h-5 ${
                      selectedCategory === key ? "" : color
                    }`}
                  />
                  <span className="text-xs font-medium">
                    {label.split(" ")[0]}
                  </span>
                </Button>
              )
            )}
          </motion.div>

          {/* Skills Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedSkills.map((skill, index) => (
                <SkillCard
                  key={`${skill.name}-${index}`}
                  skill={skill}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Tech Stack Overview */}
          <motion.div variants={itemVariants} className="mt-16">
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <Code className="w-6 h-6 text-primary" />
                  Tech Stack Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {Object.entries(categoryIcons).map(
                    ([key, { icon: IconComponent, label, color }]) => {
                      const categorySkills =
                        portfolioConfig.techStack[
                          key as keyof typeof portfolioConfig.techStack
                        ] || [];
                      return (
                        <div key={key} className="text-center">
                          <div
                            className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-card border border-primary/20 mb-3`}
                          >
                            <IconComponent className={`w-6 h-6 ${color}`} />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">
                            {label}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {categorySkills.length} technologies
                          </p>
                          <div className="flex flex-wrap justify-center gap-1">
                            {categorySkills.slice(0, 3).map((skill) => (
                              <Badge
                                key={skill.name}
                                variant="outline"
                                className="text-xs px-2 py-0.5 border-primary/10 text-primary/80"
                              >
                                {skill.name}
                              </Badge>
                            ))}
                            {categorySkills.length > 3 && (
                              <Badge
                                variant="outline"
                                className="text-xs px-2 py-0.5 border-primary/10 text-primary/80"
                              >
                                +{categorySkills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Learning & Growth */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                  <Badge
                    variant="default"
                    className="px-3 py-1 bg-primary/90 text-primary-foreground"
                  >
                    Always Learning
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Continuous Growth Mindset
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Technology evolves rapidly, and so do I. I'm constantly
                  exploring new frameworks, tools, and methodologies to stay at
                  the forefront of development trends and best practices.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
