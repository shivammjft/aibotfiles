let chatbotKey;
let minimized = false;
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://aibotfiles.vercel.app/style.css';

  document.head.appendChild(link);

  let scriptContent = document.getElementById('ai-jellyfishbot');
  const apiKeyFromScriptTagId = scriptContent.dataset.apiKey;
  chatbotKey = scriptContent.dataset.botId;
  const CompanyName = scriptContent.dataset.companyName || '"Company Name"';
  const CompanyBotName = scriptContent.dataset.botName || '"Bot Name"';

  const container = document.createElement('div');
  container.className = 'chatbot-container';

  const botContainer = document.createElement('div');
  botContainer.className = 'chatbot-bot-container';
  botContainer.style.display = 'none';

  const botIntroPage = document.createElement('chatbotIntroPage');
  botIntroPage.className = 'chatbot-intro-page';
  botIntroPage.style.display = 'none';

  const header = document.createElement('chatbotHeader');
  const titleBar = document.createElement('div');
  titleBar.className = 'chatbot-title-bar';
  const logoImg = document.createElement('img');
  logoImg.classList.add('chatbotImg');
  logoImg.src = 'https://aibotfiles.vercel.app/bot.png';
  logoImg.className = 'chatbot-logo';
  const titleContainer = document.createElement('div');
  titleContainer.classList.add('chatbot-company-name');
  const companyName = document.createElement('chatbotH1');
  companyName.textContent = CompanyName;
  const chatWithContainer = document.createElement('chatbotH3');
  chatWithContainer.textContent = 'Chat with';
  titleBar.appendChild(logoImg);
  titleContainer.appendChild(chatWithContainer);
  titleContainer.appendChild(companyName);
  titleBar.appendChild(titleContainer);

  const actionDiv = document.createElement('div');
  actionDiv.className = 'chatbot-action';
  const upArrowBtn = document.createElement('chatbotButton');
  upArrowBtn.id = 'chatbot-up-arrow';
  upArrowBtn.title = 'Go to top';
  const upArrowImg = document.createElement('img');
  upArrowImg.classList.add('chatbotImg');
  upArrowImg.src = 'https://aibotfiles.vercel.app/uparrow.png';
  upArrowBtn.appendChild(upArrowImg);
  const minimizeBtn = document.createElement('chatbotButton');
  minimizeBtn.id = 'chatbot-minimize';
  minimizeBtn.title = 'Minimize';
  const minimizeImg = document.createElement('img');
  minimizeImg.classList.add('chatbotImg');
  minimizeImg.src = 'https://aibotfiles.vercel.app/minus.png';
  minimizeBtn.appendChild(minimizeImg);
  const clearBtn = document.createElement('chatbotButton');
  clearBtn.id = 'chatbot-clear';
  clearBtn.title = 'Clear chat';
  const clearImg = document.createElement('img');
  clearImg.classList.add('chatbotImg');
  clearImg.src = 'https://aibotfiles.vercel.app/delete.png';
  clearBtn.appendChild(clearImg);
  actionDiv.appendChild(minimizeBtn);
  actionDiv.appendChild(upArrowBtn);
  actionDiv.appendChild(clearBtn);

  const actionDropdownDiv = document.createElement('div');
  actionDropdownDiv.classList = 'chatbot-action-dropdown';
  const actionDropdownImg = document.createElement('img');
  actionDropdownImg.src = 'https://aibotfiles.vercel.app/expand-arrow.svg';
  actionDropdownDiv.appendChild(actionDropdownImg);
  header.appendChild(titleBar);
  header.appendChild(actionDiv);
  header.appendChild(actionDropdownDiv);
  botContainer.appendChild(header);

  const actionDropdownComponent = document.createElement(
    'actionDropdownComponent'
  );
  actionDropdownComponent.appendChild(minimizeBtn.cloneNode(true));
  actionDropdownComponent.appendChild(upArrowBtn.cloneNode(true));
  actionDropdownComponent.appendChild(clearBtn.cloneNode(true));
  actionDropdownDiv.appendChild(actionDropdownComponent);
  actionDropdownComponent.style.display = 'none';

  const section = document.createElement('chatbotSection');
  const initialGreetings = document.createElement('div');
  initialGreetings.className = 'chatbot-initial-greetings';
  const greetingImg = document.createElement('img');
  greetingImg.classList.add('chatbotImg');
  greetingImg.src = 'https://aibotfiles.vercel.app/bot.png';
  const initialMessage = document.createElement('span');
  initialMessage.className = 'chatbot-initial-message';
  initialMessage.textContent = `Welcome! I'm ${CompanyBotName}, How can I assist you today ?`;
  initialGreetings.appendChild(greetingImg);
  initialGreetings.appendChild(initialMessage);
  const staticQuestions = document.createElement('div');
  staticQuestions.className = 'chatbot-static-questions';
  section.appendChild(initialGreetings);
  section.appendChild(staticQuestions);
  botContainer.appendChild(section);

  const hr = document.createElement('hr');
  const footer = document.createElement('footer');
  const form = document.createElement('form');
  form.id = 'chatbot-query-form';
  form.autocomplete = 'off';
  const inputText = document.createElement('input');
  inputText.type = 'text';
  inputText.placeholder = 'Enter your message.....';
  inputText.id = 'chatbot-input-query';
  const apiKey = document.createElement('input');
  apiKey.type = 'hidden';
  apiKey.id = 'chatbot-api-key';
  apiKey.value = apiKeyFromScriptTagId;
  const sendBtn = document.createElement('button');
  sendBtn.classList.add('chatbot-send-button');
  sendBtn.title = 'Send message';
  const sendImg = document.createElement('img');
  sendImg.classList.add('chatbotImg');
  sendImg.src = 'https://aibotfiles.vercel.app/Vector.svg';
  sendBtn.appendChild(sendImg);
  sendBtn.type = 'submit';
  form.appendChild(inputText);
  form.appendChild(apiKey);
  form.appendChild(sendBtn);
  const poweredBy = document.createElement('div');
  poweredBy.innerHTML = '<span>&copy;</span> Powered by Jellyfish Technologies';
  footer.appendChild(form);
  footer.appendChild(hr.cloneNode());
  footer.appendChild(poweredBy);
  botContainer.appendChild(hr);
  botContainer.appendChild(footer);

  const botButton = document.createElement('chatbotButton');
  botButton.className = 'chatbot-bot-button';
  botButton.title = 'Jelly';
  const botButtonImg = document.createElement('img');
  botButtonImg.src = 'https://aibotfiles.vercel.app/bot.png';
  botButton.appendChild(botButtonImg);

  container.appendChild(botIntroPage);
  container.appendChild(botContainer);
  container.appendChild(botButton);

  document.body.appendChild(container);
  initializeIntroPage(CompanyBotName);
  initializeBot();
});

