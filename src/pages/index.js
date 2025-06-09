import { useState } from "react";
import ResultsTable from "../components/ResultsTable";

export default function Home() {
  const [form, setForm] = useState({
    rank: "",
    branch: "CSE",
    region: "AU",
    caste: "OC",
    gender: "BOYS",
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    const params = new URLSearchParams(form).toString();
    const res = await fetch(`/api/search?${params}`);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: 24 }}>
      <h1>College Cutoff Finder</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input
          name="rank"
          type="number"
          placeholder="Your Rank"
          value={form.rank}
          onChange={handleChange}
          required
        />
        <select name="branch" value={form.branch} onChange={handleChange}>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="CIV">CIV</option>
          <option value="MEC">MEC</option>
        </select>
        <select name="region" value={form.region} onChange={handleChange}>
          <option value="AU">AU</option>
          <option value="SVU">SVU</option>
          <option value="SW">SW</option>
        </select>
        <select name="caste" value={form.caste} onChange={handleChange}>
          <option value="OC">OC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
          <option value="BCA">BCA</option>
          <option value="BCB">BCB</option>
          <option value="BCC">BCC</option>
          <option value="BCD">BCD</option>
          <option value="BCE">BCE</option>
          <option value="OC_EWS">OC_EWS</option>
        </select>
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="BOYS">BOYS</option>
          <option value="GIRLS">GIRLS</option>
        </select>
        <button type="submit" style={{ marginLeft: 8 }}>
          Search
        </button>
      </form>
      {loading && <div>Loading...</div>}
      <ResultsTable results={results} />
    </div>
  );
}
