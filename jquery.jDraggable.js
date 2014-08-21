/* https://github.com/ferrod20/jDraggable
*
* jDraggable Plugin
* version: 0.1 (alpha)
* Created by Fernando Rodriguez
* 
* Based on two great plugins:
* dragscrollable: http://hitconsultants.com/dragscroll_scrollsync/scrollpane.html (Miqel Herrera)
* minimap: https://github.com/samcroft/mini-map (Sam Croft)
*
*/

function Map(el) {
    var isOpen;
    var map;
    var mapView;
    var self = this;
    var deepLevel = 1;

    //minimap events and movement
    var mouseClicked = false;
    var clickX = 0;
    var clickY = 0;
    
    var
        containerHeight, containerWidth,
        mapViewWidth, mapViewHeight,    
        mapWidth, mapHeight;

    var mapMouseMove = function (e) {
        e.preventDefault();
        if (mouseClicked) {
            var top = e.pageY - mapViewHeight;
            var left = e.pageX - mapViewWidth;
            clickX = e.pageX;
            clickY = e.pageY;

            top = Math.max(0, top);
            top = Math.min(mapWidth - mapViewWidth, top);

            left = Math.max(0, left);
            left = Math.min(mapHeight - mapViewHeight, left);

            var mapTop = (top * containerHeight) / mapHeight;
            var mapLeft = (left * containerWidth) / mapWidth;
            mapView.css("top", top);
            mapView.css("left", left);
            map.css("top", -mapTop);
            map.css("left", -mapLeft);
        }
    };

    var mapMouseDown = function (e) {
        e.preventDefault();
        mouseClicked = true;
        clickX = e.pageX;
        clickY = e.pageY;
        mapMouseMove(e);
    };

    var mapMouseUp = function (e) {
        mouseClicked = false;
    };
    
    //create map
    //iterate through childs and create 1/20th scale divs in map
    var createMap = function () {
        //create map
        $('#map').remove();

        el.after('<div id="map">');
        map = $('#map');
        map.append('<div id="view">');
        mapView = $('#view');
        //iterate through childs until reach deepLevel and add them to the map
        var children = el;
        var dLevel = deepLevel;
        while (dLevel > 0) {
            children = children.children();
            dLevel--;
        }

        drawChildren(map, children);

        addMapEventsAndMeasures();
    };

    var addMapEventsAndMeasures = function () {
        map
                .mousedown(mapMouseDown)
                .mouseup(mapMouseUp)
                .mouseout(mapMouseUp)
                .mousemove(mapMouseMove);

        containerHeight = el.height();
        containerWidth = el.width();
        
        mapViewHeight = mapView.height();
        mapViewWidth = mapView.width();

        mapHeight = map.height();
        mapWidth = map.width();        
    };
    
    var drawChildren = function (map, children) {
        //draw each child
        children.each(function (i) {
            var child = $(this);
            var coords = child.position();

            var mapIconWidth = child.width() / 20;
            var mapIconHeight = child.height() / 20;
            var mapIconX = coords.left / 20;
            var mapIconY = coords.top / 20;

            var mapIcon = $('<div>');
            mapIcon.css({ 'width': mapIconWidth + 'px', 'height': mapIconHeight + 'px', 'left': mapIconX + 'px', 'top': mapIconY + 'px' });

            mapIcon.appendTo(map);
        });
    };
    
    var show = function () {
        var $document = $(document);
        var $window = $(window);

        //set map size 1/20th of everything
        var mapWidth = ($document.width() / 20) + 10;
        var mapHeight = ($document.height() / 20) + 10;
        map.css({ 'width': mapWidth + 'px', 'height': mapHeight + 'px' });

        //set current view        
        var mapViewWidth = ($window.width() / 20) + 10;
        var mapViewHeight = ($window.height() / 20) + 10;
        mapView.css({ 'width': mapViewWidth + 'px', 'height': mapViewHeight + 'px' });
    };

    var onWindowResize = function () {
        el
            .find('.open')
            .removeClass('open')
            .removeClass('transition');

        isOpen = false;

        setTimeout(function () { createMap(); show(); }, 500);
    };

    var onWindowScroll = function () {
        //reposition current view
        var mapViewX = $(window).scrollLeft() / 20;
        var mapViewY = $(window).scrollTop() / 20;

        //for iOS
        mapView.css({ 'left': mapViewX + 'px', 'top': mapViewY + 'px' });
    };

    this.setup = function (dLevel) {
        deepLevel = dLevel;
        $(window)
            .resize(onWindowResize)
            .scroll(onWindowScroll);

        createMap();
        show();
    };
};


