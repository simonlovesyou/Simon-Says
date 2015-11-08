//import dirsortjs from './index.js'
import background from './background/background.js';
import appLogic from './engine/logic.js';

appLogic.start();

background();

process.on('uncaughtException', function (er) {
  console.error(er.stack)
  process.exit(1)
});