function initializeIntroPage(CompanyBotName) {
  const botIntroPage = document.querySelector('.chatbot-intro-page');
  const botContainer = document.querySelector('.chatbot-bot-container');
  const botButton = document.querySelector('.chatbot-bot-button');
  const queryInput = document.querySelector('#chatbot-input-query');

  const botIntroMinimize = document.createElement('botIntroMinimize');
  const botIntroMinimizeImg = document.createElement('img');
  botIntroMinimizeImg.classList = 'chatbotImg';
  botIntroMinimizeImg.src = 'https://aibotfiles.vercel.app/cancel.png';
  botIntroMinimizeImg.addEventListener('click', () => {
    botIntroPage.style.display = 'none';
    botButton.style.display = 'flex';
    document.querySelector('html').classList.remove('no-scroll');
  });
  botIntroMinimize.appendChild(botIntroMinimizeImg);
  botIntroPage.appendChild(botIntroMinimize);

  const botMascotImg = document.createElement('img');
  botMascotImg.classList = 'chatbot-mascot-image';
  botMascotImg.src = 'https://aibotfiles.vercel.app/bot-mascot.png';
  botIntroPage.appendChild(botMascotImg);

  const botIntroH1 = document.createElement('chatbotIntroH1');
  botIntroH1.textContent = 'Hello!';
  botIntroPage.appendChild(botIntroH1);

  const botIntroH3 = document.createElement('chatbotIntroH3');
  botIntroH3.textContent = `My name is ${CompanyBotName} and I'm here to help you`;
  botIntroPage.appendChild(botIntroH3);

  const botIntroButton = document.createElement('chatbotIntroButton');
  botIntroButton.textContent = 'Ask Jelly';
  botIntroPage.appendChild(botIntroButton);

  botIntroButton.addEventListener('click', () => {
    botIntroPage.style.display = 'none';
    botContainer.style.display = 'flex';
    queryInput.focus();
  });
}

