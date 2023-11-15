// JavaScript code for ToDoList

function add(name) {
    // Construct the URL with the provided name
    const url = '/add?item=' + encodeURIComponent(name);

    // Send a GET request to the endpoint
    fetch(url, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            // If server responds with a non-200 status, reject the promise
            return Promise.reject('Failed to add item');
        }
        update();
        return; // Assuming server responds with json
    })
    .then(data => {
        console.log('Item added successfully:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function deleteItem(id) {
    // Construct the URL with the provided id
    const url = `/delete/${id}`;

    // Send a DELETE request to the endpoint
    fetch(url, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            // If server responds with a non-200 status, reject the promise
            return Promise.reject('Failed to delete item');
        }
        update(); // Update the UI after successful deletion
        return; // Assuming server responds with json
    })
    .then(data => {
        console.log('Item deleted successfully:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function toggle(id) {
    // Construct the URL with the provided id
    const url = `/toggle/${id}`;

    // Send a GET request to the endpoint
    fetch(url, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            // If server responds with a non-200 status, reject the promise
            return Promise.reject('Failed to toggle item');
        }
        update();
        return; // Assuming server responds with json
    })
    .then(data => {
        console.log('Item toggled successfully:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function update() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', '/list', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);

            var completedList = document.getElementById('completed-list');
            var notCompletedList = document.getElementById('not-completed-list');
            completedList.innerHTML = "";
            notCompletedList.innerHTML = "";

            for (let i = 0; i < data.length; i++) {
                createListItem(data[i], completedList, notCompletedList);
            }
        }
    };
    xhr.send();
}

function createListItem(data, completedList, notCompletedList) {
    let label = document.createElement('label');
    label.textContent = data.item;

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onclick = function() {toggle(data._id);}

    let img = document.createElement('img');
    img.src = '/static/Images/Spooderman.png';
    img.alt = 'cage';
    img.style.cursor = 'pointer';
    img.onclick = function() {deleteItem(data._id);} // Attach delete function to the image

    let listItem = document.createElement('li');
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    label.appendChild(img);

    if (data.is_complete) {
        checkbox.checked = true;
        completedList.appendChild(listItem);
    } else {
        notCompletedList.appendChild(listItem);
    }
}

function process() {
    let elem = document.getElementById('task_name');
    add(elem.value);
    elem.value = "";
}

// Using XMLHttpRequest for the AJAX request
update();
