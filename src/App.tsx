import { useState } from 'react';
import { ApplicationCard } from './components/ApplicationCard';
import { ApplicationForm } from './components/ApplicationForm';
import { loadApplications, saveApplications } from './storage';
import type { Application, ApplicationStatus, NewApplicationInput } from './types';
import './App.css';

function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function App() {
  const [applications, setApplications] = useState<Application[]>(loadApplications);
  const [storageError, setStorageError] = useState(false);

  function handleAddApplication(input: NewApplicationInput) {
    const newApplication: Application = {
      id: createId(),
      company: input.company,
      position: input.position,
      appliedDate: input.appliedDate,
      jobUrl: input.jobUrl,
      note: input.note,
      status: 'Başvuruldu',
    };

    const nextApplications = [newApplication, ...applications];
    setApplications(nextApplications);
    setStorageError(!saveApplications(nextApplications));
  }

  function handleStatusChange(id: string, status: ApplicationStatus) {
    const nextApplications = applications.map((application) =>
      application.id === id ? { ...application, status } : application,
    );
    setApplications(nextApplications);
    setStorageError(!saveApplications(nextApplications));
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Kariyer Rotam</h1>
        <p className="page-subtitle">
          İş ve staj başvurularınızı tek bir yerden kolayca takip edin.
        </p>
      </header>

      <main className="main-content">
        {storageError && (
          <p className="form-error" role="alert">
            Veriler tarayıcıya kaydedilemedi. Tarayıcı depolama alanı dolu veya kapalı olabilir.
          </p>
        )}

        <ApplicationForm onAdd={handleAddApplication} />

        <section className="list-section" aria-labelledby="list-heading">
          <h2 id="list-heading" className="section-title">
            Başvurularım
          </h2>

          {applications.length === 0 ? (
            <p className="empty-state">Henüz başvuru eklemediniz.</p>
          ) : (
            <div className="cards-grid">
              {applications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
