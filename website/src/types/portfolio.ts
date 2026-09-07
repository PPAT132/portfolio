import type { LucideIcon } from 'lucide-react';

export type Accent = 'cyan' | 'purple' | 'green' | 'pink' | 'yellow';

interface LinkBase {
  icon: LucideIcon;
  label: string;
  url: string;
}

export interface ExternalSocialLink extends LinkBase {
  kind: 'external';
}

export interface InternalSocialLink extends LinkBase {
  kind: 'internal';
}

export interface DownloadSocialLink extends LinkBase {
  kind: 'download';
  downloadName: string;
}

export type SocialLink =
  | ExternalSocialLink
  | InternalSocialLink
  | DownloadSocialLink;

export type FloatingSocialLink = SocialLink & {
  color: string;
  bgColor: string;
  borderColor: string;
};

export interface Action {
  icon: LucideIcon;
  label: string;
  targetId: 'projects' | 'contact';
  bgColor: string;
  shadow: string;
}

export interface DetailSection {
  section: string;
  items: readonly string[];
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  location: string;
  description: string;
  tech: readonly string[];
  website?: string;
  details?: readonly DetailSection[];
}

export interface ProjectWorkSection {
  section: string;
  items: readonly string[];
}

export type ProjectWork =
  | readonly string[]
  | readonly ProjectWorkSection[];

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: readonly string[];
  link: string | null;
  whyItMatters?: string;
  work: ProjectWork;
}

export const isSectionedProjectWork = (
  work: ProjectWork,
): work is readonly ProjectWorkSection[] =>
  work.length > 0 && typeof work[0] !== 'string';

export interface SkillGroup {
  label: string;
  accent: Accent;
  hoverClasses: string;
  skills: readonly string[];
}
