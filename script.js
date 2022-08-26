let messages = [];
const urlMsg = "https://mock-api.driven.com.br/api/v6/uol/messages";

function loadMessages() {
  const ul = document.querySelector(".messages");
  ul.innerHTML = "";

  messages.forEach((msg) => {
    if (msg.type === "message") {
      ul.innerHTML += `<li class="message-box message"><p>
        <span class="time">(${msg.time})</span> <span class="bold">${msg.from}</span> para <span class="bold">${msg.to}:</span> ${msg.text}
        </p></li>
        `;
        
    } else if (msg.type === "status") {
      ul.innerHTML += `<li class="message-box status"><p>
        <span class="time">(${msg.time})</span> <span class="bold">${msg.from}</span>:</span> ${msg.text}
        </p></li>
        `;

    }
    
    window.scrollTo(0, document.body.scrollHeight);

  });
}

function getMessages(response) {
  const promisse = axios.get(urlMsg);
  promisse.then((result) => {
    messages = result.data;
    loadMessages();
  });
}

setInterval(getMessages, 3000);