(function ($) {
    $.fn.dragToScroll = function (options) {
        var self;
        var settings = $.extend({
                    dragSelector: '>:first',
                    acceptPropagatedEvent: true,
                    preventDefault: true,
                    avoidElements: null,
                    mapVisualization: true,
                    mapLevel: 1
                }, options || {});
        
        var mouseMoveHandler = function (event) { // User is dragging
            // How much did the mouse move?
            var data = event.data;
            var scrollable = data.scrollable;
            var delta = {
                left: (event.clientX - data.lastCoord.left),
                top: (event.clientY - data.lastCoord.top)
            };

            // Set the scroll position relative to what ever the scroll is now
            scrollable.scrollLeft(scrollable.scrollLeft() - delta.left);
            scrollable.scrollTop(scrollable.scrollTop() - delta.top);

            // Save where the cursor is
            data.lastCoord = { left: event.clientX, top: event.clientY };
            if (data.preventDefault) {
                event.preventDefault();
                return false;
            }
            return true;
        };
        
        var mouseUpHandler = function (event) { // Stop scrolling
            $.event.remove(document, "mousemove.jDraggable", mouseMoveHandler);
            $.event.remove(document, "mouseup.jDraggable", mouseUpHandler);
            if (event.data.preventDefault) {
                event.preventDefault();
                return false;
            }
            return true;
        };

        var mouseDownHandler = function (event) {
            var result = true;
            var data = event.data;
            // mousedown, left click, check propagation
            var target;
            if (event.target)
                target = event.target;
            else
                if (event.srcElement)
                    target = event.srcElement;

            if (target && target.nodeType == 3) // defeat Safari bug
                target = target.parentNode;

            var avoidElement = $(target).closest(data.avoidElements).length > 0;
            var acceptEvent = (data.acceptPropagatedEvent && !avoidElement) || event.target == this;

            if (event.which != 1 || !acceptEvent)
                result = false;
            else {
                // Initial coordinates will be the last when dragging
                data.lastCoord = { left: event.clientX, top: event.clientY };

                $.event.add(document, "mouseup.jDraggable", mouseUpHandler, data);
                $.event.add(document, "mousemove.jDraggable", mouseMoveHandler, data);
                if (data.preventDefault) {
                    event.preventDefault();
                    result = false;
                }
            }
            return result;
        };
                        
        var resetMouseIcon = function (event) {        

        };
        
        // set up the initial events
        this.each(function () {
            // closure object data for each scrollable element
            self = $(this);
            var data = {
                scrollable: self,
                acceptPropagatedEvent: settings.acceptPropagatedEvent,
                preventDefault: settings.preventDefault,
                avoidElements: settings.avoidElements
            };

            // Set mouse initiating event on the desired descendant
            self
                .find(settings.dragSelector)
                .off('mousedown.jDraggable')
                .on('mousedown.jDraggable', data, mouseDownHandler)
                .css('cursor', 'move');

            if (settings.avoidElements)
                self
                    .find(settings.dragSelector)
                    .find(settings.avoidElements)
                    .css('cursor', 'default');

            $(window).resize(resetMouseIcon);
            
            if (settings.mapVisualization) {
                var map = new Map(self);
                map.setup(settings.mapLevel);
            }
        });
    };
})(jQuery);
