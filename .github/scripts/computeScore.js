// 24. óra CI/CD – ez a script GitHub Actions-ben fut
const fs = require('fs');
const path = require('path');

const hwId = 'hw05';
const maxPoints = 100;
const penaltyPerHint = 8;

// Read jest-results.json
let jestResults;
try {
  const raw = fs.readFileSync(path.join(process.cwd(), 'jest-results.json'), 'utf8');
  jestResults = JSON.parse(raw);
} catch (err) {
  const warning = `## ⚠️ Hiba\njest-results.json nem olvasható: ${err.message}\n`;
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, warning);
  jestResults = null;
}

// Read hints-usage.json
let hintsData;
try {
  const raw = fs.readFileSync(path.join(process.cwd(), 'hints-usage.json'), 'utf8');
  hintsData = JSON.parse(raw);
} catch {
  hintsData = {};
}

const passedTests = jestResults ? jestResults.numPassedTests : 0;
const totalTests = jestResults ? jestResults.numTotalTests : 0;

const rawScore = totalTests > 0 ? Math.floor(maxPoints * (passedTests / totalTests)) : 0;
const usedHints = hintsData?.[hwId]?.usedHints ?? 0;
const hintPenalty = usedHints * penaltyPerHint;
const finalScore = Math.max(0, rawScore - hintPenalty);

// Write score JSON
const scoreData = {
  homeworkId: hwId,
  maxPoints,
  rawScore,
  hintPenalty,
  finalScore,
};
fs.writeFileSync(path.join(process.cwd(), `${hwId}-score.json`), JSON.stringify(scoreData, null, 2));

// Write summary to GitHub Step Summary
const summary = `## 5. házi – pontszám

| Összes teszt | Sikeres teszt | Nyers pont | Hint levonás | **Végső pont** |
|---|---|---|---|---|
| ${totalTests} | ${passedTests} | ${rawScore} | ${hintPenalty} | **${finalScore} / ${maxPoints}** |
`;
fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);

console.log(`Pontszám kiszámítva: ${finalScore} / ${maxPoints}`);
