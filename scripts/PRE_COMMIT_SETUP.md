# Pre-Commit Script Setup

This project uses a pre-commit script to ensure code quality before committing.

## What It Does

The pre-commit script automatically runs the following checks:

1. **Lint Check** - `bun lint` - Checks for ESLint errors
2. **Format Check** - `bun format` - Formats code with Prettier
3. **Unused Code Check** - `bun knip` - Identifies unused code/files (warnings only)
4. **Build Test** - `bun build` - Ensures the project builds successfully

## How to Use

### Automatic (Git Hook)

Once Husky is installed, the pre-commit checks will run **automatically** before every commit:

```bash
git commit -m "Your commit message"
# Pre-commit checks will run automatically
```

If any checks fail, the commit will be blocked and you'll see the error messages.

### Manual Execution

You can also run the checks manually anytime:

```bash
bun pre-commit
```

Or run the script directly:

```bash
bash scripts/pre-commit.sh
```

## What to Do if Checks Fail

### ESLint/Type Errors
- Review the error messages in the terminal
- Fix the issues in your code
- Run `bun lint` again to verify

### Prettier Formatting
- The script automatically runs `bun format` which fixes formatting
- Review the formatted changes
- Re-run `git commit` to try again

### Knip (Unused Code)
- These are warnings, not errors
- Review the unused files reported
- Delete them or update imports if they're actually needed
- Knip failures don't block commits

### Build Failures
- Check the build error output
- Fix TypeScript errors or other issues
- Run `bun build` locally to verify
- Run `git commit` again

## Understanding the Checks

### 1. ESLint (`bun lint`)
Checks for:
- No console statements in production
- Proper TypeScript typing
- React hooks rules
- No unused variables
- Proper import ordering

### 2. Prettier (`bun format`)
Ensures:
- Consistent code style (indentation, quotes, line width)
- Single quotes instead of double quotes
- No semicolons at end of lines
- Proper import ordering

### 3. Knip (`bun knip`)
Identifies:
- Unused exported functions/types
- Unused dependencies
- Dead code files

### 4. Build Test (`bun build`)
Verifies:
- TypeScript compilation succeeds
- Vite builds without errors
- All imports resolve correctly

## Skipping Pre-Commit Checks (Not Recommended)

In rare cases, you can skip the pre-commit checks with:

```bash
git commit --no-verify -m "Your commit message"
```

⚠️ **Use with caution** - This bypasses important quality checks.

## Installation

The pre-commit setup is already configured. If you need to reinstall:

```bash
bun add -D husky
npx husky init
bun pre-commit
```

This will:
1. Install Husky
2. Initialize git hooks
3. Run the pre-commit checks

## Troubleshooting

### Husky Hook Not Running
1. Ensure you're in a git repository: `git status`
2. Check that `.husky/pre-commit` exists and is executable
3. Reinstall Husky: `bun add -D husky && npx husky init`

### Permission Denied Error
Make the script executable:

```bash
chmod +x scripts/pre-commit.sh
chmod +x .husky/pre-commit
```

### Out of Memory During Build
The build process might need more memory on larger projects:

```bash
NODE_OPTIONS=--max-old-space-size=4096 bun pre-commit
```

## Contributing

Before committing new code:

1. Ensure all changes are staged: `git add .`
2. Run checks: `bun pre-commit` (or just try to commit)
3. Fix any errors
4. Commit: `git commit -m "Describe your changes"`

For more information, see [claude.md](../claude.md) - "Before Committing Code" section.
