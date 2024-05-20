import { Job } from '@/app/lib/interfaces/JobInterface';

export default class JobService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = 'http://localhost:8080/api';
  }

  public async addJob(job: Job): Promise<void> {
    await fetch(`http://localhost:8080/api/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
  }

  public async deleteJob(id: number): Promise<void> {
    await fetch(`${this.apiUrl}/jobs/${id}`, {
      method: 'DELETE',
    });
  }

  public async updateJob(job: Job): Promise<void> {
    if (!job.id) {
      throw new Error('Job ID is required for updating a job');
    }

    await fetch(`${this.apiUrl}/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
  }

  public async getAllJobs(param: string = ''): Promise<Job[]> {
    const response = await fetch(`${this.apiUrl}/jobs${param}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }

    const jobs: Job[] = await response.json();
    return jobs;
  }

  public async getJobById(id: number): Promise<Job> {
    const response = await fetch(`${this.apiUrl}/jobs/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch job');
    }

    const job: Job = await response.json();
    return job;
  }
}
