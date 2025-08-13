import readline from "readline";
import fs from "fs";
import path from "path";

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

      const resolvedPath = path.resolve(dir, link.split("#")[0]); // Remove anchor if present
      if (!fs.existsSync(resolvedPath)) {
        errors.push({ line: lineNumber, link });
      }
    }
  }

  return errors;
}

/**
 * Process a file and check for dead links.
 * @param {string} filePath - Path to the markdown file.
 * @returns {Promise<boolean>} - True if there are errors, false otherwise.
 */
async function processFile(filePath) {
  try {
    const errors = await checkLink(filePath);
    if (errors.length > 0) {
      console.error(`${errors.length} dead links found in ${filePath}:`);
      errors.forEach((err) => {
        console.log(`- ${err.link} at ${filePath}#${err.line}`);
      });
      console.log(); // print new line
      return true; // has errors
    }
  } catch (err) {
    console.error(`Failed to lint ${filePath}: ${err.message}`);
    return true; // has errors
  }
  return false; // no errors
}

/**
 * Main function to process files and check for dead links.
 * @returns {Promise<void>}
 */
async function main() {
  const args = process.argv.slice(2);
  let hasErrors = false;

  if (args.length > 0) {
    for (const filePath of args) {
      const errored = await processFile(filePath);
      if (errored) hasErrors = true;
    }
  } else {
    const rl = readline.createInterface({
      input: process.stdin,
      terminal: false,
    });

    const filePaths = [];

    for await (const line of rl) {
      filePaths.push(line);
    }

    for (const filePath of filePaths) {
      const errored = await processFile(filePath);
      if (errored) hasErrors = true;
    }
  }

  if (hasErrors) {
    process.exitCode = 1;
  }
}

main();