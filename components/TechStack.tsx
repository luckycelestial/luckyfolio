'use client';

export function TechStack() {
  const technologies = [
    'React', 'Next.js', 'TypeScript', 'JavaScript',
    'Tailwind CSS', 'Node.js', 'PostgreSQL', 'MongoDB',
    'GraphQL', 'REST APIs', 'Git', 'Docker'
  ];

  return (
    <section className="py-20 bg-secondary/20 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Tech Stack
          </h2>
          <p className="text-muted-foreground">
            Tools and technologies I work with
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {technologies.map((tech, index) => (
            <div
              key={tech}
              className="px-4 py-3 bg-card border border-border rounded-lg text-foreground font-medium text-center hover:border-accent hover:shadow-md transition-all duration-300"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
