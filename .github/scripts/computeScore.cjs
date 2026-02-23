const fs = require('fs');
const path = require('path');
const https = require('https');

const HW_CONFIG = {
  hw01: { maxPoints: 15, autoPoints: 10, manualPointsMax: 5 },
  hw02: { maxPoints: 35, autoPoints: 22, manualPointsMax: 13 },
  hw03: { maxPoints: 50, autoPoints: 34, manualPointsMax: 16 },
  hw04: { maxPoints: 75, autoPoints: 50, manualPointsMax: 25 },
  hw05: { maxPoints: 100, autoPoints: 68, manualPointsMax: 32 },
};

const hwId = process.env.HW_ID;
const config = HW_CONFIG[hwId];
if (!config) {
  console.error('Unknown HW_ID: ' + hwId);
  process.exit(1);
}

let results;
try {
  results = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'jest-results.json'), 'utf8'));
} catch (e) {
  results = { testResults: [] };
}
const allTests = (results.testResults || []).flatMap(function (t) {
  return t.assertionResults || [];
});
const passed = allTests.filter(function (t) {
  return t.status === 'passed';
}).length;
const total = allTests.length;
const failed = allTests.filter(function (t) {
  return t.status === 'failed';
});

let hints = {};
const hintsPath = path.join(process.cwd(), '.github', 'hints.json');
if (fs.existsSync(hintsPath)) {
  hints = JSON.parse(fs.readFileSync(hintsPath, 'utf8'));
}

const rawScore = total > 0 ? Math.floor((config.autoPoints * passed) / total) : 0;
const manualPointsMax = config.manualPointsMax;

const runUrl =
  (process.env.GITHUB_SERVER_URL || '') +
  '/' +
  (process.env.GITHUB_REPOSITORY || '') +
  '/actions/runs/' +
  (process.env.GITHUB_RUN_ID || '');

const emoji =
  passed === total ? '\uD83D\uDFE2' : passed >= total * 0.7 ? '\uD83D\uDFE1' : '\uD83D\uDD34';
const lines = [];
lines.push(
  '## ' + emoji + ' ' + hwId.toUpperCase() + ' \u2013 Automatikus \u00E9rt\u00E9kel\u00E9s'
);
lines.push('');
lines.push(
  '**Tesztek:** ' +
    passed +
    '/' +
    total +
    ' \u2705 | **Automatikus pontsz\u00E1m:** ' +
    rawScore +
    ' / ' +
    config.autoPoints +
    'p'
);
lines.push(
  '**Manu\u00E1lis pont** (diz\u00E1jn, deploy, stb. \u2013 az oktat\u00F3 adja): 0\u2013' +
    manualPointsMax +
    'p | **\u00D6sszes max:** ' +
    config.maxPoints +
    'p'
);
lines.push('\uD83D\uDD17 [CI fut\u00E1s r\u00E9szletei](' + runUrl + ')');

if (failed.length > 0) {
  lines.push('');
  lines.push('---');
  lines.push('### \u274C Buk\u00F3 tesztek');
  lines.push('');
  for (let i = 0; i < failed.length; i++) {
    const test = failed[i];
    const name = test.fullName || test.title || '';
    const hint = hints[name];
    lines.push('**\u2022 ' + name + '**');
    if (hint) {
      lines.push('  \uD83D\uDCA1 ' + hint.tip + ' _(' + hint.lesson + '. \u00F3ra)_');
    }
    lines.push('');
  }
} else {
  lines.push('');
  lines.push('\u2728 Minden teszt \u00E1tment \u2013 j\u00F3 munka!');
}
lines.push('');
lines.push(
  '> _Az automatikus pontsz\u00E1m el\u0151zetes. A v\u00E9gleges pont = automatikus + manu\u00E1lis (oktat\u00F3i) pont._'
);

const comment = lines.join('\n');

const score = {
  homeworkId: hwId,
  maxPoints: config.maxPoints,
  autoPoints: config.autoPoints,
  manualPointsMax: config.manualPointsMax,
  rawScore: rawScore,
  finalScore: rawScore,
  passedTests: passed,
  totalTests: total,
  timestamp: new Date().toISOString(),
};
const scorePath = path.join(process.cwd(), hwId + '-score.json');
fs.writeFileSync(scorePath, JSON.stringify(score, null, 2));
console.log(JSON.stringify(score, null, 2));

// GitHub Actions Step Summary: pontozó táblázat
if (process.env.GITHUB_STEP_SUMMARY) {
  const summaryTable =
    '\n## Pontozás\n\n' +
    '| Összes teszt | Sikeres | Nyers pont (auto) | Manuális max | Összes max |\n' +
    '|--------------|---------|-------------------|--------------|------------|\n' +
    '| ' +
    total +
    ' | ' +
    passed +
    ' | **' +
    rawScore +
    '** / ' +
    config.autoPoints +
    'p | 0–' +
    manualPointsMax +
    'p | ' +
    config.maxPoints +
    'p |\n';
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summaryTable);
}

const prNumber = process.env.PR_NUMBER;
const token = process.env.GITHUB_TOKEN;
const repo = (process.env.GITHUB_REPOSITORY || '/').split('/');
const owner = repo[0];
const repoName = repo[1];

if (!prNumber || !token) {
  console.log('Nem PR context vagy hi\u00E1nyz\u00F3 token \u2013 komment kihagyva.');
  process.exit(0);
}

const body = JSON.stringify({ body: comment });
const options = {
  hostname: 'api.github.com',
  path: '/repos/' + owner + '/' + repoName + '/issues/' + prNumber + '/comments',
  method: 'POST',
  headers: {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json',
    'User-Agent': 'ci-score-bot',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Length': Buffer.byteLength(body),
  },
};

const req = https.request(options, function (res) {
  console.log('PR komment st\u00E1tusz: ' + res.statusCode);
});
req.on('error', function (e) {
  console.error('PR komment hiba:', e.message);
});
req.write(body);
req.end();
