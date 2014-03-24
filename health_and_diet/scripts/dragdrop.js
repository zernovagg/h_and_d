/* Used this tutorial to do this exercise and try and get it working 
    http://html5demos.com/drag */

/* This works from Rem but needs some love, so may just rewrite it myself.
    Need to make the <td>s have the drop events and they need a dragenter and dragleave for the className
    Also, the main events should be attached using JS to put them on the proper elements (seeing a lot of inline JS stuff out there, yuck). 
    So use the opera article and the example from Rem as well as a few others to cobble something together on my own - then clean it up 
    http://dev.opera.com/articles/view/drag-and-drop/
    http://playground.html5rocks.com/#drag_and_drop
    http://www.html5rocks.com/en/tutorials/dnd/basics/
    http://www.developerdrive.com/2012/03/implementing-drag-and-drop-functions-with-html5-and-javascript/ (not great but gives some ideas) 
    http://www.techrepublic.com/blog/webmaster/learn-to-use-the-html5-drag-and-drop-api/2456 
    Need to use events to addEventListener to get things working with ondragstart, ondragend, ondragenter, ondragleave properly 
    Interesting article on this, but may be a bit too indepth? http://www.useragentman.com/blog/2010/01/10/cross-browser-html5-drag-and-drop/ */
    

/* How this should work:

1. Add the draggable = true to the li elements (maybe these should be a?) DONE
2. Make the li change opacity on drag start - visual clue you are doing something. DONE
3. Add the event listeners for the dragstart and the dragend DONE
4. Add the drop targets to the tds. 
5. Make it so the li is deleted from the list where it currently is and then added to the td 
6. Make a class get added to the td for the .over effect (when you drag over it).  DONE

*/

function handleDragStart(e) {
  this.classList.add('draggable'); 
  
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
  
}

function handleDragEnd(e) {
    this.classList.remove('draggable');
}

function handleDragOver(e) {
    e.preventDefault(); // Necessary. Allows us to drop.
    e.dataTransfer.dropEffect = 'move';

    return false;
}

function handleDragEnter(e) {
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
    e.stopPropagation(); // prevent redirect
    // Not happy to have this HTML and CSS in the JS - will refactor later
    this.innerHTML += '<span class="menu-item">' + e.dataTransfer.getData('text/html') + '</span>';
    this.classList.remove('over');
    
    return false;
}

function handleDragEndDropZone(e) {
    this.classList.remove('over');
}

// Make all li tags draggable and add the events to them for dragstart and dragend
(function () {
    var links = document.querySelectorAll('li');
    var i = 0;
    var max = links.length;
    for (; i < max; i++) {
        elements = links[i];
         /* Set the draggable attribute on the lis */
        elements.setAttribute('draggable', 'true');
        elements.classList.add('list-item');
    }
    
    Array.prototype.forEach.call(links, function (element) {
        
        /* setting the class on the li when it is dragged */
        element.addEventListener('dragstart', handleDragStart, false);
        
        /* Removing the class after it is done being dragged */
        element.addEventListener('dragend', handleDragEnd, false);
        
    });
}());


// Grab all the tds and add the dragenter and drageleave and drop events to the tds
(function () {
    var tds = document.querySelectorAll('td');
    
    Array.prototype.forEach.call(tds, function (element) {
        
        /* Set a class on the td when the li is dragged over it */
        element.addEventListener('dragenter', handleDragEnter, false);
        
        /* Remove the class when it leaves and is no longer over it */
        element.addEventListener('dragleave', handleDragLeave, false);
        
        /* drop the text if the user drops there */
        element.addEventListener('dragover', handleDragOver, false);
        element.addEventListener('drop', handleDrop, false);
    });
}());
