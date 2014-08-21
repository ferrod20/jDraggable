jDraggable
==========

A draggable and map screen visualization jQuery plugin.

## How to Use?

jDraggable depends on jQuery. Include them both in your HTML code:

```javascript
<script src="jquery.js" type="text/javascript"></script>
<script src="jDraggable.js" type="text/javascript"></script>
```

## Code

```javascript
   $('body').draggable({
                    preventDefault: false,
                    mapLevel: 2
                })
```

This causes the body element be able to drag using the mouse. Additionally a mini map showing full screen and highlighting the piece of the screen that is currently visualized will appears.


#### jDraggable is based on two great plugins:

`dragscrollable`: http://hitconsultants.com/dragscroll_scrollsync/scrollpane.html (Miqel Herrera)

`minimap`: https://github.com/samcroft/mini-map (Sam Croft)
