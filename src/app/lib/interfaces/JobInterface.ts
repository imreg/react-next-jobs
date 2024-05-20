interface Type {
  id: number;
  type: string;
  title: string;
}

interface Company {
  id?: number;
  name: string;
  description: string;
  email: string;
  phone: string;
}

export interface Job {
  id?: number;
  type: {
    id: number;
    title: string;
  }
  title: string;
  description: string;
  salary: string;
  location: string;
  company: {
    id?: number;
    name: string;
    description: string;
    email: string;
    phone: string;
  }
}
