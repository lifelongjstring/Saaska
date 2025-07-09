export type Application = {
    company: string;
    title: string;
    status: 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'Hired';
    dateApplied: string;
    interviewDate?: string;
    city: string;
    state: string;
    offerSalary?: number;
  };
  
  export const citiesList = ['New York', 'San Francisco', 'Austin', 'Chicago', 'Toronto'];
  export const usStateList = ['NY', 'CA', 'TX', 'IL', 'ON'];
  
  export const applicationsData: Application[] = [
    {
      company: 'Google',
      title: 'Frontend Developer',
      status: 'Applied',
      dateApplied: '2025-06-01',
      city: 'San Francisco',
      state: 'CA',
    },
    {
      company: 'Microsoft',
      title: 'Software Engineer',
      status: 'Interview',
      dateApplied: '2025-05-15',
      interviewDate: '2025-06-20T13:00',
      city: 'Redmond',
      state: 'WA',
    },
    {
      company: 'IBM',
      title: 'Backend Developer',
      status: 'Offer',
      dateApplied: '2025-05-01',
      interviewDate: '2025-05-20T10:00',
      city: 'New York',
      state: 'NY',
      offerSalary: 120000,
    },
    {
      company: 'Amazon',
      title: 'DevOps Engineer',
      status: 'Rejected',
      dateApplied: '2025-04-10',
      city: 'Seattle',
      state: 'WA',
    },
  ];
  