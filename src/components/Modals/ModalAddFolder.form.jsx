import React from 'react';
import forms from 'newforms';
import db from '../../db';
import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';

Promise.promisifyAll(fs);

export default forms.Form.extend({
  directory: forms.CharField(),
    clean: ['directory', function(cb) {
      let form = this.cleanedData;
      if (form.directory) {
        let dir = path.dirname(form.directory);
        let base = path.basename(form.directory);

        let folder = { name: base + "/", 
                       path: dir + "/" };
            

        let res = db('folders').find({folder});

        if(res) {
          return cb(null, forms.ValidationError('Folder already exists'));
        } 
        return fs.statAsync(form.directory)
        .then(stats => {
          if(!stats.isDirectory()) {
            return cb(null, forms.ValidationError('Must be a directory'));
          }
          return cb();
        })
        .catch(() => {
          return cb(null, forms.ValidationError('Directory doesn\'t exist'));
        });
      }
    setImmediate(() => cb());
  }]
});
