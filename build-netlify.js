#!/usr/bin/env node

const { execSync } = require("child_process");

try {
  console.log("Starting Netlify build...");

  // Try normal build first
  execSync("npm run build", { stdio: "inherit" });
} catch (error) {
  console.log("Normal build failed, trying alternative approach...");

  try {
    // Alternative: Build without static generation
    execSync("SKIP_STATIC_GENERATION=true npm run build", { stdio: "inherit" });
  } catch (altError) {
    console.log("Alternative build also failed, using export approach...");

    // Last resort: Use export
    execSync("npm run build && npm run export", { stdio: "inherit" });
  }
}
