// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CandidateForm from "./pages/CandidateForm";
import CreateJob from "./pages/CreateJob";
import JobList from "./pages/JobList";
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/candidates" style={{ marginRight: "10px" }}>Candidates</Link>
        <Link to="/jobs" style={{ marginRight: "10px" }}>Jobs</Link>
        <Link to="/jobs/new">Create Job</Link>
      </nav>

      <Routes>
        {/* Candidates */}
        <Route path="/candidates" element={<CandidateForm />} />

        {/* Jobs */}
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/new" element={<CreateJob />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Routes>
    </Router>
  );
}

export default App;


/*import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import JobList from "./pages/JobList";
import JobDetails from "./pages/JobDetails";
import CandidateForm from "./pages/CandidateForm";
import CreateJob from "./pages/CreateJob";

export default function App(){
  return (
    <BrowserRouter>
      <nav style={{padding:10, borderBottom:"1px solid #ddd"}}>
        <Link to="/">Jobs</Link> |{" "}
        <Link to="/jobs/new">Create Job</Link> |{" "}
        <Link to="/candidates/new">Add Candidate</Link>
      </nav>

      <Routes>
        <Route path="/" element={<JobList/>}/>
        <Route path="/jobs/:id" element={<JobDetails/>}/>
        <Route path="/jobs/new" element={<CreateJob/>}/>
        <Route path="/candidates/new" element={<CandidateForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}*/
