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
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  ArrowRight,
  Star,
  Filter,
  Tag,
  TrendingUp,
} from "lucide-react";
import portfolioConfig from "../../data/portfolio-config.json";
import { Item } from "@radix-ui/react-menubar";

const categoryColors = {
  DevOps: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Frontend: "bg-green-500/10 text-green-500 border-green-500/20",
  Backend: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "Full-Stack": "bg-orange-500/10 text-orange-500 border-orange-500/20",
};

const BlogCard = ({ post, index }: { post: any; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group h-full"
    >
      <Card className="h-full border-primary/20 bg-card/80 backdrop-blur-sm hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 overflow-hidden">
        {/* Featured Badge */}
        {post.featured && (
          <div className="relative">
            <div className="absolute top-4 right-4 z-10">
              <Badge
                variant="default"
                className="text-xs px-2 py-1 bg-primary/90 text-primary-foreground"
              >
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          </div>
        )}

        {/* Blog Image Placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
            <img src={post.image} alt="post-image" />
          </div>

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

          {/* Read Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <Button size="sm" variant="secondary" className="backdrop-blur-sm">
              <BookOpen className="w-4 h-4 mr-2" />
              Read Article
            </Button>
          </div>
        </div>

        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className={`text-xs px-2 py-0.5 ${
                  categoryColors[
                    post.category as keyof typeof categoryColors
                  ] || "border-primary/10"
                }`}
              >
                {post.category}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </CardTitle>

          <CardDescription className="text-muted-foreground leading-relaxed line-clamp-3">
            {post.excerpt}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0 flex-1 flex flex-col">
          {/* Tags */}
          <div className="mb-4 flex-1">
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-primary/5 text-primary/80 border-primary/10"
                >
                  #{tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-primary/5 text-primary/80 border-primary/10"
                >
                  +{post.tags.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Read More Button */}
          <div className="mt-auto">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between text-xs p-3 h-auto hover:bg-primary/5 group/btn"
            >
              <span>Read Full Article</span>
              <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = [
    ...new Set(portfolioConfig.blog.map((post) => post.category)),
  ];
  const filteredPosts = selectedCategory
    ? portfolioConfig.blog.filter((post) => post.category === selectedCategory)
    : portfolioConfig.blog;

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
    <section id="blog" className="py-20 bg-card/30">
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
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                Latest Writing
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Blog & Articles
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I share insights about web development, DevOps practices, and
              technology trends. Here are my latest thoughts and tutorials on
              building better software.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 transition-all duration-300 ${
                selectedCategory === null
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              All Posts
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                <Tag className="w-4 h-4 mr-2" />
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* Featured Post Highlight */}
          {portfolioConfig.blog.some((post) => post.featured) && (
            <motion.div variants={itemVariants} className="mt-16">
              <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        <Badge
                          variant="default"
                          className="px-3 py-1 bg-primary/90 text-primary-foreground"
                        >
                          Most Popular
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {
                          portfolioConfig.blog.find((post) => post.featured)
                            ?.title
                        }
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {
                          portfolioConfig.blog.find((post) => post.featured)
                            ?.excerpt
                        }
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {portfolioConfig.blog
                          .find((post) => post.featured)
                          ?.tags.slice(0, 4)
                          .map((tag: string) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs px-2 py-0.5 border-primary/10"
                            >
                              #{tag}
                            </Badge>
                          ))}
                      </div>
                      <Button
                        size="lg"
                        className="px-8 py-3 bg-primary hover:bg-primary/90 transition-all duration-300 group"
                      >
                        <BookOpen className="w-5 h-5 mr-2" />
                        <span>Read Featured Article</span>
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center text-8xl opacity-30">
                        <img
                          src={
                            portfolioConfig.blog.find((post) => post.featured)
                              ?.image || "/main.jpg"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Blog CTA */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <Card className="max-w-2xl mx-auto border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Want to read more?
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Follow me on Medium and Dev.to for more articles about web
                  development, DevOps practices, and technology insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/20 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                    onClick={() =>
                      window.open("https://github.com/Prabin70", "_blank")
                    }
                  >
                    Follow on Github
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    className="bg-primary  cursor-pointer hover:bg-primary/90 transition-all duration-300"
                    onClick={() =>
                      window.open("https://dev.to/prabin70", "_blank")
                    }
                  >
                    Follow on Dev.to
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
