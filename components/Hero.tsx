'use client';

import { Button } from '@/components/ui/button';
import { Github, Linkedin, FileText } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-6 py-20">
      <div className="w-full max-w-3xl animate-fade-in">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground">
              Pavithran
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground font-light">
              Full-Stack Developer
            </p>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            I build modern web applications with React and Next.js. Passionate about creating clean, scalable code and intuitive user experiences.
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button 
              variant="default" 
              size="lg"
              className="bg-foreground text-background hover:bg-muted-foreground"
              asChild
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github size={20} />
                GitHub
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-foreground text-foreground hover:bg-secondary"
              asChild
            >
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Linkedin size={20} />
                LinkedIn
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-foreground text-foreground hover:bg-secondary"
              asChild
            >
              <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <FileText size={20} />
                Resume
              </a>
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        :global(.animate-fade-in) {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}
