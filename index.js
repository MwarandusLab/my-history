import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

// List of random commit messages
const commitMessages = [
  "Refactor code 🧹",
  "Update docs 📖",
  "Fix bug 🐞",
  "Improve performance 🚀",
  "Add feature ✨",
  "Code cleanup 🔧",
  "Minor tweak 🔍",
  "Commit for the graph 📊",
  "Green square magic 💚",
  "Push day 💥",
];

// Helper to get a random message
const getRandomMessage = () => {
  const index = random.int(0, commitMessages.length - 1);
  return commitMessages[index];
};

// Helper to create a commit at a specific date
const commitAtDate = async (date) => {
  const formatted = moment(date).format();
  const message = getRandomMessage();

  const data = { date: formatted };

  await jsonfile.writeFile(path, data);
  await git.add([path]);
  await git.commit(message, { "--date": formatted });
  await git.push();
};

// Main logic to generate commits from last year to now
const generateCommits = async () => {
  const startDate = moment().subtract(1, "year").startOf("day");
  const today = moment().startOf("day");

  let currentDate = startDate.clone();

  while (currentDate.isSameOrBefore(today)) {
    const commitCount = random.int(0, 5); // 0 to 5 commits per day

    for (let i = 0; i < commitCount; i++) {
      await commitAtDate(currentDate);
      console.log(`Committed on: ${currentDate.format("YYYY-MM-DD")}`);
    }

    currentDate.add(1, "day");
  }

  console.log("✅ Done generating and pushing commits!");
};

generateCommits();
