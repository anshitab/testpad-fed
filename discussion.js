const questionsList = document.getElementById("questionsList");
const rightPane = document.getElementById("rightPane");
const noQuestionsMsg = document.getElementById("noQuestionsMsg");

let questions = [];
let selectedQuestion = null;

// Handle new question submission
document.getElementById("questionForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("qTitle").value.trim();
  const question = document.getElementById("qText").value.trim();
  if (!title || !question) return;

  const newQ = { id: Date.now(), title, question, responses: [] };
  questions.push(newQ);
  renderQuestions();
  e.target.reset();
});

// Render list of questions
function renderQuestions() {
  questionsList.innerHTML = "<h2>Questions</h2>";
  if (questions.length === 0) {
    questionsList.innerHTML += "<p id='noQuestionsMsg'>No questions yet.</p>";
    return;
  }
  questions.forEach((q) => {
    const box = document.createElement("div");
    box.className = "question-box";
    box.innerHTML = `<strong>${q.title}</strong><br><small>${q.question}</small>`;
    box.onclick = () => showQuestion(q.id);
    questionsList.appendChild(box);
  });
}

// Show selected question with response form
function showQuestion(id) {
  const q = questions.find((qq) => qq.id === id);
  selectedQuestion = q;

  rightPane.innerHTML = `
    <h2>${q.title}</h2>
    <p>${q.question}</p>

    <h3>Leave a Response</h3>
    <form id="responseForm">
      <div class="form-group">
        <input type="text" id="responder" placeholder="Your Name" required>
      </div>
      <div class="form-group">
        <textarea id="comment" placeholder="Your Response" rows="3" required></textarea>
      </div>
      <button type="submit">Submit Response</button>
    </form>

    <h3>Previous Answers</h3>
    <div id="responsesList"></div>

    <button class="resolve-btn">Resolve</button>
  `;

  // Load existing responses
  renderResponses();

  // Add response handler
  document.getElementById("responseForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("responder").value.trim();
    const comment = document.getElementById("comment").value.trim();
    if (!name || !comment) return;

    q.responses.push({ id: Date.now(), name, comment });
    renderResponses();
    e.target.reset();
  });

  // Resolve button
  document.querySelector(".resolve-btn").onclick = () => {
    questions = questions.filter((qq) => qq.id !== q.id);
    selectedQuestion = null;
    renderQuestions();
    resetToAskForm();
  };
}

// Render responses
function renderResponses() {
  const container = document.getElementById("responsesList");
  container.innerHTML = "";
  if (selectedQuestion.responses.length === 0) {
    container.innerHTML = "<p>No responses yet.</p>";
    return;
  }
  selectedQuestion.responses.forEach((r) => {
    const div = document.createElement("div");
    div.className = "response";
    div.innerHTML = `<strong>${r.name}</strong><br>${r.comment}`;
    container.appendChild(div);
  });
}

// Reset right pane to ask form
function resetToAskForm() {
  rightPane.innerHTML = `
    <h2>Ask a Question</h2>
    <form id="questionForm">
      <div class="form-group">
        <input type="text" id="qTitle" placeholder="Title" required>
      </div>
      <div class="form-group">
        <textarea id="qText" placeholder="Your Question" rows="4" required></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  `;
  document.getElementById("questionForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("qTitle").value.trim();
    const question = document.getElementById("qText").value.trim();
    if (!title || !question) return;
    const newQ = { id: Date.now(), title, question, responses: [] };
    questions.push(newQ);
    renderQuestions();
    e.target.reset();
  });
}