function initializeBot() {
  console.log('Initializing bot');

  const botContainer = document.querySelector('.chatbot-bot-container');
  const botButton = document.querySelector('.chatbot-bot-button');
  const initialMessage = document.querySelector('.chatbot-initial-message');
  const queryInput = document.querySelector('#chatbot-input-query');
  const apiKeyInput = document.querySelector('#chatbot-api-key');
  const staticQuestionsContainer = document.querySelector(
    '.chatbot-static-questions'
  );
  const responseSection = document.querySelector('chatbotSection');
  const sessionId = Math.ceil(Math.random() * 10000).toString();
  let response = [];
  const staticQuestions = [];
  const staticAnswers = [];
  const botAvatar = document.createElement('img');
  botAvatar.classList.add('chatbotImg');
  botAvatar.setAttribute('src', 'https://aibotfiles.vercel.app/bot.png');
  const userAvatar = document.createElement('img');
  userAvatar.classList.add('chatbotImg');
  userAvatar.setAttribute('src', 'https://aibotfiles.vercel.app/user.png');
  (function () {
    const tempChatHistory = sessionStorage.getItem('tempChatHistory');

    if (!tempChatHistory?.length) {
      sessionStorage.setItem('tempChatHistory', JSON.stringify([]));
    } else {
      const history = JSON.parse(tempChatHistory);
      history.forEach(({ id, message }) => {
        createResponseElements(message, id === 'user' ? 'query' : 'data');
      });
      response = history;
      minimized = true;
    }
  })();
  if (!queryInput) {
    console.error('Query input not found');
    return;
  }
  if (!apiKeyInput) {
    console.error('API key input not found');
    return;
  }

  const chatbotActionDropdown = document.querySelector(
    '.chatbot-action-dropdown'
  );
  chatbotActionDropdown.addEventListener('click', () => {
    const changeActionVisibility = document.querySelector(
      'actionDropdownComponent'
    );
    if (changeActionVisibility.style.display === 'none') {
      changeActionVisibility.style.display = 'flex';
      chatbotActionDropdown.firstChild.style.rotate = '180deg';
    } else {
      changeActionVisibility.style.display = 'none';
      chatbotActionDropdown.firstChild.style.rotate = '0deg';
    }
  });

  document.addEventListener('click', (e) => {
    if (!document.querySelector('.chatbot-container').contains(e.target)) {
      document.querySelector('#chatbot-minimize').click();
      document.querySelector('.chatbot-intro-page').style.display = 'none';
    }
  });

  document.querySelectorAll('#chatbot-up-arrow').forEach((upArrow) => {
    upArrow.addEventListener('click', () => {
      initialMessage.scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.querySelectorAll('#chatbot-minimize').forEach((minimizeBtn) => {
    minimizeBtn.addEventListener('click', () => {
      minimized = true;
      botContainer.style.display = 'none';
      botButton.removeAttribute('style');
      document.querySelector('html').classList.remove('no-scroll');
    });
  });

  document.querySelectorAll('#chatbot-clear').forEach((clearBtn) => {
    clearBtn.addEventListener('click', () => {
      minimized = true;
      sendEmail(response);
      clearAllMessages();
      document.querySelector('html').classList.remove('no-scroll');
    });
  });

  botButton.addEventListener('click', () => {
    botButton.style.display = 'none';
    if (minimized) {
      botContainer.style.display = 'flex';
      queryInput.focus();
      responseSection.scrollTo({
        top: responseSection.scrollHeight,
        behavior: 'smooth',
      });
    } else document.querySelector('.chatbot-intro-page').style.display = 'flex';
    document.querySelector('html').classList.add('no-scroll');
  });

  document
    .querySelector('#chatbot-query-form')
    .addEventListener('submit', sendQuery);

  showStaticQuestions();
  let scriptContent = document.getElementById('ai-jellyfishbot');
  if (
    !scriptContent.dataset.apiKey ||
    !scriptContent.dataset.botId ||
    !scriptContent.dataset.companyName ||
    !scriptContent.dataset.botName
  ) {
    createResponseElements(
      'Either api key, bot id, company name or bot name attributes are missing, please check your script tag',
      'error'
    );
    return;
  }

  function clearAllMessages() {
    while (staticQuestionsContainer.nextSibling) {
      responseSection.removeChild(staticQuestionsContainer.nextSibling);
    }
    response = [];
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
      const button = document.createElement('chatbotButton');
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
    } else if (type === 'data') {
      div.classList.add('chatbot-response-message-container');
      span.classList.add('chatbot-response-message');
      div.appendChild(botAvatar.cloneNode());
      div.appendChild(span);
      responseSection.appendChild(div);
      textTypingEffect(span, text);
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
    if (!queryInput.value.trim()) return;
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
    response.push({ id: 'user', message: query });
    response.push({ id: 'bot', message: data });
    saveChatHistory();
    createResponseElements(data, 'data');
  }

  async function sendEmail(chatHistory) {
    if (!chatHistory) return;
    const apiKey = apiKeyInput.value;
    const bearerToken = 'Bearer ' + apiKey.trim();

    try {
      const response = await fetch('https://chatbot.teamjft.com/send-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken,
        },
        body: JSON.stringify({
          chatHistory,
          chatbot_id: chatbotKey,
          session_id: sessionId,
        }),
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

  function saveChatHistory() {
    if (!response) return;
    sessionStorage.setItem('tempChatHistory', JSON.stringify(response));
  }
}
