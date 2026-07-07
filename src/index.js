/**
 * Example application showing how to use the GitHub API to interact with PRs
 * This demonstrates the concepts used in the auto-approve workflow
 */

const fs = require('fs');
const path = require('path');

// Load configuration
function loadConfig() {
  const configPath = path.join(__dirname, '../auto-approve-config.json');
  try {
    const config = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(config);
  } catch (error) {
    console.error('Error loading config:', error.message);
    return {
      approveDependabot: true,
      approveLabels: [],
      approveAuthors: ['dependabot[bot]'],
      approveFilesOnly: []
    };
  }
}

// Check if PR should be approved based on config
function shouldApprovePR(prAuthor, prLabels, config) {
  console.log('🔍 Checking approval criteria...');
  console.log(`   Author: ${prAuthor}`);
  console.log(`   Labels: ${prLabels.join(', ') || 'none'}`);

  // Check Dependabot
  if (config.approveDependabot && prAuthor === 'dependabot[bot]') {
    return { approved: true, reason: 'Dependabot PR detected' };
  }

  // Check author whitelist
  if (config.approveAuthors && config.approveAuthors.includes(prAuthor)) {
    return { approved: true, reason: `Author "${prAuthor}" is whitelisted` };
  }

  // Check labels
  if (config.approveLabels && config.approveLabels.length > 0) {
    const matchedLabel = prLabels.find(label => config.approveLabels.includes(label));
    if (matchedLabel) {
      return { approved: true, reason: `Label "${matchedLabel}" found` };
    }
  }

  return { approved: false, reason: 'No approval criteria matched' };
}

// Main function
function main() {
  console.log('📦 GitHub PR Auto-Approve - Example Application\n');

  const config = loadConfig();
  console.log('✅ Configuration loaded:');
  console.log(`   • Approve Dependabot: ${config.approveDependabot}`);
  console.log(`   • Approve Labels: ${config.approveLabels.join(', ') || 'none'}`);
  console.log(`   • Approve Authors: ${config.approveAuthors.join(', ') || 'none'}\n`);

  // Test scenarios
  const testCases = [
    {
      name: 'Dependabot PR',
      author: 'dependabot[bot]',
      labels: []
    },
    {
      name: 'Documentation PR with label',
      author: 'john-doe',
      labels: ['documentation']
    },
    {
      name: 'Random PR',
      author: 'random-user',
      labels: []
    },
    {
      name: 'Auto-approve labeled PR',
      author: 'some-contributor',
      labels: ['auto-approve']
    }
  ];

  console.log('🧪 Test Scenarios:\n');
  testCases.forEach((testCase, index) => {
    const result = shouldApprovePR(testCase.author, testCase.labels, config);
    const status = result.approved ? '✅ APPROVED' : '❌ REVIEW NEEDED';
    console.log(`${index + 1}. ${testCase.name}`);
    console.log(`   ${status}: ${result.reason}\n`);
  });
}

// Export for use in other modules
module.exports = {
  loadConfig,
  shouldApprovePR
};

// Run main if called directly
if (require.main === module) {
  main();
}
