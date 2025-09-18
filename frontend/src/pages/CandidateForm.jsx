// src/pages/CandidateForm.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function CandidateForm() {
  const [candidates, setCandidates] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", skills: ""});
  const [editingId, setEditingId] = useState(null);

  // Load candidates when page loads
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(`${API_URL}/candidates`);
      setCandidates(res.data);
    } catch (err) {
      console.error("Error fetching candidates", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update candidate
        await axios.put(`${API_URL}/candidates/${editingId}`, form);
        setEditingId(null);
      } else {
        // Create new candidate
        await axios.post(`${API_URL}/candidates`, form);
      }
      setForm({ name: "", email: "", skills: "" }); // reset form
      fetchCandidates(); // refresh list
    } catch (err) {
      console.error("Error saving candidate", err);
    }
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Delete this candidate? This cannot be undone.")) return;
  try {
    await axios.delete(`${API_URL}/candidates/${id}`);
    fetchCandidates();
  } catch (err) {
    console.error("Error deleting candidate", err);
    alert("Failed to delete candidate");
  }
};


  const handleEdit = (candidate) => {
    setForm({
      name: candidate.name,
      email: candidate.email,
      skills: candidate.skills,
    });
    setEditingId(candidate.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{editingId ? "Edit Candidate" : "Create Candidate"}</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Skills"
          value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
        />
        <button type="submit">
          {editingId ? "Update Candidate" : "Add Candidate"}
        </button>
      </form>

      <h3>Candidate List</h3>
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Skills</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.skills}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


/*import { useState } from "react";
import API from "../api";

export default function CandidateForm(){
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [skills,setSkills]=useState("");

  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await API.post("/candidates", {name, email, skills});
      alert("Candidate created. id: " + res.data.id);
      setName(""); setEmail(""); setSkills("");
    } catch(e){
      console.error(e);
      alert("Error creating candidate: " + (e.response?.data?.detail || e.message));
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Create Candidate</h2>
      <form onSubmit={submit}>
        <div><input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required/></div>
        <div style={{marginTop:6}}><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
        <div style={{marginTop:6}}><input placeholder="Skills (comma separated)" value={skills} onChange={e=>setSkills(e.target.value)}/></div>
        <div style={{marginTop:8}}><button type="submit">Create</button></div>
      </form>
    </div>
  );
}*/
