
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  images?: string[];
  liveLink?: string;
  githubLink?: string;
  tags: string[];
  type: 'web' | 'system' | 'automation' | 'other';
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}
