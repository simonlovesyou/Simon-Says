import Promise from 'bluebird';
import path from 'path';
let fs = Promise.promisifyAll(require('fs'));

const configHelper = () => {

  let config = 'config/app_configuration.min.JSON'
  let innerRepresentation;

  const getData = () => {

    if(!innerRepresentation || innerRepresentation.changed) {
      return fs.readFileAsync(path.join(process.cwd(), config), 'utf8')
      .then(data => JSON.parse(data))
      .then(config => {
        innerRepresentation = config;
        return config;
      })
      .catch(err => {
        return err;
      });
    }
    return new Promise(resolve => {
      resolve(innerRepresentation);
    });
  }

  const getTasks = (folderName, folderPath, taskId) =>
    getFolder(folderName, folderPath)
    .then(folder =>
      folder.tasks.filter(task => {
        if(taskId === undefined || taskId === null) {
          return true;
        }
        if(task.id === parseInt(taskId, 10)) {
          return true;
        }
        return false;
      })
    )
    .catch(err => {throw err;});

  const getFolder = (folderName, folderPath) => {
    if(!folderName || !folderPath) {
      throw new Error('Parameters are wrong');
    }
    return getData()
    .then(config =>
      config.folders.filter(folder => {
        if(folder.folder.name === folderName && folder.folder.path === folderPath) {
          return true;
        }
        return false;
      })[0])
    .then(folder => {
      if(folder) {
        return folder;
      }
      throw new Error('No folder found');
    })
    .catch(err => {throw err;});
  }

  const saveFolder = (data, folderName, folderPath) => {
    if(folderName || folderPath) {
      return getData()
      .then(config => {console.log(config); return config;})
      .then(config => config.folders.map(folder => {
        if(folder.folder.name === folderName && folder.folder.path === folderPath) {
          return data;
        } 
        return folder;
      }))
      .then(config => {console.log("new data:"); console.log(config); return config;})
      .then(newConfig => save(newConfig))
      .catch(err => {
        throw err;
      });
    }
    return getData()
    .then(config => {
      config.push(data);
      return config;
    })
    .then(config => save(config))
    .catch(err => err);
  }

  let save = (data) => fs.writeFileAsync(path.join(process.cwd(), config),
                                         JSON.stringify(data))
                        .catch(err => err);
 

  const saveTask = (folderName, folderPath, data) => {

    return getFolder(folderName, folderPath)
    .then(folder => {
      folder.tasks = folder.tasks || [];
      folder.tasks.push(data);
      return folder;
    })
    .then(config => {console.log("new folder:"); console.log(config); return config;})
    .then(folder => {
      console.log(folderName, folderPath);
      return saveFolder(folder, folderName, folderPath);
    })
  }

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
    saveFolder,
    saveTask,
    getTasks
  }
}

module.exports = configHelper();