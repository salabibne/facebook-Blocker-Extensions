document.addEventListener('DOMContentLoaded', function() {
  // Add event listener for the save button
  document.getElementById('saveButton').addEventListener('click', function() {
    const blockHour = parseInt(document.getElementById('blockHour').value);
    const blockMinute = parseInt(document.getElementById('blockMinute').value);
    
    if (blockHour >= 0 && blockHour <= 23 && blockMinute >= 0 && blockMinute <= 59) {
      chrome.storage.sync.set({
        blockHour: blockHour,
        blockMinute: blockMinute
      }, function() {
        alert('Settings saved!');
      });
    } else {
      alert('Please enter valid time values (Hour: 0-23, Minute: 0-59)');
    }
  });

  // Load saved settings
  chrome.storage.sync.get(['blockHour', 'blockMinute'], function(data) {
    document.getElementById('blockHour').value = data.blockHour || 20;
    document.getElementById('blockMinute').value = data.blockMinute || 0;
  });
});