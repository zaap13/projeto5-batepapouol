let messages = [];
let userName = {};
let newMsg = {};

const urlMsg = "https://mock-api.driven.com.br/api/v6/uol/messages";
const urlRoom = "https://mock-api.driven.com.br/api/v6/uol/participants";
const urlStatus = "https://mock-api.driven.com.br/api/v6/uol/status";

window.onload = () => {
  userName = {
    name: prompt("Nome: "),
  };

  enterRoom();
  setInterval(getMessages, 3000);
};

function checkConection() {
  setInterval(() => {
    const promessa = axios.post(urlStatus, userName);
    promessa.then(loadMessages);
    promessa.catch(() => {
      alert("Parece que te perdemos, por favor tente entrar novamente");
      window.location.reload();
    });
  }, 5000);
}

function enterRoom() {
  const promessa = axios.post(urlRoom, userName);
  promessa.then(checkConection);
  promessa.catch(() => {
    alert("Já existe um usuário ativo com este nome, por favor escolha outro");
    window.location.reload();
  });
}

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

function getMessages() {
  const promisse = axios.get(urlMsg);
  promisse.then((result) => {
    messages = result.data;
    loadMessages();
  });
}

function sendMessage() {
  let inputMsg = document.querySelector(".input");

  newMsg = {
    from: userName.name,
    to: "todos",
    text: inputMsg.value,
    type: "message",
  };

  const promessa = axios.post(urlMsg, newMsg);
  promessa.then(loadMessages);
  promessa.catch(() => {
    alert("Deu algo errado ;-;");
    window.location.reload();
  });

  inputMsg.value = "";
}
