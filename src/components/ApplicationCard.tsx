import { normalizeHttpUrl } from '../storage';
import { APPLICATION_STATUSES, type Application, type ApplicationStatus } from '../types';

interface ApplicationCardProps {
  application: Application;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
}

function formatDate(dateString: string): string {
  const parts = dateString.split('-');
  if (parts.length !== 3) {
    return dateString;
  }
  const [year, month, day] = parts;
  return `${day}.${month}.${year}`;
}

export function ApplicationCard({ application, onStatusChange }: ApplicationCardProps) {
  const selectId = `status-${application.id}`;
  const safeJobUrl = application.jobUrl ? normalizeHttpUrl(application.jobUrl) : null;
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

        {safeJobUrl && (
          <div className="detail-row">
            <dt>İlan Bağlantısı:</dt>
            <dd>
              <a
                href={safeJobUrl}
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

      <div className="card-status-control">
        <label htmlFor={selectId}>Başvuru Durumu:</label>
        <select
          id={selectId}
          className="status-select"
          value={application.status}
          onChange={(e) =>
            onStatusChange(application.id, e.target.value as ApplicationStatus)
          }
        >
          {APPLICATION_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </article>
  );
}
