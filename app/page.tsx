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

export default function Home() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-terminal-bright">
                <TerminalText
                  text="Sagar Kundu"
                  typingDelay={80}
                  showCursor={false}
                />
              </h1>
              <h2 className="text-xl md:text-2xl text-terminal-green">
                <TerminalText
                  text="Full Stack Developer & ML Expert"
                  typingDelay={40}
                  showCursor={false}
                />
              </h2>
            </div>

            <p className="text-terminal-green/80 max-w-2xl">
              Software engineer with expertise in full stack development,
              machine learning, and cybersecurity. Building robust and scalable
              applications with modern technologies.
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
                src="/sagarkundu_square.avif"
                alt="Sagar Kundu"
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
                  <p>Software Engineer with expertise in:</p>
                  <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-sm sm:text-base">
                    <li>
                      Full Stack Web Development (Next.js, React, Django,
                      Node.js)
                    </li>
                    <li>Machine Learning (scikit-learn, TensorFlow)</li>
                    <li>DevOps & Cloud (AWS, Azure, Docker)</li>
                    <li>Cybersecurity (Bug Bounty achievements)</li>
                  </ul>
                </div>
              }
            />

            <TerminalCommand
              command="ls -la ./skills"
              output={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-2">
                  <div>
                    <p className="text-terminal-bright font-medium mb-1">
                      Frontend:
                    </p>
                    <ul className="text-xs sm:text-sm space-y-0.5">
                      <li>React.js</li>
                      <li>Next.js</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-terminal-bright font-medium mb-1">
                      Backend:
                    </p>
                    <ul className="text-xs sm:text-sm space-y-0.5">
                      <li>Node.js</li>
                      <li>Django</li>
                      <li>FastAPI</li>
                      <li>Supabase</li>
                    </ul>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <p className="text-terminal-bright font-medium mb-1">
                      DevOps:
                    </p>
                    <ul className="text-xs sm:text-sm space-y-0.5">
                      <li>Docker</li>
                      <li>AWS/Azure</li>
                      <li>CI/CD</li>
                      <li>Vercel/Netlify</li>
                    </ul>
                  </div>
                </div>
              }
            />

            <TerminalCommand
              command="cat ./featured-project.md"
              output={
                <div className="space-y-2">
                  <p className="text-terminal-bright font-bold text-sm sm:text-base">
                    Electricity Theft Detection System using ML
                  </p>
                    <p className="text-xs sm:text-sm leading-relaxed">
                    A machine learning tool designed to detect anomalies in the
                    electricity grid and generate detailed reports. Built using
                    Next.js, deep learning neural networks, TensorFlow, FastAPI,
                    and robust data pipelines.
                    </p>
                  <p className="text-terminal-green/70 text-xs sm:text-sm">
                    →{" "}
                    <Link
                      href="/project/electricity-theft-detection"
                      className="underline hover:text-terminal-bright break-words"
                    >
                      View project details
                    </Link>
                  </p>
                </div>
              }
            />

            <CommandLine autoFocus />
          </TerminalWindow>
        </section>

        {/* Quick Links Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/projects" className="group">
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
