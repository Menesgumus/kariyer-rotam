export type ApplicationStatus = 'Başvuruldu' | 'Görüşme' | 'Teklif' | 'Olumsuz';

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  'Başvuruldu',
  'Görüşme',
  'Teklif',
  'Olumsuz',
];

export interface Application {
  id: string;
  company: string;
  position: string;
  appliedDate: string;
  jobUrl?: string;
  note?: string;
  status: ApplicationStatus;
}

export interface NewApplicationInput {
  company: string;
  position: string;
  appliedDate: string;
  jobUrl?: string;
  note?: string;
}
