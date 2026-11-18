import { Link, Navigate, Route, Routes } from "react-router-dom";

function Welcome() {
  return <main className="shell"><div className="card"><p className="eyebrow">🌱 SkillTrack</p><h1>Grow one skill at a time.</h1><p>Project foundation is ready for implementation. Authentication, dashboard, and skill tracking will be built in Phase 5.</p><Link to="/about">About this scaffold</Link></div></main>;
}
export default function App() {
  return <Routes><Route path="/" element={<Welcome />} /><Route path="/about" element={<main className="shell"><div className="card"><h1>SkillTrack Foundation</h1><p>React + TypeScript + Vite.</p><Link to="/">Home</Link></div></main>} /><Route path="*" element={<Navigate to="/" replace />} /></Routes>;
}
