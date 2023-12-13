document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById('clickCanvas');
    var ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Keep track of dots and their information
    var dots = [];

    canvas.addEventListener('click', function (event) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = event.clientX - rect.left;
        var mouseY = event.clientY - rect.top;

        // Check if the shift key is pressed
        var isShiftPressed = event.shiftKey;

        if (isShiftPressed) {
            // Delete the dot from the database
            var clickedDot = getHoveredDot(mouseX, mouseY);
            if (clickedDot) {
                deleteDotFromDatabase(clickedDot);
            }
        } else {
            // Display the form to the user
            showForm(mouseX, mouseY);
        }
    });

    canvas.addEventListener('mousemove', function (event) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = event.clientX - rect.left;
        var mouseY = event.clientY - rect.top;

        // Check if the mouse is over any existing dot
        var hoveredDot = getHoveredDot(mouseX, mouseY);
        if (hoveredDot) {
            showDotInfo(hoveredDot);
            showUserInfo(hoveredDot);
        } else {
            hideDotInfo();
            hideUserInfo();
        }
    });

    function showForm(x, y) {
        var itemName = prompt("Enter item name (required):");
        if (itemName !== null && itemName !== "") {
            var itemDescription = prompt("Enter item description (optional):");

            // Send data to the server to add the dot to the "dots" collection
            sendDotDataToServer(x, y, itemName, itemDescription);
        }
    }

    function sendDotDataToServer(x, y, itemName, itemDescription) {
        // Update the endpoint to match your Flask app's new route
        fetch('/add_dot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                x: x,
                y: y,
                itemName: itemName,
                itemDescription: itemDescription,
            }),
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
            // Draw the dot on the canvas
            var dot = { id: data.dotId, x: x, y: y, itemName: itemName, itemDescription: itemDescription };
            dots.push(dot);
            drawDot(ctx, x, y);
        })
        .catch(error => {
            // Handle errors
            console.error('Error sending dot data to the server:', error);
        });
    }

    function drawDot(context, x, y) {
        // Set dot color
        context.fillStyle = '#E3B23C';

        // Draw a filled circle
        context.beginPath();
        context.arc(x, y, 10, 0, 2 * Math.PI);
        context.fill();
    }

    function getHoveredDot(mouseX, mouseY) {
        // Check if the mouse is over any existing dot
        for (var i = 0; i < dots.length; i++) {
            var dot = dots[i];
            var distance = Math.sqrt((mouseX - dot.x) ** 2 + (mouseY - dot.y) ** 2);
            if (distance <= 5) {
                return dot;
            }
        }
        return null;
    }

    function deleteDotFromDatabase(dot) {
        // Update the endpoint to match your Flask app's new route
        fetch('/delete_dot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dotId: dot.id,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the response from the server if needed
            console.log('Dot deleted successfully:', data);
            // Remove the dot from the local array
            var dotIndex = dots.findIndex(d => d.id === dot.id);
            if (dotIndex !== -1) {
                dots.splice(dotIndex, 1);
            }
            // Redraw the canvas without the deleted dot
            redrawCanvas();
        })
        .catch(error => {
            // Handle errors
            console.error('Error deleting dot from the server:', error);
        });
    }

    function redrawCanvas() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw each dot on the canvas
        dots.forEach(dot => {
            drawDot(ctx, dot.x, dot.y);
        });
    }

    function showDotInfo(dot) {
        // Display dot information
        var infoElement = document.getElementById('dotInfo');
        infoElement.innerHTML = `<H1>${dot.itemName}</H1> <br> ${dot.itemDescription}`;
    }

    function showUserInfo(dot) {
        // Display dot information
        var infoElement = document.getElementById('userInfo');
        infoElement.innerHTML = `<strong>${dot.itemName}</strong> <br><strong> ${dot.itemDescription}</strong>`;
    }

    function hideDotInfo() {
        // Hide dot information
        var infoElement = document.getElementById('dotInfo');
        infoElement.innerHTML = '';
    }
    function hideUserInfo() {
        // Hide dot information
        var infoElement = document.getElementById('userInfo');
        infoElement.innerHTML = '';
    }

    function fetchDotsFromServerAndDraw() {
        // Fetch existing dots from the server
        fetch('/get_dots')
        .then(response => response.json())
        .then(dotsFromServer => {
            // Add dots from the server to the dots array
            dots = dots.concat(dotsFromServer);

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

    // Call the function to draw existing dots when the page loads
    fetchDotsFromServerAndDraw();
});