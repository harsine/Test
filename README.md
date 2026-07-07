# GitHub PR Auto-Approve Project

Automatically approve pull requests based on configurable rules using GitHub Actions.

## What is PR Auto-Approve?

PR Auto-Approve is a GitHub Actions workflow that **automatically approves pull requests** that match certain criteria, such as:
- Updates from **Dependabot** (automated dependency updates)
- PRs with specific **labels** (e.g., `auto-approve`, `documentation`)
- PRs from **specific authors** (e.g., your own bot accounts)
- PRs that **only modify certain files** (e.g., README, documentation)

## Why Use It?

✅ **Save Time**: No need to manually review routine PRs (dependency updates, docs)  
✅ **Faster Merges**: Auto-approved PRs can merge faster  
✅ **Consistent**: Applies the same rules every time  
✅ **Safe**: Only approves PRs matching your exact criteria

## Project Structure

```
GitHub-PR-AutoApprove/
├── .github/
│   └── workflows/
│       └── auto-approve.yml          # Main GitHub Actions workflow
├── src/
│   └── index.js                      # Example application
├── auto-approve-config.json          # Approval rules configuration
├── package.json                      # Project dependencies
└── README.md                         # This file
```

## Setup Instructions

### Step 1: Create a Personal Access Token (PAT)

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **"Generate new token (classic)"**
3. Set these permissions:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
4. Copy the token (you'll need it next)

### Step 2: Add the Token to Your Repository

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `GITHUB_TOKEN_APPROVAL`
5. Paste your Personal Access Token
6. Click **"Add secret"**

### Step 3: Copy Workflow File

The workflow file (`.github/workflows/auto-approve.yml`) is already configured. Just make sure it's in your repository at that exact path.

### Step 4: Customize Approval Rules

Edit `auto-approve-config.json` to match your needs:

```json
{
  "approveDependabot": true,
  "approveLabels": ["auto-approve", "documentation"],
  "approveAuthors": ["dependabot[bot]", "your-bot-name"],
  "approveFilesOnly": ["README.md", "docs/**"]
}
```

## How It Works

1. **Pull Request Created** → GitHub detects it
2. **Workflow Triggers** → The `auto-approve.yml` workflow runs
3. **Rules Checked** → Compares PR against your `auto-approve-config.json`
4. **If Match Found** → Uses the GitHub token to approve automatically
5. **If No Match** → PR waits for manual review

## Example Scenarios

### ✅ Auto-Approve Dependabot Updates
When Dependabot creates a PR updating your dependencies:
- Workflow detects author = `dependabot[bot]`
- Rule matches: `approveDependabot: true`
- **PR is auto-approved!**

### ✅ Auto-Approve Labeled PRs
When you label a PR with `auto-approve`:
- Workflow detects label
- Rule matches: `"auto-approve"` in `approveLabels`
- **PR is auto-approved!**

### ❌ Manual Review Required
When a PR doesn't match any rules:
- Workflow runs but doesn't approve
- **Requires manual review**

## Workflow File Explanation

The `auto-approve.yml` file contains:

| Component | Purpose |
|-----------|---------|
| `on: pull_request` | Triggers when a PR is created/updated |
| `jobs.approve` | The job that runs the approval logic |
| `actions/checkout@v3` | Gets the code from your repo |
| `actions/github-script@v6` | Runs JavaScript to interact with GitHub API |
| `octokit` | GitHub API client (built-in with github-script) |

## Testing Your Setup

1. Create a test branch: `git checkout -b test-auto-approve`
2. Make a small change (e.g., update README)
3. Push and create a PR
4. Add the `auto-approve` label
5. Watch the **Actions** tab - your workflow should run and approve the PR!

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Workflow doesn't run | Check `.github/workflows/auto-approve.yml` exists and is properly named |
| Token error | Verify `GITHUB_TOKEN_APPROVAL` secret is added in Settings → Secrets |
| PR not approved | Check `auto-approve-config.json` rules match your PR |
| Permission denied | Token needs `repo` and `workflow` scopes |

## Security Notes

⚠️ **Be Careful!** Auto-approve only for:
- Dependency updates (Dependabot)
- Documentation changes
- Your own trusted bots
- Low-risk file changes

❌ **Don't auto-approve**:
- Code changes from external contributors
- Changes to critical files (package.json, security files)
- PRs you haven't reviewed the criteria for

## Next Steps

1. ✅ Copy all files to your GitHub repository
2. ✅ Create a personal access token
3. ✅ Add the token to your repository secrets
4. ✅ Customize `auto-approve-config.json`
5. ✅ Test with a sample PR
6. ✅ Monitor the Actions tab for workflow runs

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub API - Pull Requests](https://docs.github.com/en/rest/pulls)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)

---

**Questions?** Check the troubleshooting section or review your workflow runs in the GitHub Actions tab!
