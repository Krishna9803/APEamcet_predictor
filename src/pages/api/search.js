import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { rank, branch, region, caste, gender } = req.query;

  if (!rank || !branch || !region || !caste || !gender) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const filePath = path.join(process.cwd(), "public", "data.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(rawData);

    // Normalize keys: Handle spaces and special characters
    const categoryKey = `${caste.toUpperCase()}_${gender.toUpperCase()}`.replace(/ /g, '');
    const userRank = parseInt(rank);

    const results = data.filter(college => {
      // Handle both "AFFLIA.UNIV" and "AFFLIA_UNIV" cases
      const collegeRegion = college["INST_REG"] || college["INST_REG."];
      const closingRank = college[categoryKey] || college[categoryKey.replace('_', ' ')];

      return college.branch_code?.toUpperCase() === branch.toUpperCase() &&
             collegeRegion?.toUpperCase() === region.toUpperCase() &&
             !isNaN(closingRank) &&
             parseInt(closingRank) >= userRank;
    }).map(college => ({
      inst_name: college.inst_name,
      type: college.type,
      place: college.PLACE,
      district: college.DIST,
      university: college["AFFLIA.UNIV"] || college.AFFLIA_UNIV,
      fee: college.COLLFEE,
      closing_rank: parseInt(college[categoryKey] || college[categoryKey.replace('_', ' ')]),
      branch: college.branch_code
    })).sort((a, b) => a.closing_rank - b.closing_rank);

    res.status(200).json(results);

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
