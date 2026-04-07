'use client';

export function Timeline() {
  const experiences = [
    {
      type: 'Experience',
      title: 'Senior Developer',
      company: 'Tech Startup',
      period: '2023 - Present',
      description: 'Leading frontend development with React and Next.js. Mentoring junior developers and architecting scalable solutions.'
    },
    {
      type: 'Experience',
      title: 'Full-Stack Developer',
      company: 'Digital Agency',
      period: '2021 - 2023',
      description: 'Built and maintained multiple client projects using modern web technologies. Implemented responsive designs and optimized performance.'
    },
    {
      type: 'Education',
      title: 'Bachelor of Science in Computer Science',
      company: 'University',
      period: '2017 - 2021',
      description: 'Focused on software engineering, data structures, and web development fundamentals.'
    }
  ];

  return (
    <section className="py-20 bg-secondary/20 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Experience & Education
          </h2>
          <p className="text-muted-foreground">
            My professional journey
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((item, index) => (
            <div key={`${item.title}-${index}`} className="relative pl-6 sm:pl-12">
              <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-foreground" />
              {index < experiences.length - 1 && (
                <div className="absolute left-1.5 top-5 w-0.5 h-20 bg-border" />
              )}
              
              <div className="space-y-2">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {item.type}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {item.period}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-accent/80 font-medium">
                  {item.company}
                </p>
                <p className="text-muted-foreground max-w-xl leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
