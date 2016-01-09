import React from 'react';
import forms from 'newforms';
import db from '../../db';
import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';

Promise.promisifyAll(fs);

export default forms.Form.extend({
  name: forms.CharField(),
  description: forms.CharField({required: false}),
  matchAll: forms.BooleanField({required: false}),
  interval: forms.IntegerField()
});