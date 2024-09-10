document.getElementById('generateButton').addEventListener('click', function() {
  // Coleta os valores dos campos do formulário
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone1 = document.getElementById('phone1').value;
  var phone2 = document.getElementById('phone2').value;
  var operationCode = document.getElementById('operationCode').value;
  var operationCodeComplement = document.getElementById('operationCodeComplement').value;
  var productionGroup = document.getElementById('productionGroup').value;
  var paymentMethod = document.getElementById('paymentMethod').value;
  var installments = document.getElementById('installments').value;
  var contractType = document.getElementById('contractType').value;
  var insuranceType = document.getElementById('insuranceType').value;

  // Formata o texto a ser copiado
  var textToCopy = `SEGURADO: ${name}
E-MAIL PARA CONTATO: ${email}
TELEFONE 1: ${phone1}
TELEFONE 2: ${phone2}
CÓDIGO DE OPERAÇÃO (%): ${operationCode} ${operationCodeComplement}
ANALISTA: ${productionGroup}
FORMA DE PAGAMENTO: ${paymentMethod}
PARCELAS: ${installments}
TIPO DE SEGURO: ${contractType}
TIPO DE CONTRATAÇÃO: ${insuranceType}`;

  // Cria um elemento temporário para copiar o texto
  var tempElement = document.createElement('textarea');
  tempElement.value = textToCopy;
  document.body.appendChild(tempElement);
  tempElement.select();
  document.execCommand('copy');
  document.body.removeChild(tempElement);

  // Opcional: Alerta ao usuário que o texto foi copiado
  alert('Texto copiado para a área de transferência!');
});
