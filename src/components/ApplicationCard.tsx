import type { Application } from '../types';

interface ApplicationCardProps {
  application: Application;
}

function formatDate(dateString: string): string {
  const parts = dateString.split('-');
  if (parts.length !== 3) {
    return dateString;
  }
  const [year, month, day] = parts;
  return `${day}.${month}.${year}`;
}

function normalizeUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  return `https://${url}`;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <article className="application-card">
      <div className="card-header">
        <div>
          <h3 className="card-company">{application.company}</h3>
          <p className="card-position">{application.position}</p>
        </div>
        <span className="status-badge">{application.status}</span>
      </div>

      <dl className="card-details">
        <div className="detail-row">
          <dt>Başvuru Tarihi:</dt>
          <dd>{formatDate(application.appliedDate)}</dd>
        </div>

        {application.jobUrl && (
          <div className="detail-row">
            <dt>İlan Bağlantısı:</dt>
            <dd>
              <a
                href={normalizeUrl(application.jobUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
              >
                İlanı Aç
              </a>
            </dd>
          </div>
        )}
      </dl>

      {application.note && <p className="card-note">{application.note}</p>}
    </article>
  );
}
