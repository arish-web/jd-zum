import { useState } from 'react';
import Notiflix from 'notiflix';

const AppointmentForm = () => {
  const [form, setForm] = useState({ name: '', date: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        Notiflix.Notify.success('Appointment submitted!');
        setForm({ name: '', date: '', message: '' });
      } else {
        Notiflix.Notify.failure('Failed to submit');
      }
    } catch {
      Notiflix.Notify.failure('Error contacting server');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <textarea
        placeholder="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;
