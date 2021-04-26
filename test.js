const fs = require("fs");
const cp = require("child_process");
const path = require("path");

function l(msg) {
  console.log(`husky - ${msg}`);
}
function install(dir = ".husky") {
  // Ensure that we're inside a git repository
  if (cp.spawnSync("git", ["rev-parse"]).status !== 0) {
    l("not a Git repository, skipping hooks installation");
    return;
  }

  // Custom dir help
  const url = "https://typicode.github.io/husky/#/?id=custom-directory";

  // Ensure that we're not trying to install outside of cwd
  if (!path.resolve(process.cwd(), dir).startsWith(process.cwd())) {
    throw new Error(`.. not allowed (see ${url})`);
  }

  // Ensure that cwd is git top level
  if (!fs.existsSync(".git")) {
    throw new Error(`.git can't be found (see ${url})`);
  }

  try {
    // Create .husky/_
    fs.mkdirSync(path.join(dir, "_"), { recursive: true });

    // Create .husky/.gitignore
    fs.writeFileSync(path.join(dir, ".gitignore"), "_\n");

    // Copy husky.sh to .husky/_/husky.sh
    fs.copyFileSync(
      path.join(__dirname, "husky.sh"),
      path.join(dir, "_/husky.sh")
    );

    // Configure repo
    const { error } = cp.spawnSync("git", ["config", "core.hooksPath", dir]);
    if (error) {
      throw error;
    }
  } catch (e) {
    l("Git hooks failed to install");
    throw e;
  }

  l("Git hooks installed");
}

install();

var findMagicIndex = function (nums: any[]) {
  return nums.findIndex((num, index) => num === index);
};
