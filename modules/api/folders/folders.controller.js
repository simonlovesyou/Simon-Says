import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';

let stat = Promise.promisify(fs.stat),
    readFile = Promise.promisify(fs.readFile);


const add = function (req, res) {
    console.log("FICK EN REQ:");
    console.log(req.body);
    if(!path.isAbsolute(req.body.folder)) {
        res.sendStatus(404);
      } else {
        stat(req.body.folder)
        .then(stats => {
          if(stats.isDirectory()) {
            saveToConfig(req.body.folder, function() {
              res.sendStatus(200);
            });
          } else {
            res.sendStatus(400)
          }
        })
      } 
};


function saveToConfig(directory, cb) {
  console.log(path.join(process.cwd(), 'configuration.JSON'));
  readFile(path.join(process.cwd(), 'configuration.JSON'), 'utf8')
  .then(data => JSON.parse(data))
  .then(config => {
    config.push(
      {'folder': {
        'name': path.basename(directory),
        'path': path.dirname(directory)
      }
    });
    console.log(config);
    fs.writeFile(path.join(process.cwd(), 'configuration.JSON'), JSON.stringify(config), function(err) {
      if(err)
        console.log(err);
      cb();
    });
  });
}

module.exports = {
  add
};