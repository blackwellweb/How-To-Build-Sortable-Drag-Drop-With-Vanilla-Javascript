const draggables = document.querySelectorAll('.draggable');

// where are draggable elements can be dragged to
const containers = document.querySelectorAll('.container');



// Note: dragstart event might not work on mobile screens need to look into!
// Loop over each draggable add a dragstart event to each
draggables.forEach(draggable => {

    // When drag starts
    // Add class dragging
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    })


    // When drag ends
    // Remove class dragging
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    })

});



// Loop through our containers in order to determine how our dragging works
// for when we're dropping our element as well as how when we're moving our element around 
containers.forEach(container => {
    container.addEventListener('dragover', e => {


        // Endable dropping as its disabled by default (our cursor by deafult will have the do not allow symbol)
        // So remove it from our event object
        e.preventDefault();


        // Pass in our current container into afterElement
        const afterElement = getDragAfterElement(container, e.clientY);


        // Get the current element thats currently being dragged
        const draggable = document.querySelector('.dragging');

        // If we are not above anything
        if(afterElement === null) {
             // Append draggable to whatever container we're inside of
            container.appendChild(draggable);
        }else{
            container.insertBefore(draggable, afterElement);
        }
        
    })
});


// Note: In a nutshell this function lets us find out where  dragging div is being placed 
// Next step is to determine the order of our elements based on where our mouse position is
// (which element we're actually placing our dragging element in between)
function getDragAfterElement(container, y) {

    // Get every draggable element but the one we're currently dragging
    // Then we use the spread operator to turn this into a new array as querySelectorAll returns a nodelist
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    // Loop through this elements list of draggable Elements and we are going to determine which single 
    // element is the one that is directly after our mouse cursor base on the y position
   return draggableElements.reduce((closest, child) => {

        // Determine the actual positon of the elements on our screen in relation to our mouse
        const box = child.getBoundingClientRect();


        // Get the distance between the center of our box and our actual mouse
        const offset = y - box.top - box.height / 2;

        // If the offset is a negative its above the element we are hovering over and thats the one we want
        if (offset < 0 && offset > closest.offset){
            // Return our current offset and an element witch is going to be our child (the current child we are iterating through)
            return {offset: offset, element: child};
        } else{
            return closest;
        }
    
        // This is just so that initially we have a number that is way too large
        // than every single other element in the list is going to be closer than this Number.NEGATIVE_INFINITY
    }, {offset: Number.NEGATIVE_INFINITY}).element;
    
}