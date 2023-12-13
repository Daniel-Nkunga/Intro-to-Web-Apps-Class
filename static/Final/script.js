document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById('clickCanvas');
    var ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Repopulate the screen with dots from the database when the page reloads
    fetchDotsFromServerAndDraw();

    canvas.addEventListener('click', function (event) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = event.clientX - rect.left;
        var mouseY = event.clientY - rect.top;

        drawDot(ctx, mouseX, mouseY);

        // Send data to the server to add the dot to the "dots" collection
        sendDotDataToServer(mouseX, mouseY);
    });

    function drawDot(context, x, y) {
        // Set dot color
        context.fillStyle = 'red';

        // Draw a filled circle
        context.beginPath();
        context.arc(x, y, 5, 0, 2 * Math.PI);
        context.fill();
    }

    function sendDotDataToServer(x, y) {
        // Update the endpoint to match your Flask app's new route
        fetch('/add_dot?x=' + x + '&y=' + y, {
            method: 'GET',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the response from the server if needed
            console.log('Dot data sent successfully:', data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error sending dot data to the server:', error);
        });
    }

    function fetchDotsFromServerAndDraw() {
        // Fetch existing dots from the server
        fetch('/get_dots')
        .then(response => response.json())
        .then(dots => {
            // Draw each dot on the canvas
            dots.forEach(dot => {
                drawDot(ctx, dot.x, dot.y);
            });
        })
        .catch(error => {
            // Handle errors
            console.error('Error fetching dots from the server:', error);
        });
    }
});
