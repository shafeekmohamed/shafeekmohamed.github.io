console.log(document);

// userInput = "";

const newElement = document.createElement("div");
// newElement.innerText = userInput;
newElement.setAttribute("class","task");



const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const taskContainer = document.getElementById("task-container");

inputBox.focus();

function applyStyles(element, userInput){
    element.innerHTML = userInput;
    // const stylekeys = Object.keys(styles);

    // console.log(stylekeys);

    // for(let i = 0; i < stylekeys.length; i++){
    //     console.log(stylekeys[0]);
    //     let key = stylekeys[i];
    //     let value = styles[key];
    //     element.style[key] = value
    // }
}

function handleTaskClick(){
    this.classList.toggle("completed");
    // const taskValue = this.innerText;

    const taskId = this.id.toString();
    console.log(taskId);
    // console.log(taskValue);
    for(i=0;i < taskArray.length; i++){
        // console.log(i);
        const taskObj = taskArray[i];
        if(taskObj.id.toString() === taskId){
            taskObj.isCompleted = !taskObj.isCompleted
        }
    }

    setTask()
}

function handleRemove(){
    
    // const taskValue = this.innerText;
    const taskId = this.id.toString();
    for(let i = 0; i < taskArray.length; i++){
        const taskObj = taskArray[i];
        if(taskObj.id.toString() === taskId){
            // console.log(taskValue);
            console.log(`index of ${i}`);
            taskArray.splice(i, 1)
        }
    }

    setTask();
    this.remove();
}

const taskArray = []

function consoleArray(){
    console.log(taskArray);
}

function setTask(){
    localStorage.setItem("task", JSON.stringify(taskArray))
}

function createTask(userInput, isCompleted, taskId){
    const newElement = document.createElement('div')
    newElement.innerHTML = userInput;
    newElement.setAttribute('id', taskId)

    if(isCompleted) newElement.setAttribute('class', 'task completed')
    else newElement.setAttribute('class', 'task')
    
    applyStyles(newElement, userInput);
    // newElement.setAttribute('class', 'task')
    newElement.addEventListener('click', handleTaskClick)
    newElement.addEventListener('dblclick', handleRemove)
    taskContainer.append(newElement)
}

function getTask(){
    let tasks = localStorage.getItem("task");

    if(!tasks){
        return;
    }
    let task = JSON.parse(tasks)
    console.log(task);
    for(index in task){
        taskObj = task[index];
        createTask(taskObj.values, taskObj.isCompleted, taskObj.id)
        taskArray.push(taskObj);
    }
}

getTask()

function addTask(){
    const userInput = inputBox.value;
    const length = userInput.length
   
    if(length===0) return

    const inputLength = userInput.length
    console.log('input length: ' + inputLength);
    let count = 0; 
    
    for(let i=0; i < inputLength; i++){
        if(userInput[i] === ' '){
            count += 1;

        }
    }

    console.log(count);

    if(inputLength === count){
       return alert("please")
    }

    let taskObj = {};
    let taskId = Math.random().toString();
    taskObj.values = userInput;
    taskObj.isCompleted = false;
    taskObj.id = taskId;
    console.log(taskObj);
    taskArray.push(taskObj);
    console.log(taskArray);
    setTask();

    createTask(userInput, false, taskId);
   
}

function handleEnter(e){
    if(e.keyCode == 13){
        addTask();
    };
}

inputBox.addEventListener('keyup', handleEnter)

addBtn.addEventListener('click' , addTask);
console.log(inputBox);


function eventFunction(e){
    console.log(e);
}