document.addEventListener('DOMContentLoaded', function () {
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

        var isShiftPressed = event.shiftKey;

        if (isShiftPressed) {
            var clickedDot = getHoveredDot(mouseX, mouseY);
            if (clickedDot) {
                deleteDotFromDatabase(clickedDot);
            }
        } else {
            showForm(mouseX, mouseY);
        }
    });

    canvas.addEventListener('mousemove', function (event) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = event.clientX - rect.left;
        var mouseY = event.clientY - rect.top;

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

            sendDotDataToServer(x, y, itemName, itemDescription);
        }
    }

    function sendDotDataToServer(x, y, itemName, itemDescription) {
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
            console.log('Dot data sent successfully:', data);
            var dot = { id: data.dotId, x: x, y: y, itemName: itemName, itemDescription: itemDescription };
            dots.push(dot);
            drawDot(ctx, x, y);
        })
        .catch(error => {
            console.error('Error sending dot data to the server:', error);
        });
    }

    function drawDot(context, x, y) {
        context.fillStyle = '#E3B23C';
        context.beginPath();
        context.arc(x, y, 10, 0, 2 * Math.PI);
        context.fill();
    }

    function getHoveredDot(mouseX, mouseY) {
        for (var i = 0; i < dots.length; i++) {
            var dot = dots[i];
            var distance = Math.sqrt((mouseX - dot.x) ** 2 + (mouseY - dot.y) ** 2);
            if (distance <= 10) {
                return dot;
            }
        }
        return null;
    }

    function deleteDotFromDatabase(dot) {
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
            console.log('Dot deleted successfully:', data);
            var dotIndex = dots.findIndex(d => d.id === dot.id);
            if (dotIndex !== -1) {
                dots.splice(dotIndex, 1);
            }
            redrawCanvas();
        })
        .catch(error => {
            console.error('Error deleting dot from the server:', error);
        });
    }

    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dots.forEach(dot => {
            drawDot(ctx, dot.x, dot.y);
        });
    }

    function showDotInfo(dot) {
        var infoElement = document.getElementById('dotInfo');
        infoElement.innerHTML = `<h1>${dot.itemName}</h1> <br> ${dot.itemDescription}`;
    }

    function showUserInfo(dot) {
        var infoElement = document.getElementById('userInfo');
        infoElement.innerHTML = `<strong>${dot.itemName}</strong> <br><strong> ${dot.itemDescription}</strong>`;
    }

    function hideDotInfo() {
        var infoElement = document.getElementById('dotInfo');
        infoElement.innerHTML = '';
    }

    function hideUserInfo() {
        var infoElement = document.getElementById('userInfo');
        infoElement.innerHTML = '';
    }

    function fetchDotsFromServerAndDraw() {
        fetch('/get_dots')
        .then(response => response.json())
        .then(dotsFromServer => {
            dots = dots.concat(dotsFromServer);
            dots.forEach(dot => {
                drawDot(ctx, dot.x, dot.y);
            });
        })
        .catch(error => {
            console.error('Error fetching dots from the server:', error);
        });
    }

    fetchDotsFromServerAndDraw();
});
