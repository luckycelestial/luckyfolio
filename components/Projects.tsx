'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce application with product catalog, shopping cart, and payment integration.',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    link: 'https://github.com'
  },
  {
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates and team collaboration features.',
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'WebSockets'],
    link: 'https://github.com'
  },
  {
    title: 'AI Content Generator',
    description: 'Web application that uses AI to generate creative content with customizable parameters.',
    technologies: ['Next.js', 'OpenAI API', 'React', 'Vercel'],
    link: 'https://github.com'
  }
];

export function Projects() {
  return (
    <section className="py-20 bg-background px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Featured Projects
          </h2>
          <p className="text-muted-foreground">
            A selection of my recent work
          </p>
        </div>

        <div className="grid gap-6 md:gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className="group overflow-hidden border-border hover:border-accent hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <CardTitle className="text-2xl text-foreground">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                      {project.description}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                    asChild
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ArrowUpRight size={20} />
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-secondary text-foreground text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
