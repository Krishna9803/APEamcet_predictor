import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { rank, branch, region, caste, gender } = req.query;

  if (!rank || !branch || !region || !caste || !gender) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const filePath = path.join(process.cwd(), 'public', 'data.json');
    console.log(`Reading data from: ${filePath}`);
    
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);
    console.log(`Loaded ${data.length} colleges`);

    // Handle possible space in category key (e.g. "BCD_BO YS" -> "BCD_BOYS")
    const categoryKey = `${caste.toUpperCase()}_${gender.toUpperCase()}`.replace(/ /g, '');
    const userRank = parseInt(rank);

    console.log('First college keys:', Object.keys(data[0]));
    console.log('Searching for:', { 
      categoryKey,
      userRank,
      branch,
      region,
      sampleData: data[0][categoryKey] // Log value from first college
    });

    const results = data.filter(college => {
      const rankValue = parseInt(college[categoryKey]);
      return (
        college.branch_code?.toUpperCase() === branch.toUpperCase() &&
        college.INST_REG?.toUpperCase() === region.toUpperCase() &&
        !isNaN(rankValue) &&
        rankValue <= userRank
      );
    }).map(college => ({
      ...college,
      closing_rank: parseInt(college[categoryKey]),
      difference: userRank - parseInt(college[categoryKey])
    })).sort((a, b) => a.difference - b.difference);

    console.log(`Found ${results.length} results for ${categoryKey}`);
    res.status(200).json(results);

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: error.message,
      details: error.stack 
    });
  }
}
