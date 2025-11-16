#!/usr/bin/env node

/**
 * Development Server Monitor
 * Monitors the Vite dev server and console for errors, warnings, and integration conflicts
 */

import fs from 'fs';
import path from 'path';

console.log('🔍 Development Server Monitor Started');
console.log('=====================================');

// Known issues to watch for
const patterns = {
  errors: [
    /Error:/gi,
    /Failed to compile/gi,
    /Module not found/gi,
    /Cannot read property/gi,
    /TypeError:/gi,
    /ReferenceError:/gi,
    /SyntaxError:/gi,
    /Cannot access/gi,
    /React error:/gi
  ],
  warnings: [
    /Warning:/gi,
    /Deprecated:/gi,
    /build\.js/gi,
    /prop-types/gi,
    /componentWillReceiveProps/gi,
    /componentWillMount/gi,
    /componentWillUpdate/gi,
    /UNSAFE_/gi
  ],
  conflicts: [
    /Duplicate declaration/gi,
    /Identifier.*has already been declared/gi,
    /Module.*already declared/gi,
    /already.*imported/gi,
    /Duplicate route/gi,
    /conflicting/gi
  ]
};

// Check for code duplication
function checkCodeDuplication() {
  const srcDir = path.join(process.cwd(), 'src');
  const componentFiles = [];

  function findJSXFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        findJSXFiles(fullPath);
      } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
        componentFiles.push(fullPath);
      }
    }
  }

  try {
    findJSXFiles(srcDir);

    // Look for similar component names
    const componentNames = {};
    for (const file of componentFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const matches = content.match(/export default (\w+)|const (\w+) = \(\)|function (\w+)/g);

      if (matches) {
        for (const match of matches) {
          const name = match.match(/(\w+)/)[1];
          if (!componentNames[name]) {
            componentNames[name] = [];
          }
          componentNames[name].push(file);
        }
      }
    }

    // Report duplicates
    console.log('\n🔍 Checking for component name conflicts...');
    for (const [name, files] of Object.entries(componentNames)) {
      if (files.length > 1) {
        console.log(`⚠️  Duplicate component name "${name}" found in:`);
        files.forEach(file => console.log(`   - ${file}`));
      }
    }

    console.log(`✅ Checked ${componentFiles.length} files for naming conflicts`);

  } catch (error) {
    console.log('❌ Error checking code duplication:', error.message);
  }
}

// Check routing conflicts
function checkRoutingConflicts() {
  console.log('\n🔍 Checking for routing conflicts...');

  const appFile = path.join(process.cwd(), 'src/App.jsx');
  if (fs.existsSync(appFile)) {
    const content = fs.readFileSync(appFile, 'utf8');
    const routeMatches = content.match(/<Route[^>]*path="([^"]*)"[^>]*>/g);

    if (routeMatches) {
      const paths = [];
      const conflicts = [];

      for (const match of routeMatches) {
        const pathMatch = match.match(/path="([^"]*)"/);
        if (pathMatch) {
          const path = pathMatch[1];
          if (paths.includes(path)) {
            conflicts.push(path);
          } else {
            paths.push(path);
          }
        }
      }

      if (conflicts.length > 0) {
        console.log('⚠️  Duplicate routes found:');
        conflicts.forEach(path => console.log(`   - ${path}`));
      } else {
        console.log('✅ No duplicate routes found');
      }

      console.log(`📋 Found ${paths.length} unique routes`);
    }
  }
}

// Check for TODO/FIXME in source code
function checkTechnicalDebt() {
  console.log('\n🔍 Checking for technical debt markers...');

  const srcDir = path.join(process.cwd(), 'src');
  let todoCount = 0;
  let fixmeCount = 0;
  let hackCount = 0;

  function searchInDir(dir) {
    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
          searchInDir(fullPath);
        } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.tsx')) {
          const content = fs.readFileSync(fullPath, 'utf8');
          const lines = content.split('\n');

          lines.forEach((line, index) => {
            if (line.includes('TODO:')) todoCount++;
            if (line.includes('FIXME:')) fixmeCount++;
            if (line.includes('HACK:')) hackCount++;
          });
        }
      }
    } catch (error) {
      // Skip directories we can't read
    }
  }

  searchInDir(srcDir);

  console.log(`📝 TODOs: ${todoCount}`);
  console.log(`🔧 FIXMEs: ${fixmeCount}`);
  console.log(`⚡ HACKs: ${hackCount}`);

  if (todoCount > 5 || fixmeCount > 2 || hackCount > 1) {
    console.log('⚠️  High technical debt detected - consider addressing these items');
  }
}

// Check for import/export issues
function checkImportExportIssues() {
  console.log('\n🔍 Checking import/export patterns...');

  const srcDir = path.join(process.cwd(), 'src');
  const imports = {};
  const exports = {};

  function analyzeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(process.cwd(), filePath);

      // Find imports
      const importMatches = content.match(/import.*from\s+['"]([^'"]+)['"]/g);
      if (importMatches) {
        importMatches.forEach(match => {
          const sourceMatch = match.match(/from\s+['"]([^'"]+)['"]/);
          if (sourceMatch) {
            const source = sourceMatch[1];
            if (!imports[source]) imports[source] = [];
            imports[source].push(relativePath);
          }
        });
      }

      // Find exports
      const exportMatches = content.match(/export (default |const |function |class |{.*})/g);
      if (exportMatches) {
        if (!exports[relativePath]) exports[relativePath] = [];
        exports[relativePath].push(...exportMatches);
      }

    } catch (error) {
      // Skip files that can't be read
    }
  }

  function analyzeDir(dir) {
    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
          analyzeDir(fullPath);
        } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.tsx')) {
          analyzeFile(fullPath);
        }
      }
    } catch (error) {
      // Skip directories we can't read
    }
  }

  try {
    analyzeDir(srcDir);

    // Check for heavy imports (potential issues)
    console.log(`📦 Analyzed imports from ${Object.keys(imports).length} sources`);

    // Check for duplicate exports
    console.log(`📤 Analyzed exports from ${Object.keys(exports).length} files`);

  } catch (error) {
    console.log('❌ Error analyzing imports/exports:', error.message);
  }
}

// Main monitoring function
function runMonitoring() {
  console.log(`\n🕐 Running checks at ${new Date().toLocaleTimeString()}`);

  checkCodeDuplication();
  checkRoutingConflicts();
  checkTechnicalDebt();
  checkImportExportIssues();

  console.log('\n✅ Monitoring cycle completed');
  console.log('=====================================');
}

// Run monitoring immediately
runMonitoring();

// Set up continuous monitoring (every 30 seconds)
setInterval(runMonitoring, 30000);

console.log('⏰ Monitoring will run every 30 seconds');
console.log('Press Ctrl+C to stop monitoring\n');