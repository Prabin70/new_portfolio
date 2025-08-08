"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import {
  User,
  Award,
  Target,
  Heart,
  Download,
  ExternalLink,
  Calendar,
  MapPin,
  Mail,
} from "lucide-react";
import portfolioConfig from "../../data/portfolio-config.json";

export const About = () => {
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

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <User className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                About Me
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {portfolioConfig.about.headline}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {portfolioConfig.about.description}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Main Content */}
            <div className="space-y-8">
              {/* Experience Highlights */}
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-semibold">
                        Experience Highlights
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {portfolioConfig.about.highlights.map(
                        (highlight, index) => (
                          <motion.div
                            key={index}
                            initial={{ x: -20, opacity: 0 }}
                            animate={inView ? { x: 0, opacity: 1 } : {}}
                            transition={{ delay: 0.1 * index + 0.5 }}
                            className="flex items-start gap-3"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <p className="text-muted-foreground leading-relaxed">
                              {highlight}
                            </p>
                          </motion.div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Interests */}
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Heart className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-semibold">
                        Interests & Passions
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {portfolioConfig.about.interests.map(
                        (interest, index) => (
                          <motion.div
                            key={interest}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={inView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ delay: 0.1 * index + 0.7 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge
                              variant="secondary"
                              className="px-3 py-2 text-sm border-primary/20 hover:border-primary/40 transition-colors cursor-default"
                            >
                              {interest}
                            </Badge>
                          </motion.div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Experience & Contact Info */}
            <div className="space-y-8">
              {/* Professional Experience */}
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Target className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-semibold">
                        Professional Journey
                      </h3>
                    </div>
                    <div className="space-y-6">
                      {portfolioConfig.experience.map((exp, index) => (
                        <motion.div
                          key={index}
                          initial={{ y: 30, opacity: 0 }}
                          animate={inView ? { y: 0, opacity: 1 } : {}}
                          transition={{ delay: 0.2 * index + 0.6 }}
                          className="relative pl-6 border-l-2 border-primary/20 last:border-l-0"
                        >
                          <div className="absolute -left-[5px] top-2 w-2 h-2 bg-primary rounded-full" />
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground">
                              {exp.position}
                            </h4>
                            <p className="text-sm text-primary font-medium">
                              {exp.company}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span>{exp.duration}</span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {exp.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-3">
                              {exp.technologies.slice(0, 3).map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  className="text-xs px-2 py-0.5 border-primary/10 text-primary/80"
                                >
                                  {tech}
                                </Badge>
                              ))}
                              {exp.technologies.length > 3 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs px-2 py-0.5 border-primary/10 text-primary/80"
                                >
                                  +{exp.technologies.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Contact */}
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Let's Connect
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{portfolioConfig.personal.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4 text-primary" />
                        <span>{portfolioConfig.personal.email}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <Button
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={() =>
                          document
                            .getElementById("contact")
                            ?.scrollIntoView({ behavior: "smooth" })
                        }
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Get In Touch
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Resume
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
