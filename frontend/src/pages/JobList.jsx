// src/pages/JobList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function JobList(){
  const [jobs, setJobs] = useState([]);
  useEffect(()=>{
    API.get("/jobs").then(r => setJobs(r.data)).catch(err => {
      console.error(err);
      alert("Failed to fetch jobs. Is backend running?");
    });
  },[]);
  return (
    <div style={{padding:20}}>
      <h2>Jobs</h2>
      <ul>
        {jobs.map(j => (
          <li key={j.id}>
            <Link to={`/jobs/${j.id}`}>{j.title}</Link> — {j.required_skills}
          </li>
        ))}
      </ul>
      {jobs.length === 0 && <div>No jobs yet. Use "Create Job" to add one.</div>}
    </div>
  );
}
