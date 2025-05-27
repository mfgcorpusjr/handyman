export type Location = {
  id: number;
  name: string;
};

export type Task = {
  id: number;
  location_id: number;
  title: string;
  description: string;
  image_uri: string | null;
  is_urgent: boolean;
};
