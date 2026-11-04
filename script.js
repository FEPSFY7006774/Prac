// ---------------------------------------------------------------
// 1. VALIDATED TIME STAMP (asks GitHub when the repo was last changed)
// ---------------------------------------------------------------
const USERNAME = 'FEPSFY7006774'; // your GitHub username
const REPO = 'FY7006774';         // your repository name

// "async" lets us use "await" to wait for the internet request to finish
async function getLastUpdatedTime() {
  const box = document.getElementById('last-updated');
  const url = `https://api.github.com/repos/${USERNAME}/${REPO}/commits`;

  try {
    const response = await fetch(url, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const commits = await response.json();   // list of commits, newest first
    if (commits.length > 0) {
      const lastDate = new Date(commits[0].commit.committer.date);
      box.textContent = `Last Modified Time: ${lastDate.toLocaleString()}`;
      return true;
    }
    box.textContent = 'No commits found in the repository.';
  } catch (error) {
    console.error('Error fetching the last updated time:', error);
    box.textContent = 'Error fetching update time. Check the username and repo name.';
  }
  return false;
}

async function verifyLastUpdatedTime() {
  document.getElementById('last-updated').textContent = 'Verifying...';
  const ok = await getLastUpdatedTime();
  if (ok) {
    alert('Last modified time has been verified from the GitHub API.');
  }
}

// ---------------------------------------------------------------
// 2. WORD COUNT (counts everything inside #article-text)
// ---------------------------------------------------------------
function displayWordCount() {
  const text = document.getElementById('article-text').textContent.trim();
  // split on any run of spaces/new lines, so extra spaces are not counted
  const count = text === '' ? 0 : text.split(/\s+/).length;
  document.getElementById('word-count').textContent = `Total word count: ${count}`;
}

// ---------------------------------------------------------------
// 3. RUN THINGS WHEN THE PAGE HAS LOADED
// (addEventListener lets several functions run; "window.onload = ..."
//  used twice means only the last one runs)
// ---------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  getLastUpdatedTime();
  displayWordCount();
  document.getElementById('verify-btn').addEventListener('click', verifyLastUpdatedTime);
});
