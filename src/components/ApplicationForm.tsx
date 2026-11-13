import { useState, type FormEvent } from 'react';
import { getTodayDateString, normalizeHttpUrl } from '../storage';
import type { NewApplicationInput } from '../types';

interface ApplicationFormProps {
  onAdd: (input: NewApplicationInput) => void;
}

export function ApplicationForm({ onAdd }: ApplicationFormProps) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [appliedDate, setAppliedDate] = useState(getTodayDateString);
  const [jobUrl, setJobUrl] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedCompany = company.trim();
    const trimmedPosition = position.trim();
    const trimmedDate = appliedDate.trim();

    if (!trimmedCompany || !trimmedPosition || !trimmedDate) {
      const missing: string[] = [];
      if (!trimmedCompany) missing.push('Şirket adı');
      if (!trimmedPosition) missing.push('Pozisyon');
      if (!trimmedDate) missing.push('Başvuru tarihi');
      setError(`Lütfen zorunlu alanları doldurun: ${missing.join(', ')}.`);
      return;
    }

    const trimmedUrl = jobUrl.trim();
    let normalizedUrl: string | undefined;
    if (trimmedUrl) {
      const safeUrl = normalizeHttpUrl(trimmedUrl);
      if (!safeUrl) {
        setError('Lütfen geçerli bir http veya https ilan bağlantısı girin.');
        return;
      }
      normalizedUrl = safeUrl;
    }

    const trimmedNote = note.trim();

    onAdd({
      company: trimmedCompany,
      position: trimmedPosition,
      appliedDate: trimmedDate,
      jobUrl: normalizedUrl,
      note: trimmedNote || undefined,
    });

    setCompany('');
    setPosition('');
    setAppliedDate(getTodayDateString());
    setJobUrl('');
    setNote('');
    setError('');
  }

  return (
    <section className="form-section" aria-labelledby="form-heading">
      <h2 id="form-heading" className="section-title">
        Yeni Başvuru Ekle
      </h2>

      <form className="application-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="company">
              Şirket Adı <span className="required-mark">*</span>
            </label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="Örn. Acme Teknoloji"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="position">
              Pozisyon <span className="required-mark">*</span>
            </label>
            <input
              id="position"
              name="position"
              type="text"
              placeholder="Örn. Frontend Stajyeri"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="appliedDate">
              Başvuru Tarihi <span className="required-mark">*</span>
            </label>
            <input
              id="appliedDate"
              name="appliedDate"
              type="date"
              value={appliedDate}
              onChange={(e) => setAppliedDate(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="jobUrl">İlan Bağlantısı</label>
            <input
              id="jobUrl"
              name="jobUrl"
              type="url"
              placeholder="https://..."
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="note">Not</label>
          <textarea
            id="note"
            name="note"
            rows={2}
            placeholder="Başvuruyla ilgili kısa bir not ekleyebilirsiniz..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Başvuru Ekle
          </button>
        </div>
      </form>
    </section>
  );
}
