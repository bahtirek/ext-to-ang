const hoverOn = (event) => hoverOnHandler(event);
const hoverOff = (event) => hoverOffHandler(event);

const addHover = function() {
    const body = document.querySelector('body');
    body.addEventListener('mouseover', hoverOn);
    body.addEventListener('mouseout', hoverOff);
}

const removeHover = function() {
    const body = document.querySelector('body');
    body.removeEventListener('mouseover', hoverOn);
    body.removeEventListener('mouseout', hoverOff);
}

const hoverOnHandler = function(event) {
    if(!event.target.classList.value.includes('ui-br-ext-')){
        event.target.classList.add('ui-br-ext-hovered');
    }
}

const hoverOffHandler = function(event) {
    event.target.classList.remove('ui-br-ext-hovered');
}

export default {
    hoverOn,
    hoverOff,
    addHover,
    removeHover,
    hoverOnHandler,
    hoverOffHandler
}