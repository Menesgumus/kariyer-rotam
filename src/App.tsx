import { useEffect, useState } from 'react';
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

  useEffect(() => {
    saveApplications(applications);
  }, [applications]);

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

    setApplications((prev) => [newApplication, ...prev]);
  }

  function handleStatusChange(id: string, status: ApplicationStatus) {
    setApplications((prev) =>
      prev.map((application) =>
        application.id === id ? { ...application, status } : application,
      ),
    );
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
