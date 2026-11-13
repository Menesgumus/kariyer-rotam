import { APPLICATION_STATUSES, type Application, type ApplicationStatus } from './types';

const STORAGE_KEY = 'kariyer-rotam-applications';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function normalizeHttpUrl(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return null;
  }

  const candidate = /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

function isValidStatus(value: unknown): value is ApplicationStatus {
  return typeof value === 'string' && (APPLICATION_STATUSES as string[]).includes(value);
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

    return parsed
      .filter(
        (item): item is Application =>
          typeof item === 'object' &&
          item !== null &&
          typeof (item as Application).id === 'string' &&
          typeof (item as Application).company === 'string' &&
          typeof (item as Application).position === 'string' &&
          typeof (item as Application).appliedDate === 'string',
      )
      .map((item) => ({
        ...item,
        status: isValidStatus(item.status) ? item.status : 'Başvuruldu',
      }));
  } catch {
    return [];
  }
}

export function saveApplications(applications: Application[]): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    return true;
  } catch {
    return false;
  }
}
