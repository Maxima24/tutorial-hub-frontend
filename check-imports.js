/**
 * check-imports.js
 * Scans all .ts/.tsx/.js/.jsx files for import paths and verifies:
 * 1. The target file exists
 * 2. The case (uppercase/lowercase) matches exactly
 */

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "src"); // adjust if your code isn't under src

// Recursively walk the directory tree
function walk(dir) {
  let files = [];
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(walk(fullPath));
    } else if (/\.(tsx?|jsx?)$/.test(fullPath)) {
      files.push(fullPath);
    }
  }
  return files;
}

// Case-sensitive existence check
function existsCaseSensitive(filePath) {
  const dir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  if (!fs.existsSync(dir)) return false;
  const filesInDir = fs.readdirSync(dir);
  return filesInDir.includes(fileName);
}

function checkImports(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const importRegex = /import\s+.*?\s+from\s+['"](.*?)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];

    // Skip external packages
    if (!importPath.startsWith(".") && !importPath.startsWith("/")) continue;

    const absImportPath = path.resolve(path.dirname(filePath), importPath);
    const extensions = [
      "",
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      "/index.ts",
      "/index.tsx",
      "/index.js",
      "/index.jsx",
    ];

    let found = false;
    for (const ext of extensions) {
      const fullPath = absImportPath + ext;
      if (fs.existsSync(fullPath)) {
        found = true;
        if (!existsCaseSensitive(fullPath)) {
          console.log(`⚠️  Case mismatch in ${filePath} → "${importPath}"`);
        }
        break;
      }
    }

    if (!found) {
      console.log(`❌ Missing import target in ${filePath} → "${importPath}"`);
    }
  }
}

// Run the check
console.log("🔍 Checking imports...");
const allFiles = walk(ROOT_DIR);
allFiles.forEach(checkImports);
console.log("✅ Import check complete.");
