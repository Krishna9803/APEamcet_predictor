import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { rank, branch, region, caste, gender } = req.query;

  // Validate inputs
  if (!rank || !branch || !region || !caste || !gender) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    // Read data.json
    const filePath = path.join(process.cwd(), "public", "data.json");
    const rawData = fs.readFileSync(filePath);
    const data = JSON.parse(rawData);

    // Construct category key (e.g., "BCD_BOYS")
    const categoryKey = `${caste.toUpperCase()}_${gender.toUpperCase()}`;
    const userRank = parseInt(rank);

    console.log("Searching for:", { categoryKey, userRank, branch, region });

    // Filter colleges
    const results = data
      .filter(college => 
        college.branch_code === branch &&
        college.INST_REG === region &&
        college[categoryKey] &&
        !isNaN(college[categoryKey]) &&
        parseInt(college[categoryKey]) <= userRank // FIXED: Changed >= to <=
      )
      .map(college => ({
        inst_name: college.inst_name,
        type: college.type,
        PLACE: college.PLACE,
        DIST: college.DIST,
        AFFLIA_UNIV: college["AFFLIA.UNIV"] || college["AFFLIA_UNIV"],
        COLLFEE: college.COLLFEE,
        closing_rank: parseInt(college[categoryKey]),
        difference: userRank - parseInt(college[categoryKey])
      }))
      .sort((a, b) => a.difference - b.difference); // Sort by safest option first

    console.log(`Found ${results.length} results`);
    res.status(200).json(results);

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
