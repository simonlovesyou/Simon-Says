import Promise from 'bluebird';
import path from 'path';
import configHelper from '../configHelper.js'
let fs = Promise.promisifyAll(require('fs'));


const add = (req, res) => {
    if(!path.isAbsolute(req.body.folder)) {
        res.sendStatus(404);
      } else {
        fs.statAsync(req.body.folder)
        .then(stats => {
          if(stats.isDirectory()) {
            configHelper.saveFolder(
            {'folder': {
                'name': path.basename(req.body.folder),
                'path': path.dirname(req.body.folder)
              }
            }).then(() => res.sendStatus(201));

          } else {
            
            res.sendStatus(420);
          }
        })
        .error(err => {

          res.sendStatus(420);
        })
      } 
};


function saveToConfig(directory, cb) {
  console.log("Försöker spara");
  console.log(path.join(process.cwd(), 'configuration.JSON'));
  configHelper.saveFolder(
    );
  /*readFile(path.join(process.cwd(), 'configuration.JSON'), 'utf8')
  .then(data => JSON.parse(data))
  .then(config => {
    config.push(
      
    });

    fs.writeFile(path.join(process.cwd(), 'configuration.JSON'), JSON.stringify(config), function(err) {
      if(err)
        console.log(err);
      cb();
    }); 
  });*/
}

module.exports = {
  add
};