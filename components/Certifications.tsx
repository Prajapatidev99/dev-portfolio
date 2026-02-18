
import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialUrl?: string;
  tags: string[];
  isComingSoon?: boolean;
}

const certificates: Certificate[] = [
  {
    title: 'Data Analytics and Visualization Job Simulation',
    issuer: 'Accenture North America · Forage',
    date: 'July 2025',
    description:
      'Completed a job simulation involving data analytics and visualization for a social media client. Cleaned and modelled datasets to uncover content trends, and prepared a PowerPoint deck and video presentation to communicate key insights to stakeholders.',
    credentialUrl:
      'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_Lo5uHfbvvTpdeLN5a_1751994439112_completion_certificate.pdf',
    tags: ['Data Analytics', 'Data Visualization', 'Excel', 'PowerPoint', 'Storytelling'],
  },
  {
    title: 'Web Development Fundamentals',
    issuer: 'Self-Paced / Online Certification',
    date: '',
    description: 'Focused on responsive design principles and modern JavaScript frameworks.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
];

const Certifications: React.FC = () => {
  return (
    <div>
      <h2 className="text-sm font-semibold tracking-widest text-zinc-500 uppercase mb-12">
        Recognition
      </h2>
      <div className="max-w-3xl space-y-8">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="flex items-start gap-6 p-6 rounded-2xl glass group transition-all duration-300 hover:bg-white/5"
          >
            <div className="p-3 bg-white/5 rounded-xl shrink-0">
              <Award className="text-zinc-400 group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div>
                  <h4 className="text-lg font-bold mb-1 leading-snug">{cert.title}</h4>
                  <p className="text-zinc-500 text-sm mb-1">{cert.issuer}</p>
                  {cert.date && (
                    <p className="text-zinc-600 text-xs mb-3">{cert.date}</p>
                  )}
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg transition-all duration-200 shrink-0 mt-1"
                  >
                    <ExternalLink size={12} />
                    View Certificate
                  </a>
                )}
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">{cert.description}</p>
              <div className="flex flex-wrap gap-2">
                {cert.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
