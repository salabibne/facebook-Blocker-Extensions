(function() {
  if (window.location.href.includes('facebook.com')) {
    chrome.storage.sync.get(['blockAction'], function(data) {
      const action = data.blockAction || 'white'; // Default to 'white'
      switch (action) {
        case 'white':
          document.body.innerHTML = '';
          document.documentElement.style.backgroundColor = '#ffffff';
            const message = document.createElement('div');
            message.textContent = 'Facebook is blocked during this time.';
            message.style.color = '#FF0000'; // Red text
            message.style.fontFamily = 'Arial, sans-serif';
            message.style.fontSize = '24px';
            message.style.textAlign = 'center';
            message.style.marginTop = '20%';
            document.body.appendChild(message);
          break;
        case 'black':
          document.body.innerHTML = '';
          document.documentElement.style.backgroundColor = '#000000';
          break;
        case 'redirect':
          window.location.href = 'https://www.example.com'; // Redirect to example.com
          break;
      }
    });
  }
})();