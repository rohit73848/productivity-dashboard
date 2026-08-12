const themeBtn = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');

const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
}

themeBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.classList.replace('ri-sun-line', 'ri-moon-line');
        localStorage.setItem('theme', 'light'); // লোকাল স্টোরেজে সেভ
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
        localStorage.setItem('theme', 'dark'); // লোকাল স্টোরেজে সেভ
    }
});

// --- Clock and Greeting Logic ---
const timeElement = document.getElementById('current-time');
const amPmElement = document.getElementById('am-pm');
const greetingElement = document.getElementById('greeting-message');
const dateElement = document.getElementById('current-date');

function updateClockAndGreeting() {
    const now = new Date();
    
    // --- 1. Time Set Up---
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    timeElement.textContent = `${hours}:${minutes}`;
    amPmElement.textContent = ampm;

    // --- 2. Date SetUp ---
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);

    // --- 3. Greeting Logic---
    const currentHour = now.getHours(); // 24 ঘণ্টার ফরম্যাটে সময় নেবে
    let greeting = 'Good Evening';
    
    if (currentHour >= 5 && currentHour < 12) {
        greeting = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
        greeting = 'Good Afternoon';
    }
    
    greetingElement.textContent = `${greeting}, Boss!`; 
}

updateClockAndGreeting();
setInterval(updateClockAndGreeting, 1000);
// --- To-Do List Logic ---
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('dashboard_tasks')) || [];

function renderTasks() {
    taskList.innerHTML = ''; 

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <div class="task-content" data-index="${index}">
                <i class="${task.completed ? 'ri-checkbox-circle-fill' : 'ri-checkbox-blank-circle-line'}"></i>
                <span class="task-text">${task.text}</span>
            </div>
            <button class="delete-btn" data-index="${index}">
                <i class="ri-delete-bin-line"></i>
            </button>
        `;
        taskList.appendChild(li);
    });
}

// New Task Add Logic
function addTask() {
    const text = taskInput.value.trim();
    if (text !== '') {
        tasks.push({ text: text, completed: false });
        localStorage.setItem('dashboard_tasks', JSON.stringify(tasks));
        taskInput.value = ''; 
        renderTasks(); 
    }
}

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// --- Event Delegation / Event Bubbling ---
taskList.addEventListener('click', (e) => {
    
    const deleteBtn = e.target.closest('.delete-btn');
    if (deleteBtn) {
        const index = deleteBtn.getAttribute('data-index');
        tasks.splice(index, 1); // Array থেকে রিমুভ
        localStorage.setItem('dashboard_tasks', JSON.stringify(tasks)); // স্টোরেজ আপডেট
        renderTasks();
        return;
    }

    const taskContent = e.target.closest('.task-content');
    if (taskContent) {
        const index = taskContent.getAttribute('data-index');
        tasks[index].completed = !tasks[index].completed; // false থাকলে true হবে, true থাকলে false
        localStorage.setItem('dashboard_tasks', JSON.stringify(tasks));
        renderTasks();
    }
});

renderTasks();