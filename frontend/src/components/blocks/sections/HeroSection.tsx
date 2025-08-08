"use client";

import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Code,
  Server,
  Database,
  CloudLightning,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { UserPlusIcon } from "@heroicons/react/20/solid";

const portfolioConfig = {
  name: "Prabin Shrestha ",
  title: "Full-Stack Developer & DevOps Engineer",
  description:
    "Building scalable web applications and robust infrastructure solutions with modern technologies. Passionate about creating seamless user experiences and optimizing development workflows.",
  skills: ["React", "Node.js", "Docker", "Express", "TypeScript"],
  social: {
    github: "https://github.com/Prabin70",
    linkedin: "https://www.linkedin.com/in/prabin-shrestha-877528374/",
    email: "dev.prabinshretsha@gmail.com",
  },
};

const TypewriterText = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }
    }, delay + currentIndex * 100);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-pulse" />
    </span>
  );
};

const FloatingCard = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
};

export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background opacity-50" />

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-accent/10 rounded-full blur-xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="space-y-2">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <Badge
                    variant="secondary"
                    className="mb-4 px-4 py-2 fixed left-10 bottom-10 text-sm font-medium"
                  >
                    <Code className="w-4 h-4 mr-2" />
                    Available for opportunities
                  </Badge>
                </motion.div>

                <h1 className="text-5xl lg:text-5xl font-bold text-foreground leading-tight">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="block"
                  >
                    Hello, I'm
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="block text-primary"
                  >
                    {portfolioConfig.name}
                  </motion.span>
                </h1>

                <div className="text-xl lg:text-2xl text-muted-foreground min-h-[2rem]">
                  <TypewriterText text={portfolioConfig.title} delay={1000} />
                </div>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg text-muted-foreground leading-relaxed max-w-xl"
              >
                {portfolioConfig.description}
              </motion.p>

              {/* Skills Pills */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-3"
              >
                {portfolioConfig.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge
                      variant="outline"
                      className="px-3 py-1 text-sm border-primary/20 hover:border-primary/40 transition-colors"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="text-base px-8 py-3 bg-primary hover:bg-primary/90 transition-all duration-300 group"
                >
                  <Link href={"#projects"} className="mr-2 text-white ">
                    View Projects
                  </Link>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base cursor-pointer px-8 py-3 border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 group"
                >
                  <UserPlusIcon className="w-4 h-4 mr-2 group-hover:translate-y-1 transition-transform" />
                  <a href="#hireme" className="text-white">
                    Hire me
                  </a>
                </Button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4"
              >
                <span className="text-sm text-muted-foreground">
                  Connect with me:
                </span>
                <div className="flex gap-3">
                  {[
                    {
                      icon: Github,
                      href: portfolioConfig.social.github,
                      label: "GitHub",
                    },
                    {
                      icon: Linkedin,
                      href: portfolioConfig.social.linkedin,
                      label: "LinkedIn",
                    },
                    {
                      icon: Mail,
                      href: `mailto:${portfolioConfig.social.email}`,
                      label: "Email",
                    },
                  ].map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Profile Visual */}
            <div className="flex justify-center lg:justify-end">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                {/* Profile Card */}
                <Card className="relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm">
                  <div className="p-8">
                    {/* Profile Image Placeholder */}
                    <div className="relative mb-6">
                      <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center overflow-hidden">
                        <div className="w-44 h-44 bg-muted rounded-full flex items-center justify-center">
                          <div className="text-6xl text-muted-foreground">
                            👨‍💻
                          </div>
                        </div>
                      </div>

                      {/* Floating Tech Icons */}
                      <FloatingCard delay={1.5}>
                        <div className="absolute -top-2 -right-2 p-2 bg-card rounded-lg border border-border shadow-lg">
                          <Server className="w-5 h-5 text-primary" />
                        </div>
                      </FloatingCard>

                      <FloatingCard delay={1.7}>
                        <div className="absolute -bottom-2 -left-2 p-2 bg-card rounded-lg border border-border shadow-lg">
                          <Database className="w-5 h-5 text-primary" />
                        </div>
                      </FloatingCard>

                      <FloatingCard delay={1.9}>
                        <div className="absolute top-8 -left-4 p-2 bg-card rounded-lg border border-border shadow-lg">
                          <CloudLightning className="w-5 h-5 text-primary" />
                        </div>
                      </FloatingCard>
                    </div>

                    {/* Status Indicator */}
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm text-muted-foreground">
                          Currently available
                        </span>
                      </div>

                      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Code className="w-4 h-4" />
                          <span>Frontend</span>
                        </div>
                        <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                        <div className="flex items-center gap-1">
                          <Server className="w-4 h-4" />
                          <span>Backend</span>
                        </div>
                        <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                        <div className="flex items-center gap-1">
                          <CloudLightning className="w-4 h-4" />
                          <span>DevOps</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-muted-foreground"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};
