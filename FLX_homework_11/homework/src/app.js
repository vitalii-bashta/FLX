let rootNode = document.getElementById('root');
let input = document.getElementById('input');
let addBox = document.getElementById('add-box');
let firstArrElement = 0;
let itemWrapper = document.getElementsByClassName('todo-wrapper')[firstArrElement];
let warning = document.getElementsByClassName('warning')[firstArrElement];
let checkBoxClass = 'cb-unchecked';
let trashClass = 'trash';
let dragableElementClass = 'single-item';
let counter = 0;
let maxListItems = 10;
let source;

addBox.addEventListener('click', addItem);
rootNode.addEventListener('click', traceDocumentClicks);

function traceDocumentClicks(e) {
    if (e.target.classList.contains(checkBoxClass)) {
        e.target.classList.add('hidden');
        e.target.parentElement.getElementsByClassName('cb-checked')[firstArrElement].classList.remove('hidden');
    }
    if (e.target.classList.contains(trashClass)) {
        e.target.parentElement.remove();
        counter--;
        checkIfListFull();
    }
    e.stopImmediatePropagation();
}



function addItem() {
    if (!checkIfListFull() && input.value) {
        createListItem(input.value);
        counter++;
    }
    input.value = '';
    return;
}

function createListItem(text) {
    let newElem = document.createElement('div');
    newElem.classList.add(dragableElementClass);

    newElem.setAttribute('draggable', 'true');
    newElem.setAttribute('ondragstart', 'dragStarted(event)');
    newElem.setAttribute('ondragover', 'draggingOver(event)');
    newElem.setAttribute('ondrop', 'dropped(event)');

    newElem.innerHTML = `<i class='material-icons cb-checked hidden'>check_box</i>
    <i class='material-icons cb-unchecked'>check_box_outline_blank</i>
    <p class='todo-item'>${text}</p>
    <i class='material-icons trash' id='delete'>delete</i>`

    itemWrapper.appendChild(newElem);
}

function checkIfListFull() {
    if (counter >= maxListItems) {
        warning.classList.remove('hidden');
        input.setAttribute('disabled', true);
        return true
    } else {
        warning.classList.add('hidden');
        input.removeAttribute('disabled');
        return false
    }
}

function dragStarted(e) {
    source = e.target;
    e.dataTransfer.setData('text/plain', e.target.innerHTML);
    e.dataTransfer.effectAllowed = 'move';
}

function draggingOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function dropped(e) {
    e.preventDefault();
    e.stopPropagation();
    let target = e.target;

    if (e.target.localName === 'i' || e.target.localName === 'p') {
        target = target.parentElement;
    }
    if (source.localName === 'i' || source.localName === 'p') {
        source = source.parentElement;
    }

    source.innerHTML = target.innerHTML;
    target.innerHTML = e.dataTransfer.getData('text/plain');
}
