const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const report = path.resolve(__dirname, '..', 'cypress', 'reports', 'html', 'index.html');

if (!fs.existsSync(report)) {
  console.error('Relatório não encontrado. Rode npm run test:all antes.');
  process.exit(1);
}

const opener =
  process.platform === 'win32'
    ? `cmd /c start "" "${report}"`
    : process.platform === 'darwin'
      ? `open "${report}"`
      : `xdg-open "${report}"`;

exec(opener, (err) => {
  if (err) {
    console.log(`Abra manualmente: ${report}`);
  }
});
