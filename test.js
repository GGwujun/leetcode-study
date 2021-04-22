const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const dir = ".husky";

fs.mkdirSync(path.join(dir, "_"), { recursive: true });
fs.writeFileSync(path.join(dir, ".gitignore"), "_\n");
fs.copyFileSync(path.join(__dirname, "husky.sh"), path.join(dir, "_/husky.sh"));
// Configure repo
const { error } = cp.spawnSync("git", ["config", "core.hooksPath", dir]);
if (error) {
  throw error;
}
