document.addEventListener('DOMContentLoaded', function() {
  // Add event listener for the settings button
  document.getElementById('settingsButton').addEventListener('click', function() {
    window.location.href = 'options.html';
  });

  // Load and display block time and status
  chrome.storage.sync.get(['blockHour', 'blockMinute'], function(data) {
    const blockHour = data.blockHour || 20;
    const blockMinute = data.blockMinute || 0;
    
    const blockTime = `${blockHour.toString().padStart(2, '0')}:${blockMinute.toString().padStart(2, '0')}`;
    document.getElementById('blockTime').textContent = blockTime;
    
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const status = (currentHour > blockHour || (currentHour === blockHour && currentMinute >= blockMinute))
      ? 'Facebook Blocked'
      : 'Facebook Accessible';
    
    document.getElementById('status').textContent = status;
  });
});