"use client";

import { useEffect } from "react";
import Image from "next/image";
import { TerminalWindow } from "@/components/terminal-window";
import { TerminalCommand } from "@/components/terminal-command";
import { CommandLine } from "@/components/command-line";
import { TerminalText } from "@/components/terminal-text";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Code,
  Briefcase,
  FileText,
  User,
  Mail,
} from "lucide-react";

interface HomePageClientProps {
  profile: any;
  skills: any[];
  featuredProject: any;
}

export default function HomePageClient({ profile, skills, featuredProject }: HomePageClientProps) {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc: any, skill) => {
    const category = skill.category || "Other"
    if (!acc[category]) acc[category] = []
    acc[category].push(skill.name)
    return acc
  }, {})

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-terminal-bright">
                <TerminalText
                  text={profile?.full_name || "Sagar Kundu"}
                  typingDelay={80}
                  showCursor={false}
                />
              </h1>
              <h2 className="text-xl md:text-2xl text-terminal-green">
                <TerminalText
                  text={profile?.title || "Full Stack Developer"}
                  typingDelay={40}
                  showCursor={false}
                />
              </h2>
            </div>

            <p className="text-terminal-green/80 max-w-2xl">
              {profile?.bio || "Building robust and scalable applications with modern technologies."}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/project">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Me</Link>
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-terminal-green/30 shadow-glow">
              <Image
                src={profile?.avatar_url || "/sagarkundu_square.avif"}
                alt={profile?.full_name || "Profile"}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Terminal Section - Mobile Responsive */}
        <section>
          <TerminalWindow title="sagar@kundu:~/portfolio">
            <TerminalCommand
              command="whoami"
              output={
                <div className="space-y-2">
                  <p>{profile?.title}</p>
                  <p className="text-sm text-terminal-green/70">{profile?.location}</p>
                </div>
              }
            />

            <TerminalCommand
              command="ls -la ./skills"
              output={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-2">
                  {Object.entries(groupedSkills).map(([category, skillNames]: [string, any]) => (
                    <div key={category}>
                      <p className="text-terminal-bright font-medium mb-1">
                        {category}:
                      </p>
                      <ul className="text-xs sm:text-sm space-y-0.5">
                        {skillNames.map((name: string) => (
                          <li key={name}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              }
            />

            {featuredProject && (
              <TerminalCommand
                command="cat ./featured-project.md"
                output={
                  <div className="space-y-2">
                    <p className="text-terminal-bright font-bold text-sm sm:text-base">
                      {featuredProject.title}
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed max-w-xl">
                      {featuredProject.description}
                    </p>
                    <p className="text-terminal-green/70 text-xs sm:text-sm">
                      →{" "}
                      <Link
                        href={`/project/${featuredProject.slug}`}
                        className="underline hover:text-terminal-bright break-words"
                      >
                        View project details
                      </Link>
                    </p>
                  </div>
                }
              />
            )}

            <CommandLine autoFocus />
          </TerminalWindow>
        </section>

        {/* Quick Links Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/project" className="group">
            <div className="border border-terminal-green/20 rounded-md p-4 hover:border-terminal-green/50 hover:bg-terminal-green/5 transition-all duration-300">
              <div className="flex items-center mb-3">
                <Code className="h-5 w-5 text-terminal-bright mr-2" />
                <h3 className="text-lg font-medium text-terminal-bright">
                  Projects
                </h3>
              </div>
              <p className="text-terminal-green/80 text-sm mb-2">
                Explore my portfolio of web applications, ML models, and
                open-source contributions.
              </p>
              <span className="text-terminal-green text-xs group-hover:text-terminal-bright transition-colors">
                View projects →
              </span>
            </div>
          </Link>

          <Link href="/experience" className="group">
            <div className="border border-terminal-green/20 rounded-md p-4 hover:border-terminal-green/50 hover:bg-terminal-green/5 transition-all duration-300">
              <div className="flex items-center mb-3">
                <Briefcase className="h-5 w-5 text-terminal-bright mr-2" />
                <h3 className="text-lg font-medium text-terminal-bright">
                  Experience
                </h3>
              </div>
              <p className="text-terminal-green/80 text-sm mb-2">
                My professional journey, skills, and achievements in software
                development.
              </p>
              <span className="text-terminal-green text-xs group-hover:text-terminal-bright transition-colors">
                View experience →
              </span>
            </div>
          </Link>

          <Link href="/blog" className="group">
            <div className="border border-terminal-green/20 rounded-md p-4 hover:border-terminal-green/50 hover:bg-terminal-green/5 transition-all duration-300">
              <div className="flex items-center mb-3">
                <FileText className="h-5 w-5 text-terminal-bright mr-2" />
                <h3 className="text-lg font-medium text-terminal-bright">
                  Blog
                </h3>
              </div>
              <p className="text-terminal-green/80 text-sm mb-2">
                Technical articles, tutorials, and insights on software
                development.
              </p>
              <span className="text-terminal-green text-xs group-hover:text-terminal-bright transition-colors">
                Read articles →
              </span>
            </div>
          </Link>

          <Link href="/about" className="group">
            <div className="border border-terminal-green/20 rounded-md p-4 hover:border-terminal-green/50 hover:bg-terminal-green/5 transition-all duration-300">
              <div className="flex items-center mb-3">
                <User className="h-5 w-5 text-terminal-bright mr-2" />
                <h3 className="text-lg font-medium text-terminal-bright">
                  About
                </h3>
              </div>
              <p className="text-terminal-green/80 text-sm mb-2">
                Learn more about my background, interests, and technical
                expertise.
              </p>
              <span className="text-terminal-green text-xs group-hover:text-terminal-bright transition-colors">
                About me →
              </span>
            </div>
          </Link>

          <Link href="/contact" className="group">
            <div className="border border-terminal-green/20 rounded-md p-4 hover:border-terminal-green/50 hover:bg-terminal-green/5 transition-all duration-300">
              <div className="flex items-center mb-3">
                <Mail className="h-5 w-5 text-terminal-bright mr-2" />
                <h3 className="text-lg font-medium text-terminal-bright">
                  Contact
                </h3>
              </div>
              <p className="text-terminal-green/80 text-sm mb-2">
                Get in touch for collaboration, job opportunities, or just to
                say hello.
              </p>
              <span className="text-terminal-green text-xs group-hover:text-terminal-bright transition-colors">
                Contact me →
              </span>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
}
