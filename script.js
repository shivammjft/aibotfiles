const bot_container = document.querySelector(".bot-container");
const bot_button = document.querySelector(".bot-button");
const initialMessage = document.querySelector(".initial-message");
const queryInput = document.querySelector("#query");
const apiKeyInput = document.querySelector("#api-key"); 
const welcomeText = `Welcome! I'm Jelly, How can I assist you today?`;
const static_questions_container = document.querySelector(".static-questions");
const responseSection = document.querySelector("section");
const session_id = Math.ceil(Math.random() * 10000).toString();
let response = [];
const staticQuestions = [
  "What services does Jellyfish Technologies provide?",
  "What sectors does Jellyfish Technologies work in?",
];
const staticAnswers = [
  "Jellyfish provides a range of services including Software Development, Cloud Engineering, DevOps Services, Data Analytic, AI Development, SaaS Development and more.",
  "Jellyfish Technologies operates in various domains including Healthcare, EdTech, PropTech, InsureTech, Facility Management, Telecom and many more.",
];
const bot_avatar = document.createElement("img");
bot_avatar.setAttribute("src", "assets/logo.jpeg");
bot_avatar.classList.add("bot-avatar");
const user_avatar = document.createElement("img");
user_avatar.setAttribute("src", "assets/user.png");

function initializeBot() {
  document.addEventListener("click", (e) => {
    if (!document.querySelector(".container").contains(e.target))
      document.querySelector("#minimize").click();
  });

  queryInput.focus();
  document.querySelector("#up-arrow").addEventListener("click", () => {
    initialMessage.scrollIntoView({ behavior: "smooth" });
  });

  document.querySelector("#minimize").addEventListener("click", () => {
    bot_container.style.display = "none";
    bot_button.removeAttribute("style");
  });

  document.querySelector("#clear").addEventListener("click", () => {
    clearAllMessages();
  });

  bot_button.addEventListener("click", () => {
    bot_button.style.display = "none";
    bot_container.style.display = "flex";
  });
  document.querySelector("#query-form").addEventListener("submit", sendQuery);
  textTypingEffect(initialMessage, welcomeText);
  showStaticQuestions();
}

function clearAllMessages() {
  while (static_questions_container.nextSibling)
    responseSection.removeChild(static_questions_container.nextSibling);
  response = [];
  queryInput.focus();
}

function convertToAnchorTags(text) {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlPattern, function (url) {
    return `<a href="${url}" target="_blank" class="response-link">click here</a>`;
  });
}

function textTypingEffect(element, text) {
  element.innerHTML = convertToAnchorTags(text);
  if (text !== welcomeText)
    responseSection.scrollTop = responseSection.scrollHeight;
  queryInput.removeAttribute("disabled");
  queryInput.focus();
  responseSection.scrollTop = responseSection.scrollHeight;
  return;
}

function showStaticQuestions() {
  staticQuestions.map((question, index) => {
    const button = document.createElement("button");
    button.classList.add("static-question");
    button.textContent = question;
    button.addEventListener("click", () => showStaticAnswers(index));
    static_questions_container.appendChild(button);
  });
}

function showStaticAnswers(index) {
  createResponseElements(staticQuestions[index], "query");
  createResponseElements(staticAnswers[index], "data");
}

function createResponseElements(text, type, link) {
  const div = document.createElement("div");
  const span = document.createElement("span");

  if (type === "query") {
    div.classList.add("user-message-container");
    span.classList.add("user-message");
    span.innerHTML = text;
    div.appendChild(span);
    div.appendChild(user_avatar.cloneNode());
    responseSection.appendChild(div);
    responseSection.scrollTop = responseSection.scrollHeight;
  } else if (type === "data") {
    div.classList.add("response-message-container");
    span.classList.add("response-message");
    div.appendChild(bot_avatar.cloneNode());
    div.appendChild(span);
    responseSection.appendChild(div);
    textTypingEffect(span, text);
    if (link) {
      const a = document.createElement("a");
      a.setAttribute("target", "_blank");
      a.setAttribute("href", link);
      a.textContent = "For more info click here";
      a.classList.add("response-link");
      a.style.display = "none";
      responseSection.appendChild(a);
    }
  } else {
    div.classList.add("response-message-container");
    span.classList.add("error-message");
    div.appendChild(bot_avatar.cloneNode());
    div.appendChild(span);
    responseSection.appendChild(div);
    textTypingEffect(span, text);
  }
}

async function sendQuery(e) {
  e.preventDefault();
  queryInput.setAttribute("disabled", true);
  const query = queryInput.value;
  queryInput.value = "";
  createResponseElements(query, "query");

  loadingResponseAnimation();
  const apiKey = apiKeyInput.value;
  const res = await fetch(`http://127.0.0.1:8000/query`, {
    method: "POST",
    body: JSON.stringify({
      query,
      session_id,
      context: response,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${api}`,
    },
  });
  if (res.status !== 200) {
    createResponseElements("Something went wrong, please try again!", "error");
    stopLoadingResponseAnimation();
    return;
  }
  stopLoadingResponseAnimation();

  let data = await res.json();
  if (data === "") {
    createResponseElements("Something went wrong, please try again!", "error");
    return;
  }
  response.push(query);
  response.push(data);
  createResponseElements(data, "data");
}

function loadingResponseAnimation() {
  const div = document.createElement("div");
  const span = document.createElement("span");
  div.appendChild(bot_avatar.cloneNode());
  div.appendChild(span.cloneNode());
  div.appendChild(span.cloneNode());
  div.appendChild(span.cloneNode());

  div.classList.add("typing");
  responseSection.appendChild(div);
  responseSection.scrollTop = responseSection.scrollHeight;
}

function stopLoadingResponseAnimation() {
  responseSection.removeChild(responseSection.lastChild);
}

initializeBot();
