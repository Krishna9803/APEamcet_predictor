export default function ResultsTable({ results }) {
  if (!results || results.length === 0) {
    return <div>No colleges found for the given criteria.</div>;
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        border="1"
        cellPadding="6"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
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
    </div>
  );
}
