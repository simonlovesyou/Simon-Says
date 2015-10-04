import Promise from 'bluebird';
import path from 'path';
let fs = Promise.promisifyAll(require('fs'));
//import lowdb from 'lowdb'
let lowdb = Promise.promisifyAll(require('lowdb'));
let db = Promise.promisifyAll(lowdb('configuration.JSON'));

const configHelper = () => {

  let configName = 'configuration.JSON'
  let innerRepresentation;

  const getData = () => {
    return new Promise((resolve, reject) => {
      return resolve(db('folders').value());
    });
  }

  const getTasks = (folderName, folderPath, taskId) => {
    //console.log(db);


    /*return new Promise((resolve, reject) => {
      resolve(db('folders').findAsync({folder:{name: folderName, path: folderPath}}))
      .then(folder => {
        console.log(folder);
        return folder.tasks;
      });
    });*/

    console.log(db);

    getData().then(folders => {
      console.log(folders);
      return new Promise((resolve, reject) => {
        return resolve(folders.find({ folder: { name: folderName, path: folderPath } }));
      });
      
    });
    /*.then(folder => {
      console.log(folder);
    });*/
    /*.then(config => 
      config.filter(folder => {
        if(folder.folder.name === folderName && folder.folder.path === folderPath) {
          return true;
        } else {
          return false;
        }
      })[0])*/
    /*.then(folder => 
      folder.tasks.filter(task => {
        if(taskId === undefined || taskId === null) {
          return true;
        }
        if(task.id === parseInt(taskId, 10)) {
          return true;
        } else {
          return false;
        }
      })
    )
    .catch(err => err);*/
    //return res;
  }

  const saveFolder = (data) => 
    getData()
    .then(config => {
      config.push(data);
      return config;
    })
    .then(config => save(config))
    .catch(err => err);

  let save = (data) => fs.writeFileAsync(path.join(process.cwd(), configName), 
                                         JSON.stringify(data))
                        .catch(err => err);
  

  const saveTask = (folderName, folderPath, data) => 
    getData()
    .then(config => 
      config.map(folder => {
        if(folder.folder.name === folderName && folder.folder.path === folderPath) {
          if(!folder.tasks) {
            folder.tasks = [];
          }
          let id = 1;
          for(var i = 0; i < folder.tasks.length; i++) {
            id = folder.tasks[i].id+1;
          }
          data.id = id;
          folder.tasks.push(data);
        } return folder;
      }))
    .then(config => save(config))
    .catch(err => err);

    const deleteTask = (folderName, folderPath) => {
      getData()
      .then(config => 
        config.forEach(folder => {
          if(folder.folder.name === folderName && folder.folder.path === folderPath) {
            folder.tasks.filter(task => {
              /*if(/* Verify that the task is the correct one to delete) {
                return false;
              } */
              return true;
            });
          }
        })
      )
    };
  

  const get = () => {
    return getData();
  };
  return {
    get: get,
    saveFolder: saveFolder,
    saveTask: saveTask,
    getTasks: getTasks
  }
}

module.exports = configHelper();