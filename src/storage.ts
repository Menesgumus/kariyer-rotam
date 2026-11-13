import type { Application } from './types';

const STORAGE_KEY = 'kariyer-rotam-applications';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function loadApplications(): Application[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is Application =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as Application).id === 'string' &&
        typeof (item as Application).company === 'string' &&
        typeof (item as Application).position === 'string' &&
        typeof (item as Application).appliedDate === 'string' &&
        typeof (item as Application).status === 'string',
    );
  } catch {
    return [];
  }
}

export function saveApplications(applications: Application[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  } catch {
    // localStorage kullanılamıyorsa sessizce geç
  }
}
