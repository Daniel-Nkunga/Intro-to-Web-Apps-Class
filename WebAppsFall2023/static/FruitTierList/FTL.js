document.getElementById('myForm').addEventListener('submit', function (event) {
    // Prevent the default form submission
    event.preventDefault();
  
    // Check if a cookie exists
    if (getCookie('formSubmitted')) {
      alert('You have already submitted the form.');
    } else {
      // Set a cookie to indicate that the form has been submitted
      setCookie('formSubmitted', 'true', 365); // Cookie will expire in 365 days
  
      // Perform the form submission action
      // You can use AJAX to send the form data to the server here
      // or any other desired action
      alert('Form submitted successfully');
    }
  });
  
  function setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  }
  
  function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  