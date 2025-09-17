// src/pages/JobDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function JobDetails(){
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [candidateId, setCandidateId] = useState("");

  useEffect(()=> {
    API.get(`/jobs/${id}`).then(r => setJob(r.data)).catch(e=>{
      console.error(e);
      alert("Failed to load job.");
    });
  },[id]);

  const apply = async () => {
    if(!candidateId) { alert("Enter candidate id"); return; }
    try{
      await API.post(`/jobs/${id}/apply`, { candidate_id: Number(candidateId) });
      alert("Applied successfully");
      // refresh job to see applicants
      const r = await API.get(`/jobs/${id}`);
      setJob(r.data);
    } catch(e){
      console.error(e);
      alert("Error: " + (e.response?.data?.detail || e.message));
    }
  };

  if(!job) return <div style={{padding:20}}>Loading...</div>;
  return (
    <div style={{padding:20}}>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <p><strong>Required:</strong> {job.required_skills}</p>

      <h3>Applicants</h3>
      <ul>
        {job.applicants && job.applicants.length ? job.applicants.map(a => (
          <li key={a.id}>{a.name} — {a.email}</li>
        )) : <li>No applicants yet</li>}
      </ul>

      <hr/>
      <h3>Apply</h3>
      <div>
        <input value={candidateId} onChange={e=>setCandidateId(e.target.value)} placeholder="candidate id" />
        <button onClick={apply} style={{marginLeft:8}}>Apply</button>
      </div>
      <p style={{marginTop:8,fontSize:13,color:"#555"}}>Tip: create a candidate first to get an id (use Add Candidate).</p>
    </div>
  );
}
