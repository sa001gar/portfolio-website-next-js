"use client"

import type React from "react"

import { useState } from "react"
import { TerminalWindow } from "@/components/terminal-window"
import { TerminalText } from "@/components/terminal-text"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Simulate form submission
    try {
      // In a real app, you would send the form data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (err) {
      setError("There was an error submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-terminal-bright mb-6">
          <TerminalText text="Contact Me" typingDelay={80} />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <p className="text-terminal-green/80">
              I'm always interested in new opportunities, collaborations, or just a friendly chat about technology. Feel
              free to reach out through any of the channels below.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-terminal-bright mr-3 mt-1" />
                <div>
                  <h3 className="text-terminal-bright font-medium">Email</h3>
                  <a
                    href="mailto:hello@sagarkundu.com"
                    className="text-terminal-green hover:text-terminal-bright transition-colors"
                  >
                    hello@sagarkundu.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-terminal-bright mr-3 mt-1" />
                <div>
                  <h3 className="text-terminal-bright font-medium">Phone</h3>
                  <a
                    href="tel:+919876543210"
                    className="text-terminal-green hover:text-terminal-bright transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-terminal-bright mr-3 mt-1" />
                <div>
                  <h3 className="text-terminal-bright font-medium">Location</h3>
                  <p className="text-terminal-green">Bangalore, India</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-terminal-green/20">
              <h3 className="text-terminal-bright font-medium mb-3">Connect on Social Media</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/sagarkundu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-green hover:text-terminal-bright transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com/in/sagarkundu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-green hover:text-terminal-bright transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://twitter.com/sagarkundu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-green hover:text-terminal-bright transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <TerminalWindow title="contact_form.sh">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terminal-green/10 mb-4">
                    <Mail className="w-8 h-8 text-terminal-bright" />
                  </div>
                  <h3 className="text-xl font-bold text-terminal-bright mb-2">Message Sent!</h3>
                  <p className="text-terminal-green/80">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline" className="mt-4">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-terminal-bright text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-terminal-black border border-terminal-green/30 rounded-md px-3 py-2 text-terminal-green focus:outline-none focus:ring-1 focus:ring-terminal-bright focus:border-terminal-bright"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-terminal-bright text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-terminal-black border border-terminal-green/30 rounded-md px-3 py-2 text-terminal-green focus:outline-none focus:ring-1 focus:ring-terminal-bright focus:border-terminal-bright"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-terminal-bright text-sm font-medium mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-terminal-black border border-terminal-green/30 rounded-md px-3 py-2 text-terminal-green focus:outline-none focus:ring-1 focus:ring-terminal-bright focus:border-terminal-bright"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-terminal-bright text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-terminal-black border border-terminal-green/30 rounded-md px-3 py-2 text-terminal-green focus:outline-none focus:ring-1 focus:ring-terminal-bright focus:border-terminal-bright"
                    />
                  </div>

                  {error && <div className="text-red-500 text-sm">{error}</div>}

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </TerminalWindow>
          </div>
        </div>
      </div>
    </div>
  )
}
