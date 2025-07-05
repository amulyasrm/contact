import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  // Fetch contacts on load
  useEffect(() => {
    fetch('http://localhost:5000/contacts')
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  // Handle form input
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new contact
  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('http://localhost:5000/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ name: '', email: '', phone: '' });
    
    // Refresh contacts
    const res = await fetch('http://localhost:5000/contacts');
    const data = await res.json();
    setContacts(data);
  };

  return (
    <div className="App">
      <h1>📇 Contact Keeper</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <button type="submit">Add Contact</button>
      </form>

      <h2>Saved Contacts:</h2>
      <ul>
        {contacts.map((c, i) => (
          <li key={i}>
            <strong>{c.name}</strong> | {c.email} | {c.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
