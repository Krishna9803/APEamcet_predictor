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
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    const params = new URLSearchParams(form).toString();
    const res = await fetch(`/api/search?${params}`);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>College Cutoff Finder</h1>
      <p className="credit">
        Developed by Sreenivasa Gangadhara Trivikramaditya with a very tiny
        teeny help from Shiva Ramakrishna
      </p>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          name="rank"
          type="number"
          placeholder="Enter rank here"
          value={form.rank}
          onChange={handleChange}
          required
          className="form-input"
        />

        <div className="form-group">
          <select
            name="branch"
            value={form.branch}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="" disabled>
              Select branch
            </option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="CIV">CIV</option>
            <option value="MEC">MEC</option>
          </select>

          <select
            name="region"
            value={form.region}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="" disabled>
              Select region
            </option>
            <option value="AU">AU</option>
            <option value="SVU">SVU</option>
            <option value="SW">SW</option>
          </select>

          <select
            name="caste"
            value={form.caste}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="" disabled>
              Select category
            </option>
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

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="BOYS">BOYS</option>
            <option value="GIRLS">GIRLS</option>
          </select>
        </div>

        <button type="submit" className="search-button">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {loading && <div className="loading">Loading...</div>}
      <ResultsTable results={results} searched={searched} loading={loading} />
    </div>
  );
}
