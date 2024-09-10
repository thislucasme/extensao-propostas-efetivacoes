var value = undefined
document.addEventListener('DOMContentLoaded', function() {

  const input = document.getElementById('premio');

  input.addEventListener('input', function(event) {
      value = event.target.value;

      // Remove caracteres não numéricos
      value = value.replace(/[^\d]/g, '');

      // Adiciona o separador de milhar
      value = value.replace(/(\d)(\d{2})$/, '$1,$2');
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

      // Adiciona o prefixo da moeda
      value = `R$ ${value}`;

      // Atualiza o valor do campo de entrada
      event.target.value = value;
  });

  // Verifica se o usuário está logado
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  
  if (isLoggedIn) {
    // Usuário já está logado, mostra o formulário
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('logoutButton').style.display = 'block'; // Mostra o botão de logout
  } else {
    // Usuário não está logado, mostra o formulário de login
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'none'; // Esconde o botão de logout
  }

  document.getElementById('registrarEfetivacao').addEventListener('click', function() {
    document.getElementById('efetivacao').style.display = 'block';
    document.getElementById('criarPropostaDiv').style.display = 'none';
    document.getElementById('registrarEfetivacao').style.color = '#28a745';
    document.getElementById('registrarProposta').style.color = "gray";
  });

  document.getElementById('registrarProposta').addEventListener('click', function() {
    document.getElementById('efetivacao').style.display = 'none';
    document.getElementById('criarPropostaDiv').style.display = 'block';
    document.getElementById('registrarProposta').style.color = '#28a745';
    document.getElementById('registrarEfetivacao').style.color = "gray";
  });

  document.getElementById('loginButton').addEventListener('click', function() {
    var usuario = document.getElementById('loginUser').value;
    var senha = document.getElementById('loginPassword').value;
  
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuario, senha })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Resposta do servidor:', data);
      
      if (data.id && data.message === "Login bem-sucedido") {
        // Login bem-sucedido
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('analystId', data.id); // Salva o ID do analista
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('formContainer').style.display = 'block';
        document.getElementById('logoutButton').style.display = 'block'; // Mostra o botão de logout
      } else {
        // Se o ID não estiver presente ou a mensagem for diferente, mostra mensagem de erro
        alert('Credenciais inválidas.');
      }
    })
    .catch(error => {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique o console para mais detalhes.');
    });
  });

  document.getElementById('logoutButton').addEventListener('click', function() {
    // Remove os dados de login do localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('analystId');

    // Atualiza a interface do usuário
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'none'; // Esconde o botão de logout
  });

  document.getElementById("generateButton").addEventListener("click", function() {
    var name = document.getElementById('name').value.toUpperCase();
    var email = document.getElementById('email').value;
    var phone1 = document.getElementById('phone1').value.toUpperCase();
    var phone2 = document.getElementById('phone2').value.toUpperCase();
    var operationCode = document.getElementById('operationCode').value.toUpperCase();
    var operationCodeComplement = document.getElementById('operationCodeComplement').value.toUpperCase();
    var productionGroup = document.getElementById('productionGroup').value.toUpperCase();
    var paymentMethod = document.getElementById('paymentMethod').value.toUpperCase();
    var installments = document.getElementById('installments').value.toUpperCase();
    var contractType = document.getElementById('contractType').value.toUpperCase();
    var insuranceType = document.getElementById('insuranceType').value.toUpperCase();
  
    const analystId = localStorage.getItem('analystId'); // Obtém o ID do analista logado
  
    let textToCopy = '';
    if (name) textToCopy += `SEGURADO: ${name}\n`;
    if (email) textToCopy += `E-MAIL PARA CONTATO: ${email}\n`;
    if (phone1) textToCopy += `TELEFONE 1: ${phone1}\n`;
    if (phone2) textToCopy += `TELEFONE 2: ${phone2}\n`;
    if (operationCode || operationCodeComplement) textToCopy += `CÓDIGO DE OPERAÇÃO: 0022${operationCode}TF ${operationCodeComplement}\n`;
    if (productionGroup) textToCopy += `ANALISTA: ${productionGroup}\n`;
    if (paymentMethod || installments) textToCopy += `FORMA DE PAGAMENTO: ${paymentMethod} ${installments}X\n`;
    if (contractType) textToCopy += `TIPO DE SEGURO: ${contractType}\n`;
    if (insuranceType) textToCopy += `TIPO DE CONTRATAÇÃO: ${insuranceType}\n`;
  
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Texto copiado para a área de transferência!");
  
      fetch('http://localhost:3000/api/propostas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone1,
          phone2,
          operationCode,
          operationCodeComplement,
          productionGroup,
          paymentMethod,
          installments,
          contractType,
          insuranceType,
          analystId // Envia o ID do analista junto com a cotação
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Cotação salva com ID:', data.id);
        alert(`Cotação salva com ID: ${data.id}`);
      })
      .catch(error => {
        console.error('Erro ao salvar a cotação:', error);
        alert('Erro ao salvar a cotação. Verifique o console para mais detalhes.');
      });
    }).catch(err => {
      console.error("Erro ao copiar o texto: ", err);
    });
  });




  document.getElementById("enviar_whatsapp").addEventListener("click", function() {
    var valorPremio = document.getElementById('premio').value.toUpperCase();
    //var operationCodeComplement = document.getElementById('operationCodeComplement').value.toUpperCase();
    var loja = document.getElementById('loja').value.toUpperCase();


    const analystId = localStorage.getItem('analystId'); // Obtém o ID do analista logado
    const formattedDate = formatDateYYYYMMDD();
    const formattedDateDDMMYYYY = formatDateDDMMYYYY();

    const mensagem = document.getElementById('premio').value;
    const premioDouble = parseCurrencyToNumber(mensagem)

    // Enviar a mensagem para o content.js
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: sendMessage,
            args: [mensagem, loja, formattedDateDDMMYYYY, premioDouble]
        });
    });



    fetch('http://localhost:3000/api/propostas_efetivadas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loja,
        valorPremio: premioDouble,
        data: formattedDate,
        idDoAnalista: analystId // Envia o ID do analista junto com a cotação
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Efetivação salva com ID:', data.id);
      alert(`Cotação salva com ID: ${data.id}`);
    })
    .catch(error => {
      console.error('Erro ao salvar a Efetivação:', error);
      alert('Erro ao salvar a Efetivação. Verifique o console para mais detalhes.');
    });
  });
});


