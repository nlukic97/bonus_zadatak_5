document.getElementById('grid-btn').addEventListener('click',setGridLayout)
document.getElementById('list-btn').addEventListener('click',setListLayout)

function setGridLayout(){
    document.body.classList.remove('list')
}

function setListLayout(){
    document.body.classList.add('list')
    
}