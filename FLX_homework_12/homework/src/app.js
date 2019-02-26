const rootNode = document.getElementById('root');
const mainPage = document.getElementById('main-page');
const newItemPage = document.getElementById('add-item-page');
const editItemPage = document.getElementById('edit-item-page');
const addNewInput = document.getElementById('add-new-input');
const saveNewBtn = document.getElementById('save-new-btn');
const todoItems = JSON.parse(localStorage.getItem('items')) || [];
const firstElement = 0;
const arrLength = firstElement;
const maxId = 1000000;
const toDoStatus = document.getElementsByClassName('todo-status')[firstElement];

rootNode.appendChild(mainPage);

window.onload = locationHashChanged;
window.onhashchange = locationHashChanged;
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('trash-icon') || e.target.classList.contains('check-item')) {
        let id = parseFloat(e.target.parentNode.classList[firstElement].split('_').pop());
        let arrElem = todoItems.find(function (elem) {
            return elem.id === id;
        });
        let arrIndex = todoItems.indexOf(arrElem);
        todoItems.splice(arrIndex, 1);
        e.target.parentNode.remove();
        if (e.target.classList.contains('check-item')) {
            arrElem.isDone = true;
            todoItems.push(arrElem);
            createItemsList(todoItems)
        }
        saveToLocalStorage();
        hideElement(toDoStatus, todoItems);
    }
});

saveNewBtn.addEventListener('click', function (e) {
    let val = addNewInput.value;
    let id = generateId(todoItems);
    todoItems.push({
        isDone: false,
        id: id,
        description: val
    });
    saveToLocalStorage();
});

function locationHashChanged() {
    if (location.hash.startsWith('#modify-item')) {
        appendCorrectRoot(editItemPage, ['main-page', 'add-item-page']);
        startEditMode(location.hash.split('_').pop());
    } else if (location.hash === '#add-new') {
        appendCorrectRoot(newItemPage, ['main-page', 'edit-item-page']);
        addNewInput.val = '';
    } else {
        appendCorrectRoot(mainPage, ['add-item-page', 'edit-item-page']);
        mainPage.appendChild(createItemsList(todoItems));
    }
}

function appendCorrectRoot(pageToShow, pagesToHide) {
    rootNode.appendChild(pageToShow);
    pagesToHide.forEach(function (elem) {
        let elemToRemove = document.getElementById(elem);
        if (elemToRemove) {
            elemToRemove.remove();
        }
    });
}

function startEditMode(id) {
    let editInput = document.getElementById('edit-input');
    let saveEditBtn = document.getElementById('save-edit-btn');
    let editItem = todoItems.find(function (todoItem) {
        return todoItem.id === parseFloat(id);
    });
    editInput.value = editItem.description;
    saveEditBtn.addEventListener('click', function (e) {
        editItem.description = editInput.value;
        saveToLocalStorage();
    });
}

function createItemsList(todoItems) {
    const wrapper = document.getElementsByClassName('all-items-wrapper')[firstElement];
    wrapper.innerHTML = '';
    for (let i = firstElement; i < todoItems.length; i++) {
        let item = document.createElement('div');
        item.classList.add(`todo-item_${todoItems[i].id}`);
        item.innerHTML = `<input type='checkbox' class='check-item' ${todoItems[i].isDone ? 'checked disabled' : ''}>
        <a href='#modify-item_${todoItems[i].id}'>
            <span class='item-text'>${todoItems[i].description}</span></a>
            <i class='material-icons trash-icon'>delete</i>`
        wrapper.appendChild(item);
    }
    hideElement(toDoStatus, todoItems);
    return wrapper;
}

function hideElement(e, arr) {
    if (arr.length > arrLength) {
        e.classList.add('hidden')
    }
    if (arr.length === arrLength) {
        e.classList.remove('hidden')
    }
}

function generateId(arr) {
    let id = firstElement;
    let ids = arr.map(function (elem) {
        return elem.id
    });
    while (ids.includes(id)) {
        id = Math.floor(Math.random() * Math.floor(maxId));
    }
    return id;
}

function saveToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(todoItems));
}