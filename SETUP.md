# Quick Setup Guide for GitHub PR Auto-Approve

## 📋 Prerequisites

- GitHub account with a repository
- Basic understanding of GitHub (optional - we'll explain)

## 🚀 Step-by-Step Setup

### 1️⃣ Create Personal Access Token (PAT)

**What is a PAT?** A secure token that allows scripts to interact with GitHub on your behalf.

**How to create:**
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"** button
3. Give it a name: `PR-Auto-Approve-Token`
4. **Select scopes** (permissions):
   - ☑️ `repo` - Full control of repositories
   - ☑️ `workflow` - Update GitHub Action workflows
5. Click **"Generate token"** at the bottom
6. **Copy the token immediately** (you won't see it again!)

### 2️⃣ Add Token to Your Repository

1. Go to your GitHub repository
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions** (left sidebar)
4. Click **"New repository secret"** button
5. Fill in:
   - **Name:** `GITHUB_TOKEN_APPROVAL`
   - **Secret:** Paste your token from Step 1
6. Click **"Add secret"**

### 3️⃣ Copy Files to Your Repository

Copy these files to your GitHub repository:

```
your-repo/
├── .github/
│   └── workflows/
│       └── auto-approve.yml
├── auto-approve-config.json
├── package.json
└── src/
	└── index.js
```

**How to do it:**
- If you're using Git:
  ```bash
  git add .github/workflows/auto-approve.yml
  git add auto-approve-config.json
  git add package.json
  git add src/index.js
  git commit -m "Add PR auto-approve workflow"
  git push
  ```

- Or copy files directly through GitHub web interface

### 4️⃣ Enable GitHub Actions

1. Go to your repository
2. Click **Actions** tab
3. If you see "Enable Actions" button, click it
4. Otherwise, actions are already enabled ✅

### 5️⃣ Customize Approval Rules

Edit `auto-approve-config.json` to match your needs:

```json
{
  "approveDependabot": true,           // Auto-approve Dependabot PRs?
  "approveLabels": [                   // Labels that trigger approval
	"auto-approve",
	"documentation"
  ],
  "approveAuthors": [                  // Authors to auto-approve
	"dependabot[bot]"
  ],
  "approveFilesOnly": [                // Only certain files changed
	"README.md",
	"docs/**"
  ]
}
```

## ✅ Test Your Setup

1. Create a test branch:
   ```bash
   git checkout -b test-auto-approve
   ```

2. Make a small change (e.g., add a line to README):
   ```bash
   echo "# Test" >> README.md
   git add README.md
   git commit -m "Test auto-approve"
   git push origin test-auto-approve
   ```

3. Create a Pull Request:
   - Go to GitHub.com
   - Click **"Compare & pull request"**
   - Click **"Create pull request"**

4. Add the `auto-approve` label:
   - On the PR page, click **Labels** (right sidebar)
   - Select `auto-approve`

5. Watch it happen! 🎉
   - Go to **Actions** tab
   - Your workflow should run automatically
   - You should see the PR get approved

## 📊 Understanding the Workflow

```
┌─────────────────────────────────┐
│   You push and create PR         │
└────────┬────────────────────────┘
		 │
		 ▼
┌─────────────────────────────────┐
│  GitHub detects PR event        │
└────────┬────────────────────────┘
		 │
		 ▼
┌─────────────────────────────────┐
│  Runs auto-approve.yml workflow │
└────────┬────────────────────────┘
		 │
		 ▼
┌─────────────────────────────────┐
│  Reads config rules             │
└────────┬────────────────────────┘
		 │
		 ▼
┌─────────────────────────────────┐
│  Checks if PR matches rules     │
└────────┬────────────────────────┘
		 │
	┌────┴────┐
	│         │
	▼         ▼
┌──────┐  ┌──────┐
│Match │  │ No   │
│ !    │  │Match │
└──┬───┘  └──┬───┘
   │         │
   ▼         ▼
┌──────┐  ┌─────────────┐
│Approve  │Wait for     │
│         │Manual Review│
└─────┘  └─────────────┘
```

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Workflow doesn't run** | Check `.github/workflows/auto-approve.yml` exists in your repo |
| **PR not approved** | Check `auto-approve-config.json` rules match your PR |
| **Permission error** | Make sure token has `repo` and `workflow` scopes |
| **Token not found** | Verify secret name is exactly `GITHUB_TOKEN_APPROVAL` |
| **No Actions tab** | Go to Settings → Actions → Enable GitHub Actions |

## 🎯 Common Use Cases

### Auto-Approve All Dependabot Updates
```json
{
  "approveDependabot": true,
  "approveLabels": [],
  "approveAuthors": ["dependabot[bot]"]
}
```

### Auto-Approve Documentation Only
```json
{
  "approveDependabot": false,
  "approveLabels": ["documentation"],
  "approveAuthors": [],
  "approveFilesOnly": ["*.md", "docs/**"]
}
```

### Auto-Approve Your Bot's PRs
```json
{
  "approveDependabot": false,
  "approveLabels": [],
  "approveAuthors": ["my-bot-username", "another-bot"]
}
```

## ❓ FAQ

**Q: Is this safe?**
A: Yes, if you configure it carefully. Only auto-approve PRs you trust (Dependabot, your own bots, documentation).

**Q: Can I disable it?**
A: Yes, just delete or rename the workflow file in `.github/workflows/`.

**Q: Do I need to pay for this?**
A: No! GitHub Actions includes free usage for public repos and self-hosted runners.

**Q: What if I want more complex rules?**
A: Edit the `auto-approve.yml` workflow file to add custom logic.

## 🆘 Need Help?

1. Check the **Actions** tab in your repository for workflow logs
2. Click on a failed workflow run to see detailed error messages
3. Verify all files are in the correct locations
4. Make sure the token secret is named exactly `GITHUB_TOKEN_APPROVAL`

---

**You're all set!** Your PR auto-approve workflow is now ready to use. 🚀
