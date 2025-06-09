import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { rank, branch, region, caste, gender } = req.query;

  try {
    const filePath = path.join(process.cwd(), "public", "data.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(rawData);

    // Fix 1: Add space in category key (BCD_BOYS -> BCD_BO YS)
    const categoryKey = `${caste.toUpperCase()}_${gender.toUpperCase()}`.replace("BOYS", "BO YS").replace("GIRLS", "GI RLS");
    
    // Fix 2: Use correct region key from PDF (INST_REG -> INST_REG.)
    const results = data.filter(college => 
      college.branch_code === branch &&
      college["INST_REG."] === region && // Changed to INST_REG.
      college[categoryKey] &&
      parseInt(college[categoryKey]) >= parseInt(rank)
    );

    res.status(200).json(results);
    
  } catch (error) {
    console.error("Critical Error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      details: error.message 
    });
  }
}
