import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { rank, branch, region, caste, gender } = req.query;

  try {
    const filePath = path.join(process.cwd(), "public", "data.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    
    // Fix 1: Replace NaN with null
    const sanitizedData = rawData.replace(/NaN/g, "null");
    const data = JSON.parse(sanitizedData);

    // Fix 2: Handle split column headers
    const categoryKey = `${caste}_${gender}`
      .toUpperCase()
      .replace(/ /g, '') // Remove spaces
      .replace(/_B$/, '_BOYS') // Fix split B -> BOYS
      .replace(/_G$/, '_GIRLS'); // Fix split G -> GIRLS

    const userRank = parseInt(rank);

    const results = data.filter(college => {
      const closingRank = parseInt(college[categoryKey] || college[categoryKey.replace('_', ' ')]);
      
      return college.branch_code === branch &&
             college.INST_REG === region &&
             !isNaN(closingRank) &&
             closingRank <= userRank;
    }).map(college => ({
      inst_name: college.inst_name,
      branch: college.branch_code,
      place: college.PLACE,
      district: college.DIST,
      closing_rank: parseInt(college[categoryKey] || college[categoryKey.replace('_', ' ')]),
      fee: college.COLLFEE || null
    }));

    res.status(200).json(results);

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      details: error.message
    });
  }
}
