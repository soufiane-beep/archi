export type ProjectSpecs = {
  surface: string;
  duration: string;
  budget: string;
  team: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  specs: ProjectSpecs;
  featured: boolean;
  color: string;
  displayOrder: number;
  model3d?: string | null;
};
