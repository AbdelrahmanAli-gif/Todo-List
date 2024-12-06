const backgroundImg = document.querySelector('.background-img');
const todoList = document.querySelector('.todo-list');
const todoForm = document.querySelector('.todo-form');
const todoFormInput = document.querySelector('.todo-form-input');
const todoCount = document.querySelector('.todo-item-count');
const clearCompletedBtn = document.querySelector('.clear-completed-btn');
const allFilterBtn = document.querySelector('.all-filter');
const completedFilterBtn = document.querySelector('.completed-filter');
const activeFilterBtn = document.querySelector('.active-filter');
const themeBtn = document.querySelector('.mode-img');
var todoTasks = document.querySelectorAll('.todo-item-task');
var checkMarks = document.querySelectorAll('.checkmark');
var deleteBtns = document.querySelectorAll('.close-icon');
var todoId = 7;
var theme = document.body.className;
var todoClonedItems = [
    {
        id: 1,
        checked: true,
        text: 'Complete online JavaScript course'
    },
    {
        id: 2,
        checked: false,
        text: 'Jog around the park 3x'
    },
    {
        id: 3,
        checked: false,
        text: '10 minutes meditation'
    },
    {
        id: 4,
        checked: false,
        text: 'Read for 1 hour'
    },
    {
        id: 5,
        checked: false,
        text: 'Pick up groceries'
    },
    {
        id: 6,
        checked: false,
        text: 'Complete Todo App on Frontend Mentor'
    }
];

const changeTheme = () => {
    if (theme == 'dark-theme'){
        document.body.className = 'light-theme';
        themeBtn.src = './images/icon-moon.svg';
        backgroundImg.src = window.innerWidth > 600 ? 
        './images/bg-desktop-light.jpg' :
        './images/bg-mobile-light.jpg';
    }
    else {
        document.body.className = 'dark-theme';
        themeBtn.src = './images/icon-sun.svg';
        backgroundImg.src = window.innerWidth > 600 ? 
        './images/bg-desktop-dark.jpg' :
        './images/bg-mobile-dark.jpg';
    }
    theme = document.body.className;
}

const handleEvents = () => {
    checkMarks = document.querySelectorAll('.checkmark');
    deleteBtns = document.querySelectorAll('.close-icon');
    todoTasks = document.querySelectorAll('.todo-item-task');
    deleteBtns.forEach((deleteBtn) => deleteBtn.addEventListener('click', deleteTodo));
    checkMarks.forEach((checkMark) => checkMark.addEventListener('click', updateItem));
    todoTasks.forEach((todoTask) => todoTask.addEventListener('input', resizeInput));
}

const resizeInput = (e) => {
    console.log(e.target.value);
    console.log(e.target.value.length);
    e.target.setAttribute('size', e.target.value.length + 2);
}

const getNumActiveTodos = () => {
    count = 0;
    todoClonedItems.forEach((todoItem) => {
        if (!todoItem.checked) {
            count++;
        }
    });
    return count;
}

const getNewHtml = (item) => {
    return `
    <span class="checkmark ${item.checked ? 'checked-checkmark' : ''}">
        <img src="./images/icon-check.svg" alt="Check Icon" class="tick-img ${item.checked ? 'checked' : ''}">
    </span>
    <input type="text" class="todo-item-task ${item.checked ? 'deleted' : '' }" value="${item.text}" size="${item.text.length + 2}">
    <img src="./images/icon-cross.svg" alt="Delete Todo" class="close-icon">
    <hr class="horizontal-line">`;
}

const createTodoItem = (item) => {
    newTodoHTML = getNewHtml(item);
    newTodo = document.createElement('li');
    newTodo.className = `todo-item${item.checked ? ' checked-todo-item' : ''}`;
    newTodo.setAttribute('id', item.id);
    newTodo.setAttribute('draggable', true);
    newTodo.innerHTML = newTodoHTML;
    todoList.appendChild(newTodo);
}

const getIndex = (itemId) => {
    for (i = 0; i < todoClonedItems.length; i++){
        if (itemId == todoClonedItems[i].id){
            return i;
        }
    }
}

const updateItem = (e) => {
    const item = e.target.closest('.todo-item');  // Find the parent element with the 'todo-item' class
    const itemIndex = getIndex(item.id);
    todoClonedItems[itemIndex].checked = !todoClonedItems[itemIndex].checked;
    if (todoClonedItems[itemIndex].checked) {
        item.classList.add('checked-todo-item');
    }
    else {
        item.classList.remove('checked-todo-item');
    }
    item.innerHTML = getNewHtml(todoClonedItems[itemIndex]);
    updateCount();
}

const changeActiveBtn = (btn) => {
    currentActiveBtn = document.querySelector('.active');
    currentActiveBtn.classList.remove('active');
    btn.classList.add('active');
}

const updateList = (list) => {
    todoList.innerHTML = '';
    list.forEach((item) => {
        createTodoItem(item);
    });
    handleEvents();
}

