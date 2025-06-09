export default function ResultsTable({ results, searched, loading }) {
  if (!searched || loading) return null;

  return (
    <div className="results-container">
      {results.length === 0 ? (
        <div className="no-results">No colleges found for the given criteria.</div>
      ) : (
        <table className="results-table">
          <thead>
            <tr>
              <th>Institute</th>
              <th>Branch</th>
              <th>Place</th>
              <th>District</th>
              <th>Closing Rank</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            {results.map((college, i) => (
              <tr key={i}>
                <td>{college.inst_name.replace(/\n/g, ' ')}</td> {/* Fix line breaks */}
                <td>{college.branch}</td>
                <td>{college.place}</td>
                <td>{college.district}</td>
                <td>{college.closing_rank}</td>
                <td>₹{college.fee?.toLocaleString() || 'N/A'}</td> {/* Handle missing fees */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
