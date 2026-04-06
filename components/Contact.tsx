'use client';

import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export function Contact() {
  const links = [
    { icon: Github, label: 'GitHub', href: 'https://github.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: Mail, label: 'Email', href: 'mailto:hello@example.com' },
  ];

  return (
    <footer className="bg-foreground text-background py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Get in Touch
          </h2>
          <p className="text-lg text-background/80 max-w-xl leading-relaxed">
            I&apos;m always interested in hearing about new projects and opportunities. Feel free to reach out if you&apos;d like to connect.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {links.map(({ icon: Icon, label, href }) => (
            <Button
              key={label}
              variant="outline"
              size="lg"
              className="bg-transparent border-background text-background hover:bg-background/20"
              asChild
            >
              <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Icon size={20} />
                {label}
              </a>
            </Button>
          ))}
        </div>

        <div className="pt-8 border-t border-background/20">
          <p className="text-sm text-background/60">
            © 2024 Pavithran. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
