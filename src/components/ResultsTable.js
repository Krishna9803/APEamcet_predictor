// components/ResultsTable.js
export default function ResultsTable({ results, searched, loading }) {
  if (!searched || loading) return null;

  if (results.length === 0) {
    return (
      <div className="no-results">
        No colleges found for the given criteria.
      </div>
    );
  }

  return (
    <div className="results-container">
      <table className="results-table">
        <thead>
          <tr>
            <th>Institute</th>
            <th>Branch</th>
            <th>Place</th>
            <th>District</th>
            <th>Closing Rank</th>
            <th>Difference</th>
            <th>Fee</th>
          </tr>
        </thead>
        <tbody>
          {results.map((college, i) => (
            <tr key={i}>
              <td>{college.inst_name}</td>
              <td>{college.branch_code}</td>
              <td>{college.PLACE}</td>
              <td>{college.DIST}</td>
              <td>{college.closing_rank}</td> {/* Fixed from closing_ranks */}
              <td>{college.difference}</td>
              <td>₹{college.COLLFEE?.toLocaleString()}</td>{" "}
              {/* Fixed from fees */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
