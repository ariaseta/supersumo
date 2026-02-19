#!/bin/bash

# Pre-commit checks for SuperUMO
# Run this script before committing code

set -e  # Exit on first error (except for knip which is a warning)

echo "🚀 Running pre-commit checks..."
echo ""

# 1. Lint
echo "📝 Running ESLint..."
bun lint
if [ $? -eq 0 ]; then
  echo "✅ ESLint passed"
else
  echo "❌ ESLint failed"
  exit 1
fi
echo ""

# 2. Format
echo "🎨 Checking code formatting..."
bun format
if [ $? -eq 0 ]; then
  echo "✅ Prettier formatting passed"
else
  echo "❌ Prettier formatting failed"
  exit 1
fi
echo ""

# 3. Knip (unused code check) - warnings only
echo "🧹 Checking for unused code..."
bun knip || true  # Don't exit on knip errors (they're warnings)
echo "⚠️  Note: Review unused code above, but it won't block commits"
echo ""

# 4. Build
echo "🏗️  Building project..."
bun run build
if [ $? -eq 0 ]; then
  echo "✅ Build passed"
else
  echo "❌ Build failed"
  exit 1
fi
echo ""

echo "✨ All pre-commit checks passed!"
echo "You can now commit your code."
