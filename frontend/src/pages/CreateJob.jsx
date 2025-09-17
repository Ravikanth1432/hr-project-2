// src/pages/CreateJob.jsx
import { useState } from "react";
import API from "../api";

export default function CreateJob(){
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [required_skills,setSkills]=useState("");

  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await API.post("/jobs", {title, description, required_skills});
      alert("Job created id: " + res.data.id);
      setTitle(""); setDescription(""); setSkills("");
    } catch(e){
      console.error(e);
      alert("Error creating job: " + (e.response?.data?.detail || e.message));
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Create Job</h2>
      <form onSubmit={submit}>
        <div><input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required/></div>
        <div style={{marginTop:6}}><input placeholder="Short description" value={description} onChange={e=>setDescription(e.target.value)} /></div>
        <div style={{marginTop:6}}><input placeholder="Required skills" value={required_skills} onChange={e=>setSkills(e.target.value)} /></div>
        <div style={{marginTop:8}}><button type="submit">Create Job</button></div>
      </form>
    </div>
  );
}
