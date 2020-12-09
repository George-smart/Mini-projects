//Select the Elements 
const date = document.querySelector('[data-date]');
const listContainer = document.querySelector('[data-list-container]');
const input = document.querySelector('[data-input]');
const addBtn = document.querySelector('[ data-add-btn]');
const taskCount = document.querySelector('[data-task-box]');

//Display Date function
function displayDate(){
    const currentDate = new Date()
    const month = currentDate.getMonth();
    const day = currentDate.getDay();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const newDate = currentDate.getDate()
    const year = currentDate.getFullYear()

    date.textContent = `${days[day]} ${newDate} ${months[month]}, ${year}`
}
displayDate();

let list;
let id;

//Select the classs for complete function
const checked = `fa-check-circle`;
const unchecked = `fa-circle`;
const lineThrough = `line-through`

//Add Item function (into the list data)
function addItem(){
    const value = input.value;
    if(value){
        renderItem(value, id, false, false)
        list.push({
            value: value,
            id: id,
            done: false,
            trash: false
        })
        id++;
        localStorage.setItem("TODO", JSON.stringify(list))
        
    }
    input.value = ''
}

//Rendering the todos in the User Interface
function renderItem(todo, id, done, trash){

    if(trash) return;

    const DONE = done ? checked : unchecked;
    const LINE = done ? lineThrough : "";

    const text = `<li class="list-item">
                    <i class="far ${DONE} checked" id="${id}" data-job="complete"></i>
                    <p class="text ${LINE}">${todo}</p>
                    <i class="fas fa-trash-alt del" id="${id}" data-job="delete"></i>
                </li>`
    listContainer.insertAdjacentHTML('beforeend', text)
}


//Event Listener for the add items
addBtn.addEventListener('click', addItem)
document.addEventListener('keypress', e =>{
    if(e.keyCode === 13){
        addItem();
    }
})

//Event Listener for the Complete and remove Items (DOM Trasversing )
listContainer.addEventListener('click', e =>{
    const el = e.target;
    const elementID = e.target.dataset.job
    if(elementID === 'complete'){
        completeItem(el)
    } else if(elementID === 'delete'){
        removeItem(el)
    }
    localStorage.setItem("TODO", JSON.stringify(list))
})

// Complete Todo Function
function completeItem(el){
    el.classList.toggle(checked)
    el.classList.toggle(unchecked)
    el.parentNode.querySelector('.text').classList.toggle(lineThrough);

    list[el.id].done = list[el.id].done ? false : true
}

//Remove Todo Function
function removeItem(el){
    const li = el.parentNode;
    listContainer.removeChild(li)

    list[el.id].trash = true;
}


const lsData = localStorage.getItem('TODO')

if(lsData != null){
    list = JSON.parse(lsData)
    id = list.length;
    loadItems(list)
} else{
    list = [];
    id = 0;
}

//Update User Interface from the local storage
function loadItems(todos){
    todos.forEach(todo =>{
        renderItem(todo.value, todo.id, todo.done, todo.trash)
    })
}
