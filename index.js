#!/usr/bin/env node

const fs = require('fs');

const { lstat } = fs.promises;
fs.readdir(process.cwd(), async (err, filenames) => {
  if(err) {
    console.log(err);
  }

  const statPromises = filenames.map(filename => {
    return lstat(filename)
  })

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    console.log(filenames[index], stats.isFile());
  }
});