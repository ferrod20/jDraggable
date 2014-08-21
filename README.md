jDraggable
==========

A draggable and map screen visualization jQuery plugin. 

See http://ferrod20.github.io/jDraggable for more information.

## How to Use?

jDraggable depends on jQuery. Include them both in your HTML code:

```javascript
<script src="jquery.js" type="text/javascript"></script>
<script src="jDraggable.js" type="text/javascript"></script>
```

## Example

```javascript
   $('body').draggable({
                    preventDefault: false,
                    mapLevel: 2
                });
```

This causes the body element be able to drag using the mouse. Additionally a mini map showing full screen and highlighting the piece of the screen that is currently visualized will appears.

## Code

```javascript
   $('body').draggable([options]);
```

### Where options can be cero or more of the followings:

`mapVisualization`: Shows minimap. Default set to **true**.

`mapLevel`: Sets the level of html inner elements rendered by the map. The more inner elements level is set, the better graphic precision obtained. Defult set to **1**.

`avoidElements`: Set here html elements for which drag feature will not be available. Use a [jQuery selector](http://api.jquery.com/Types/#Selector), [jQuery selection](http://api.jquery.com/Types/#jQuery) or [jQuery element](http://api.jquery.com/Types/#Element).

`preventDefault`: If sets to true, the default action of the draggable element events will not be triggered. Default value is **true**.

`dragSelector`: A jQuery selector that identifies elements to apply drag feature inside the main element. Default value **>:first**.

#### jDraggable is based on two great plugins:

[dragscrollable](http://hitconsultants.com/dragscroll_scrollsync/scrollpane.html) by Miqel Herrera

[minimap](https://github.com/samcroft/mini-map) by Sam Croft
