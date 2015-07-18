# dirsortjs
A filesystem directory sorter that will sort the contents of a folder dependent on user specified rules.

This is a work in progress so any feature may change during implementation, but core idea will not change.

(WIP)

## Usage

``` Coming soon ```

## Idea / Features

Configure dirsortjs in configuration.json. Specify what folders you want sorted and at what interval you want dirsortjs to try and and sort that directory. 

Rules determine what files it will fire an event for. It can check:

- Filename (done)
- File extension (done)
- File created at (WIP)
- File last edited (date)
- File last opened 

Match these by a validator:

- Match (Equals) (Done)
- Contains (Done)
- RegEX match (WIP)

And fire an event:

- Move to a folder (done)
- Rename
- Delete
- Change extension


## Example 

``` Coming soon ```


## Authors

simonlovesyou

## License
MIT-license. Please see LICENSE.txt

