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
        
        // Get the current element thats currently being dragged
        const draggable = document.querySelector('.dragging');
        
        // Append draggable to whatever container we're inside of
        container.appendChild(draggable);
    })
});