const getAllTodos = () => {
    updateList(todoClonedItems)
    changeActiveBtn(allFilterBtn);
}

const getCompletedTodos = () => {
    completedList = [];
    todoClonedItems.forEach((todoItem) => {
        if (todoItem.checked){
            completedList.push(todoItem);
        }
    });
    updateList(completedList);
    changeActiveBtn(completedFilterBtn);
}

const getActiveTodos = (e) => {
    activeList = [];
    todoClonedItems.forEach((todoItem) => {
        if (!todoItem.checked){
            activeList.push(todoItem);
        }
    });
    updateList(activeList);
    changeActiveBtn(activeFilterBtn);
}

const updateBackgroundImageOnResize  = () => {
    if (backgroundImg) {
        if (theme == 'dark-theme') {
            backgroundImg.src = window.innerWidth > 600 ? 
            './images/bg-desktop-dark.jpg' :
            './images/bg-mobile-dark.jpg';
        }
        else {
            backgroundImg.src = window.innerWidth > 600 ? 
            './images/bg-desktop-light.jpg' :
            './images/bg-mobile-light.jpg';
        }
    }
}

const updateCount = () => {
    todoCount.innerHTML = `${getNumActiveTodos()} item(s) left`;
    handleEvents();
}

const addTodo = (e) => {
    e.preventDefault();
    if (todoFormInput.value != ''){
        const newItem = {
            id: todoId,
            text: todoFormInput.value,
            checked: false
        }
        todoFormInput.value = '';
        todoClonedItems.push(newItem);
        newTodo = createTodoItem(newItem);
        todoId++;
        updateCount();
    }
}

const deleteTodo = (e) => {
    const itemIndex = getIndex(e.target.parentElement.id);
    todoClonedItems.splice(itemIndex, 1);
    e.target.parentElement.remove();
    updateCount();
}

const clearCompletedTodos = () => {
    var tempList = [];
    todoClonedItems.forEach((todoItem) => {
        if (!todoItem.checked){
            tempList.push(todoItem);
        }
        else {
            document.querySelector('.checked-todo-item').remove();
        }
    });
    todoClonedItems = tempList;
}

const loadPage = () => {
    updateBackgroundImageOnResize ();
    todoClonedItems.forEach((item) => {
        createTodoItem(item);
    });
    todoCount.innerHTML = `${getNumActiveTodos()} item(s) left`;
    handleEvents();
    theme = document.body.className;
}

themeBtn.addEventListener('click', changeTheme);
todoForm.addEventListener('submit', addTodo);
allFilterBtn.addEventListener('click', getAllTodos);
activeFilterBtn.addEventListener('click', getActiveTodos);
completedFilterBtn.addEventListener('click', getCompletedTodos);
clearCompletedBtn.addEventListener('click', clearCompletedTodos);
window.addEventListener('load', loadPage);
window.addEventListener('resize', updateBackgroundImageOnResize );

// Drag and drop stuff
let draggedItem = null;
let draggedItemIndex = null;
let afterElement = null;
let afterElementIndex = null;

const reorderTodoClonedList = () => {
    temp = todoClonedItems[draggedItemIndex];
    if (draggedItemIndex > afterElementIndex) {
        for (i = draggedItemIndex; i > afterElementIndex; i--) {
            todoClonedItems[i] = todoClonedItems[i - 1];
        }
        todoClonedItems[afterElementIndex] = temp;
    }
    else {
        for (i = draggedItemIndex; i < afterElementIndex; i++) {
            todoClonedItems[i] = todoClonedItems[i + 1];
        }
        todoClonedItems[afterElementIndex] = temp;
    }
}

const onDragStart = (e) => {
    draggedItem = e.target;
    draggedItemIndex = getIndex(draggedItem.id);
    e.target.classList.add('dragging');
}

const onDragEnd = (e) => {
    e.target.classList.remove('dragging');
    if (draggedItemIndex !== afterElementIndex) {
        reorderTodoClonedList();
    }
    draggedItem = null;
    draggedItemIndex = null;
    afterElement = null;
    console.log(todoClonedItems);
}

const onDragOver = (e) => {
    e.preventDefault();
    afterElement = getDragAfterElement(todoList, e.clientY);
    if (afterElement == null) {
        todoList.appendChild(draggedItem);
        afterElementIndex = todoClonedItems.length - 1;
    } else {
        todoList.insertBefore(draggedItem, afterElement);
        afterElementIndex = getIndex(afterElement.id);
    }
};

const getDragAfterElement = (container, y) => {
    const draggableElements = [
        ...container.querySelectorAll("li:not(.dragging)")
    ];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return {
                offset: offset,
                element: child,
            };
        } 
        else {
            return closest;
        }},
        {
            offset: Number.NEGATIVE_INFINITY,
        }
        ).element;
};

todoList.addEventListener('dragstart', onDragStart);
todoList.addEventListener('dragend', onDragEnd);
todoList.addEventListener("dragover", onDragOver);