function formatDateYYYYMMDD(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona 1 porque os meses são baseados em zero
  const day = String(date.getDate()).padStart(2, '0'); // Adiciona 0 à esquerda se o dia for menor que 10

  return `${year}/${month}/${day}`;
}

function formatDateDDMMYYYY(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona 1 porque os meses são baseados em zero
  const day = String(date.getDate()).padStart(2, '0'); // Adiciona 0 à esquerda se o dia for menor que 10

  return `${day}/${month}/${year}`;
}


function parseCurrencyToNumber(currencyString) {
  if (!currencyString) return 0;

  // Remove o prefixo 'R$ ' e os separadores de milhares, substituindo a vírgula decimal por ponto
  let numericString = currencyString.replace('R$ ', '').replace(/\./g, '').replace(',', '.');

  // Converte para número
  return parseFloat(numericString);
}


function sendMessage(premio, loja, data, premiodouble){
  const message =  `
✅ Valor do Prêmio: ${premio}`
  const mainEl = document.querySelector('#main')
  const textareaEl = mainEl.querySelector('div[contenteditable="true"]')

  if(!textareaEl) {
    alert('There is no opened conversation')
  }

  textareaEl.focus()
  document.execCommand('insertText', false, message)
  textareaEl.dispatchEvent(new Event('change', { bubbles: true }))

  setTimeout(() => {
    (mainEl.querySelector('[data-testid="send"]') || mainEl.querySelector('[data-icon="send"]')).click()
  }, 100)
}

