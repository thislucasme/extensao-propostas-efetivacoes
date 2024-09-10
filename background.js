let popupWindowId = null;

// Função para criar ou focar o popout
function togglePopup() {
  if (popupWindowId !== null) {
    chrome.windows.update(popupWindowId, { focused: true });
  } else {
    chrome.windows.create({
      url: 'popup.html',
      type: 'popup',
      width: 400,
      height: 600
    }, (window) => {
      popupWindowId = window.id;
    });
  }
}

// Adicionar um listener para a ação do botão
chrome.action.onClicked.addListener(togglePopup);

// Monitorar o fechamento da janela
chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === popupWindowId) {
    popupWindowId = null;
  }
});
