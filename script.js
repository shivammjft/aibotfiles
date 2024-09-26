let chatbotKey;
let chatHistory = [];
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  // Create a new <link> element to load  the css
  var link = document.createElement('link');
  // Set the attributes for the <link> element
  link.rel = 'stylesheet';
  link.href = 'https://aibotfiles.vercel.app/style.css';

  // Append the <link> element to the <head>
  document.head.appendChild(link);

  // Extracting information for initialization
  let ap = document.getElementById('ai-jellyfishbot');
  const apiDataForBot = ap.innerText.split(',');
  const apiKeyFromScriptTagId = apiDataForBot[0];
  chatbotKey = apiDataForBot[1];
  const CompanyName = apiDataForBot[2];
  const CompanyBotName = apiDataForBot[3];

  // Create the container div
  const container = document.createElement('div');
  container.className = 'chatbot-container';

  // Create the bot-container div and its content
  const botContainer = document.createElement('div');
  botContainer.className = 'chatbot-bot-container';
  botContainer.style.display = 'none';

  // Create the header
  const header = document.createElement('header');
  const titleBar = document.createElement('div');
  titleBar.className = 'chatbot-title-bar';
  const logoImg = document.createElement('img');
  logoImg.src = 'https://aibotfiles.vercel.app/bot.png';
  logoImg.className = 'chatbot-logo';
  const companyName = document.createElement('h1');
  companyName.className = 'chatbot-company-name';
  companyName.textContent = CompanyName;
  titleBar.appendChild(logoImg);
  titleBar.appendChild(companyName);

  // Create action buttons
  const actionDiv = document.createElement('div');
  actionDiv.className = 'chatbot-action';
  const upArrowBtn = document.createElement('button');
  upArrowBtn.id = 'up-arrow';
  upArrowBtn.title = 'Go to top';
  const upArrowImg = document.createElement('img');
  upArrowImg.src = 'https://aibotfiles.vercel.app/uparrow.png';
  upArrowBtn.appendChild(upArrowImg);
  const minimizeBtn = document.createElement('button');
  minimizeBtn.id = 'minimize';
  minimizeBtn.title = 'Minimize';
  const minimizeImg = document.createElement('img');
  minimizeImg.src = 'https://aibotfiles.vercel.app/minus.png';
  minimizeBtn.appendChild(minimizeImg);
  const clearBtn = document.createElement('button');
  clearBtn.id = 'clear';
  clearBtn.title = 'Clear chat';
  const clearImg = document.createElement('img');
  clearImg.src = 'https://aibotfiles.vercel.app/delete.png';
  clearBtn.appendChild(clearImg);
  actionDiv.appendChild(upArrowBtn);
  actionDiv.appendChild(minimizeBtn);
  actionDiv.appendChild(clearBtn);

  // Append header and action buttons to the bot-container
  header.appendChild(titleBar);
  header.appendChild(actionDiv);
  botContainer.appendChild(header);

  // Create the section with initial greetings and static questions
  const section = document.createElement('section');
  const initialGreetings = document.createElement('div');
  initialGreetings.className = 'chatbot-initial-greetings';
  const greetingImg = document.createElement('img');
  greetingImg.src = 'https://aibotfiles.vercel.app/bot.png';
  const initialMessage = document.createElement('span');
  initialMessage.className = 'chatbot-initial-message';
  initialMessage.textContent = `Welcome! I'm ${CompanyBotName}, How can I assist you today?`;
  initialGreetings.appendChild(greetingImg);
  initialGreetings.appendChild(initialMessage);
  const staticQuestions = document.createElement('div');
  staticQuestions.className = 'chatbot-static-questions';
  section.appendChild(initialGreetings);
  section.appendChild(staticQuestions);
  botContainer.appendChild(section);

  // Add horizontal rule and footer
  const hr = document.createElement('hr');
  const footer = document.createElement('footer');
  const form = document.createElement('form');
  form.id = 'query-form';
  form.autocomplete = 'off';
  const inputText = document.createElement('input');
  inputText.type = 'text';
  inputText.placeholder = 'Type your message here..';
  inputText.id = 'query';
  const apiKey = document.createElement('input');
  apiKey.type = 'hidden';
  apiKey.id = 'api-key';
  apiKey.value = apiKeyFromScriptTagId;
  const sendBtn = document.createElement('button');
  sendBtn.type = 'submit';
  sendBtn.title = 'Send message';
  const sendImg = document.createElement('img');
  sendImg.src = 'https://aibotfiles.vercel.app/send-message.png';
  sendBtn.appendChild(sendImg);
  form.appendChild(inputText);
  form.appendChild(apiKey);
  form.appendChild(sendBtn);
  const poweredBy = document.createElement('div');
  poweredBy.innerHTML = '<span>&copy;</span> Powered by Jellyfish Technologies';
  footer.appendChild(form);
  footer.appendChild(poweredBy);
  botContainer.appendChild(hr);
  botContainer.appendChild(footer);

  // Create the bot-button and its content
  const botButton = document.createElement('button');
  botButton.className = 'bot-button';
  botButton.title = 'Jelly';
  const botButtonImg = document.createElement('img');
  botButtonImg.src = 'https://aibotfiles.vercel.app/bot.png';
  botButton.appendChild(botButtonImg);

  // Append everything to the container
  container.appendChild(botContainer);
  container.appendChild(botButton);

  // Append the container to the body
  document.body.appendChild(container);

  // Initialize bot
  initializeBot();
});

