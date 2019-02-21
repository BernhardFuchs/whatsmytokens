require('colors');
const exec = require('child_process').exec;

const commitMessage = 'GitPage deploy';
console.log(`Committing with message ${commitMessage}`.bgGreen);
exec(`git add .`, (error, stdout, stderr) => {
  handleError(error);
  logstd(stdout, stderr);
  exec(`git commit -m '${commitMessage}'`, (error, stdout, stderr) => {
    handleError(error);
    logstd(stdout, stderr);
    exec(`git push`, (error, stdout, stderr) => {
      handleError(error);
      logstd(stdout, stderr);
    });
  });
});

const logstd = (stdout, stderr) => {
  console.log(`${stdout}`.green);
  console.log(`${stderr}`.bgRed);
};

const handleError = error => {
  if (error !== null) {
    console.log(`${error}`.red);
    process.exit(1);
  }
};
