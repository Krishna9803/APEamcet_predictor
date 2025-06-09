export default function ResultsTable({ results, searched }) {
  if (!searched) return null;

  return (
    <div className="results-container">
      {results.length === 0 ? (
        <div className="no-results">
          No colleges found for the given criteria.
        </div>
      ) : (
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
                <td>{college.closing_rank}</td>
                <td>{college.difference}</td>
                <td>₹{college.COLLFEE?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
