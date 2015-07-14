# dirsortjs
A filesystem directory sorter that will sort the contents of a folder dependent on user specified rules.

This is a work in progress so any feature may change during implementation, but core idea will not change.

## Usage

``` Coming soon ```

## Idea / Features

Configure dirsortjs in configuration.json. Specify what folders you want sorted and at what interval you want dirsortjs to try and and sort that directory. 

Specify sorting rules. A rule may contain different qualifiers, such as:

1. match by file extension (contain, does not contain, is)
2. match by filename (contain, does not contain, is)
3. match by last modified (until, after, match)
4. custom


When all conditions in a rule returns true it will trigger an event or a chain of events, e.g:
- Move to parent directory
- Rename file
- Move to directory
- Custom

### Custom events / rules

A custom rule must return true or false, anything else will throw an error. A custom event must return a callback.

## Example 

``` Coming soon ```


## Authors

simonlovesyou

## License
MIT-license. Please see LICENSE.txt

