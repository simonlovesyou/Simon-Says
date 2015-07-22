# dirsortjs
 

A powerful filesystem management tool built with Node.js. Have dirsortjs watch a folder quietly in the background and it will organize the contents for you based on the rules you give it.
 

This is a **WIP**, please see Features list on what’s to come and what’s already implemented.
 

## Usage
 

``` Coming soon ```
 

## Features
 

Choose any folder directory and give it a *rule* and an *event*, either using the CLI or the web interface.

### Rules

*Rules* determine what files it will fire an event for. The following parameters are supported:
 

- Filename
- File extension
 

(WIP):
 
- Date added
- Date created
- Date last modified
- Date last opened
- Size
- Parent folder
 
### Validator

**Match** these parameters by a validator. The following validators are supported:
 
#### Filename and extension
- is
- contains

(WIP):

- RegEX match
- starts with

(Note: the above will have corresponding negative validators aswell, e.g *is not*, *does not contain* and so forth)

#### Date
(WIP):

- is
- is before
- is after
- is within

(Note: the above will have corresponding negative validators aswell, e.g *is not*, *is not before* and so forth)

### Events

If a file inside of the directory obeys a rule it will fire an **event** for that file. The following events are supported:
 
- Move to a folder
- Rename
- Copy

(WIP):

- Delete
- Change extension
- Create and sort to subfolder
- Upload
- Encrypt

## Authors

simonlovesyou
 
## License
MIT-license. Please see LICENSE.txt