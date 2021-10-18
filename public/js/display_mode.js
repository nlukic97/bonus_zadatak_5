document.getElementById('grid-btn').addEventListener('click',setGridLayout)
document.getElementById('list-btn').addEventListener('click',setListLayout)


// The layout will be a list view only if the body contains the class .list. The layout will always be a list on mobile devices
function setGridLayout(){
    document.body.classList.remove('list')
}

function setListLayout(){
    document.body.classList.add('list')
    
}