function initializeBot() {
  console.log('Initializing bot'); // Debugging statement

  const botContainer = document.querySelector('.chatbot-bot-container');
  const botButton = document.querySelector('.bot-button');
  const initialMessage = document.querySelector('.chatbot-initial-message');
  const queryInput = document.querySelector('#query');
  const apiKeyInput = document.querySelector('#api-key');
  const staticQuestionsContainer = document.querySelector(
    '.chatbot-static-questions'
  );
  const responseSection = document.querySelector('section');
  const sessionId = Math.ceil(Math.random() * 10000).toString();
  let response = [];
  const staticQuestions = [];
  const staticAnswers = [];
  const botAvatar = document.createElement('img');
  botAvatar.setAttribute('src', 'https://aibotfiles.vercel.app/bot.png');
  const userAvatar = document.createElement('img');
  userAvatar.setAttribute('src', 'https://aibotfiles.vercel.app/user.png');

  if (!queryInput) {
    console.error('Query input not found'); // Debugging statement
    return;
  }
  if (!apiKeyInput) {
    console.error('API key input not found'); // Debugging statement
    return;
  }

  document.addEventListener('click', (e) => {
    if (!document.querySelector('.chatbot-container').contains(e.target)) {
      document.querySelector('#minimize').click();
    }
  });

  queryInput.focus();

  document.querySelector('#up-arrow').addEventListener('click', () => {
    initialMessage.scrollIntoView({ behavior: 'smooth' });
  });

  document.querySelector('#minimize').addEventListener('click', () => {
    botContainer.style.display = 'none';
    botButton.removeAttribute('style');
  });

  window.addEventListener('beforeunload', () => {
    sendEmail(chatHistory);
  });

  document.querySelector('#clear').addEventListener('click', () => {
    sendEmail(chatHistory);
    clearAllMessages();
  });

  botButton.addEventListener('click', () => {
    botButton.style.display = 'none';
    botContainer.style.display = 'flex';
  });

  document.querySelector('#query-form').addEventListener('submit', sendQuery);

  showStaticQuestions();

  function clearAllMessages() {
    while (staticQuestionsContainer.nextSibling) {
      responseSection.removeChild(staticQuestionsContainer.nextSibling);
    }
    response = [];
    chatHistory = [];
    queryInput.focus();
  }

  function convertToAnchorTags(text) {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlPattern, function (url) {
      const cleanUrl = url.replace(/[.,;!]+$/, '');
      return `<a href="${cleanUrl}" target="_blank" class="chatbot-response-link">click here</a>`;
    });
  }

  function textTypingEffect(element, text) {
    element.innerHTML = convertToAnchorTags(text);
    responseSection.scrollTop = responseSection.scrollHeight;
    queryInput.removeAttribute('disabled');
    queryInput.focus();
    responseSection.scrollTop = responseSection.scrollHeight;
    return;
  }

  function showStaticQuestions() {
    staticQuestions.map((question, index) => {
      const button = document.createElement('button');
      button.classList.add('chatbot-static-question');
      button.textContent = question;
      button.addEventListener('click', () => showStaticAnswers(index));
      staticQuestionsContainer.appendChild(button);
    });
  }

  function showStaticAnswers(index) {
    createResponseElements(staticQuestions[index], 'query');
    createResponseElements(staticAnswers[index], 'data');
  }

  function createResponseElements(text, type, link) {
    const div = document.createElement('div');
    const span = document.createElement('span');

    if (type === 'query') {
      div.classList.add('chatbot-user-message-container');
      span.classList.add('chatbot-user-message');
      span.innerHTML = text;
      div.appendChild(span);
      div.appendChild(userAvatar.cloneNode());
      responseSection.appendChild(div);
      responseSection.scrollTop = responseSection.scrollHeight;
      chatHistory.push(text);
    } else if (type === 'data') {
      div.classList.add('chatbot-response-message-container');
      span.classList.add('chatbot-response-message');
      div.appendChild(botAvatar.cloneNode());
      div.appendChild(span);
      responseSection.appendChild(div);
      textTypingEffect(span, text);
      chatHistory.push(text);
      if (link) {
        const a = document.createElement('a');
        a.setAttribute('target', '_blank');
        a.setAttribute('href', link);
        a.textContent = 'For more info click here';
        a.classList.add('chatbot-response-link');
        a.style.display = 'none';
        responseSection.appendChild(a);
      }
    } else {
      div.classList.add('chatbot-response-message-container');
      span.classList.add('chatbot-error-message');
      div.appendChild(botAvatar.cloneNode());
      div.appendChild(span);
      responseSection.appendChild(div);
      textTypingEffect(span, text);
    }
  }

  async function sendQuery(e) {
    e.preventDefault();
    queryInput.setAttribute('disabled', true);
    const query = queryInput.value;
    queryInput.value = '';
    createResponseElements(query, 'query');
    loadingResponseAnimation();
    const apiKey = apiKeyInput.value;
    const bearerToken = 'Bearer ' + apiKey.trim();
    const res = await fetch('https://chatbot.teamjft.com/query', {
      method: 'POST',
      body: JSON.stringify({
        query,
        session_id: sessionId,
        context: response,
        chatbot_id: chatbotKey,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken,
      },
    });
    if (res.status !== 200) {
      createResponseElements(
        'Something went wrong, please try again!',
        'error'
      );
      stopLoadingResponseAnimation();
      return;
    }
    stopLoadingResponseAnimation();

    let data = await res.json();
    if (data === '') {
      createResponseElements(
        'Something went wrong, please try again!',
        'error'
      );
      return;
    }
    response.push(query);
    response.push(data);
    createResponseElements(data, 'data');
  }

  async function sendEmail(chatHistory) {
    try {
      const response = await fetch('https://chatbot.teamjft.com/send-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatHistory: chatHistory.join('\n') }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  function loadingResponseAnimation() {
    const div = document.createElement('div');
    const span = document.createElement('span');
    div.appendChild(botAvatar.cloneNode());
    div.appendChild(span.cloneNode());
    div.appendChild(span.cloneNode());
    div.appendChild(span.cloneNode());

    div.classList.add('chatbot-typing');
    responseSection.appendChild(div);
    responseSection.scrollTop = responseSection.scrollHeight;
  }

  function stopLoadingResponseAnimation() {
    responseSection.removeChild(responseSection.lastChild);
  }
}
