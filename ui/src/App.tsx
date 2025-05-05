import { useEffect, useState } from 'react';
import './App.css';

const BACKEND_URL = '/api';

export type Bird = {
  id?: number;
  name: string;
  description: string;
  picture: string;
  link: string;
};

function App() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [form, setForm] = useState<Bird>({ name: '', description: '', picture: '', link: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBirds = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log(`${BACKEND_URL}/birds`);
      const res = await fetch(`${BACKEND_URL}/birds`);
      console.log(res);
      const data = await res.json();
      setBirds(data);
    } catch (err) {
      setError('Failed to fetch birds');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBirds();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${BACKEND_URL}${editingId ? `/birds/${editingId}` : '/birds'}`,
        {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error('Failed to save bird');
      setForm({ name: '', description: '', picture: '', link: '' });
      setEditingId(null);
      fetchBirds();
    } catch (err) {
      setError('Failed to save bird');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (bird: Bird) => {
    setForm({ name: bird.name, description: bird.description, picture: bird.picture, link: bird.link });
    setEditingId(bird.id!);
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/birds/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete bird');
      fetchBirds();
    } catch (err) {
      setError('Failed to delete bird');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Birds CRUD</h1>
      <form onSubmit={handleSubmit} className="bird-form">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="picture"
          placeholder="Picture URL"
          value={form.picture}
          onChange={handleChange}
        />
        <input
          name="link"
          placeholder="More details link"
          value={form.link}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {editingId ? 'Update Bird' : 'Add Bird'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', description: '', picture: '', link: '' }); }}>
            Cancel
          </button>
        )}
      </form>
      {error && <div className="error">{error}</div>}
      {loading && <div>Loading...</div>}
      <div className="bird-list">
        {birds.map((bird) => (
          <div key={bird.id} className="bird-card">
            {bird.picture && <img src={bird.picture} alt={bird.name} className="bird-img" />}
            <h2>{bird.name}</h2>
            <p>{bird.description}</p>
            {bird.link && <a href={bird.link} target="_blank" rel="noopener noreferrer">More details</a>}
            <div className="actions">
              <button onClick={() => handleEdit(bird)}>Edit</button>
              <button onClick={() => bird.id && handleDelete(bird.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
