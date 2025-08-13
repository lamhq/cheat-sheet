import readline from 'readline';
import fs from 'fs';
import path from 'path';

/**
 * Check for dead relative links in a markdown file.
 * @param {string} filePath - Path to the markdown file.
 * @returns {Promise<Array<{line: number, link: string}>>} - List of errors.
 */
async function checkLink(filePath) {
  const errors = [];
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const dir = path.dirname(filePath);
  const linkRegex = /!?\[.*?\]\((.*?)\)/g;

  let lineNumber = 0;

  for await (const line of rl) {
    lineNumber++;
    let match;
    while ((match = linkRegex.exec(line)) !== null) {
      const link = match[1];

      // Skip absolute URLs and anchors
      if (/^(https?:\/\/|#)/.test(link)) continue;

      const resolvedPath = path.resolve(dir, link.split('#')[0]); // Remove anchor if present
      if (!fs.existsSync(resolvedPath)) {
        errors.push({ line: lineNumber, link });
      }
    }
  }

  return errors;
}

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

let hasErrors = false;

rl.on('line', async (filePath) => {
  console.log(filePath)
  try {
    const errors = await checkLink(filePath);
    if (errors.length > 0) {
      hasErrors = true;
      console.error(`${errors.length} dead links found in ${filePath}:`);
      errors.forEach(err => {
        console.log(`- ${err.link} at ${filePath}#${err.line}`);
      });
      console.log("\n");
    }
  } catch (err) {
    hasErrors = true;
    console.error(`Failed to lint ${filePath}: ${err.message}`);
  }
});

rl.on('close', () => {
  if (hasErrors) {
    process.exit(1);
  }
});
