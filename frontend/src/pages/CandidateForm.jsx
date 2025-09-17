// src/pages/CandidateForm.jsx
import { useState } from "react";
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
}
