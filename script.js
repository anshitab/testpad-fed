document.getElementById('taskForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') return;

  const taskList = document.getElementById('taskList');

  const li = document.createElement('li');
  li.className = 'task-item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const span = document.createElement('span');
  span.textContent = taskText;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✕';
  deleteBtn.className = 'delete-btn';

  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li);
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
  taskInput.value = '';
});
