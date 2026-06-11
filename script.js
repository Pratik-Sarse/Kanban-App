// let taskData = {};


// const todo = document.querySelector("#todo")
// const progress = document.querySelector("#progress")
// const done = document.querySelector("#done")
// const columns = [todo,progress,done]
// let dragElement = null;

// if (localStorage.getItem("tasks")) {
//     const data = JSON.parse(localStorage.getItem("tasks"))

//     for (const col in data) {
//         const column  = document.querySelector(`#${col}`)
//         data[col].forEach(task => {
//             const div = document.createElement("div")
//             div.classList.add("tasks")
//     div.setAttribute("draggable", "true")

//     div.innerHTML = `
//     <h2>${taskTitle}</h2>
//     <p>${taskDesc}</p>
//     <button>Delete</button>
//     `

//     todo.appendChild(div)

//     div.addEventListener("drag", (e)=>{
//         dragElement = div
//     })

//         })
//     }
// }

// const tasks = document.querySelectorAll(".task")

// tasks.forEach( task =>{
//     task.addEventListener("drag", (e)=>{
//         // console.log("draging" , e)
//         dragElement = task
//     })
// })

// function addDragEventonCulmn (column){
//     column.addEventListener("dragenter", (e)=>{
//     e.preventDefault()
//     column.classList.add("hover-over")
//     })

//     column.addEventListener("dragleave", (e)=>{
//     e.preventDefault()
//     column.classList.remove("hover-over")
//     })

//     column.addEventListener("dragover", (e)=>{
//         e.preventDefault()
//         // console.log("dragover", e)
//     })
//     column.addEventListener("drop", (e)=>{
//         e.preventDefault()

//         columns.forEach(col =>{
//             const tasks = col.querySelectorAll(".task")
//             const count = col.querySelector(".right")

//             taskData [ col.id] = Array.from(tasks).map(t => {
//                 return {
//                     title: t.querySelector("h2").innerText,
//                     desc: t.querySelector("p").innerText
//                 }
//             })
//         })
//         // console.log("droped", dragElement,column)
//         column.appendChild(dragElement)
//         column.classList.remove("hover-over")

//         columns.forEach(col =>{
//             const tasks = col.querySelectorAll(".task")
//             const count = col.querySelector(".right")

//             count.innerHTML = tasks.length
//         })
//     })
// }

// addDragEventonCulmn(todo)
// addDragEventonCulmn(progress)
// addDragEventonCulmn(done)


// // modal related logic

// const toggleModelButton = document.querySelector("#toggle-modal");
// const modalBg = document.querySelector(".modal .bg")
// const modal = document.querySelector(".modal");
// const addTaskButton = document.querySelector("#add-new-task")




// toggleModelButton.addEventListener("click", ()=>{
//     modal.classList.toggle("active")
// })

// modalBg.addEventListener("click",()=>{
//     modal.classList.remove("active")
// })

// addTaskButton.addEventListener("click",()=>{
//     const taskTitle = document.querySelector("#task-title-input").value
//     const taskDesc = document.querySelector("#task-desc-input").value

//     const div = document.createElement("div")

//     div.classList.add("task")
//     div.setAttribute("draggable", "true")

//     div.innerHTML = `
//     <h2>${taskTitle}</h2>
//     <p>${taskDesc}</p>
//     <button>Delete</button>
//     `

//     todo.appendChild(div)
//     columns.forEach(col =>{
//             const tasks = col.querySelectorAll(".task")
//             const count = col.querySelector(".right")

//             taskData [ col.id] = Array.from(tasks).map(t => {
//                 return {
//                     title: t.querySelector("h2").innerText,
//                     desc: t.querySelector("p").innerText
//                 }
//             })
//             localStorage.setItem("tasks", JSON.stringify(taskData))

//             count.innerHTML = tasks.length
//         })

//     div.addEventListener("drag", ()=>{
//         dragElement = div
//     })

//     modal.classList.remove("active")

// })

// // modal related logic


let taskData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const columns = [todo, progress, done];
let dragElement = null;

/* ===========================
   RESTORE FROM localStorage
   =========================== */
if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));

    for (const col in data) {
        const column = document.querySelector(`#${col}`);

        data[col].forEach(task => {
            const div = document.createElement("div");
            div.classList.add("task");  // FIXED (was 'tasks')
            div.setAttribute("draggable", "true");

            div.innerHTML = `
                <h2>${task.title}</h2>
                <p>${task.desc}</p>
                <button>Delete</button>
            `;

            column.appendChild(div);

            // drag event
            div.addEventListener("drag", () => {
                dragElement = div;
            });

            // delete event
            div.querySelector("button").addEventListener("click", () => {
                div.remove();
                updateLocalStorage();
                updateCounts();
            });
        });
    }

    updateCounts();
}

/* ===========================
   EXISTING tasks drag setup
   =========================== */
const tasks = document.querySelectorAll(".task");

tasks.forEach(task => {
    task.addEventListener("drag", () => {
        dragElement = task;
    });

    // delete
    task.querySelector("button").addEventListener("click", () => {
        task.remove();
        updateLocalStorage();
        updateCounts();
    });
});

/* ===========================
   Column Drag Events
   =========================== */
function addDragEventonCulmn(column) {

    column.addEventListener("dragenter", e => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", e => {
        e.preventDefault();
        column.classList.remove("hover-over");
    });

    column.addEventListener("dragover", e => {
        e.preventDefault();
    });

    column.addEventListener("drop", e => {
        e.preventDefault();

        column.appendChild(dragElement);
        column.classList.remove("hover-over");

        updateLocalStorage();
        updateCounts();
    });
}

addDragEventonCulmn(todo);
addDragEventonCulmn(progress);
addDragEventonCulmn(done);

/* ===========================
   Helper Functions
   =========================== */
function updateLocalStorage() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");

        taskData[col.id] = Array.from(tasks).map(t => ({
            title: t.querySelector("h2").innerText,
            desc: t.querySelector("p").innerText
        }));
    });

    localStorage.setItem("tasks", JSON.stringify(taskData));
}

function updateCounts() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");
        count.innerHTML = tasks.length;
    });
}

/* ===========================
   Modal Logic
   =========================== */
const toggleModelButton = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector("#add-new-task");

toggleModelButton.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});

addTaskButton.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-desc-input").value;

    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable", "true");
    div.innerHTML = `
    <h2>${taskTitle}</h2>
    <p>${taskDesc}</p>
    <button>Delete</button>
    `;
    

    todo.appendChild(div);
    

    // drag event
    div.addEventListener("drag", () => {
        dragElement = div;
    });

    // delete event
    div.querySelector("button").addEventListener("click", () => {
        div.remove();
        updateLocalStorage();
        updateCounts();
    });

    updateLocalStorage();
    updateCounts();

    modal.classList.remove("active");

});
