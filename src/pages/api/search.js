import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { rank, branch, region, caste, gender } = req.query;

  if (!rank || !branch || !region || !caste || !gender) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  // Read and parse the data.json file
  const filePath = path.join(process.cwd(), "public", "data.json");
  const rawData = fs.readFileSync(filePath);
  const data = JSON.parse(rawData);

  const categoryKey = `${caste.toUpperCase()}_${gender.toUpperCase()}`;
  const userRank = parseInt(rank);

  // Filter and compute difference
  const results = data
    .filter(
      (college) =>
        college.branch_code === branch &&
        college.INST_REG === region &&
        college[categoryKey] &&
        !isNaN(college[categoryKey]) &&
        parseInt(college[categoryKey]) >= userRank
    )
    .map((college) => ({
      ...college,
      closing_rank: parseInt(college[categoryKey]),
      difference: parseInt(college[categoryKey]) - userRank,
    }))
    .sort((a, b) => a.difference - b.difference); // Closest cutoff first

  res.status(200).json(results);
}
