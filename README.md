jDraggable
==========

A draggable and map screen visualization jQuery plugin. 

See http://ferrod20.github.io/jDraggable for more information.

## Requirements

* jQuery

## Usage

Include jQuery.
```html
<script src="jquery.js"></script>
```
Include jDraggable. 
```html
<script src="jDraggable.js"></script>
```
Call the plugin.
```javascript
$("#element").draggable({
    propertyName1: "a custom value"
});
```

## Example

The following example shows how to add drag by mouse ability to body element.


```javascript
   $('body').draggable({
                    preventDefault: false,
                    mapLevel: 2
                });
```

This code causes the ability of body element to be dragged using the mouse. Additionally a mini map showing full screen and highlighting the piece of the screen that is currently visualized will appears.

## Options

jDraggable accepts several options to customize its behaviour:


```javascript
   $('body').draggable([options]);
```

### Where options can be cero or more of the followings:

* `mapVisualization`: Shows minimap. Default set to `true`.

* `mapLevel`: Sets the level of html inner elements rendered by the map. The more inner elements level is set, the better graphic precision obtained. Defult set to `1`.

* `avoidElements`: Set here html elements for which drag feature will not be available. Use a [jQuery selector](http://api.jquery.com/Types/#Selector), [jQuery selection](http://api.jquery.com/Types/#jQuery) or [jQuery element](http://api.jquery.com/Types/#Element).

* `preventDefault`: If sets to true, the default action of the draggable element events will not be triggered. Default value is `true`.

* `dragSelector`: A jQuery selector that identifies elements to apply drag feature inside the main element. Default value `>:first`.

#### jDraggable is based on two great plugins:

* [dragscrollable](http://hitconsultants.com/dragscroll_scrollsync/scrollpane.html) by Miqel Herrera

* [minimap](https://github.com/samcroft/mini-map) by Sam Croft
