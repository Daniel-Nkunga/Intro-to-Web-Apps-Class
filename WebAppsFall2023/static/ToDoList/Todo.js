function add(name) {
    const url = '/add?item=' + encodeURIComponent(name);
    fetch(url, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            return Promise.reject('Failed to add item');
        }
        update();
        return; 
    })
    .then(data => {
        console.log('Item added successfully:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function deleteItem(id) {
    const url = `/delete/${id}`;
    fetch(url, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            return Promise.reject('Failed to delete item');
        }
        update();
        return; 
    })
    .then(data => {
        console.log('Item deleted successfully:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function toggle(id) {
    const url = `/toggle/${id}`;
    fetch(url, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
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

    // Add event listener for shift-click to handle selection
    listItem.addEventListener('click', function(event) {
        handleShiftClick(event, data._id);
    });

    // Check if the task is completed or not
    if (data.is_complete) {
        checkbox.checked = true;
        completedList.appendChild(listItem);
    } else {
        // Create a sublist for non-completed tasks
        let subList = document.createElement('ul');
        let subListItem = document.createElement('li');
        subListItem.appendChild(listItem);
        subList.appendChild(subListItem);

        // Create subitems for each non-completed task
        for (let i = 0; i < data.subitems.length; i++) {
            let subItemLabel = document.createElement('label');
            subItemLabel.textContent = data.subitems[i];
            let subItemCheckbox = document.createElement('input');
            subItemCheckbox.type = 'checkbox';
            // Add any additional subitem properties as needed

            let subItemListItem = document.createElement('li');
            subItemListItem.appendChild(subItemCheckbox);
            subItemListItem.appendChild(subItemLabel);
            subList.appendChild(subItemListItem);
        }

        notCompletedList.appendChild(subList);
    }
}

let selectedItemId = null;

function handleShiftClick(event, id) {
    if (event.shiftKey) {
        selectedItemId = id;
        // Perform any visual indication or additional handling for the selected item if needed
        update();
    }
}

function addSubitem(name) {
    if (selectedItemId) {
        const url = `/addSubitem/${selectedItemId}?subitem=${encodeURIComponent(name)}`;
        fetch(url, {
            method: 'GET',
        })
        .then(response => {
            if (!response.ok) {
                return Promise.reject('Failed to add subitem');
            }
            update();
            return;
        })
        .then(data => {
            console.log('Subitem added successfully:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        console.warn('No item selected for adding subitem. Shift-click on an item to select it.');
    }
}

// Modify the process function to use addSubitem
function process() {
    let elem = document.getElementById('task_name');
    addSubitem(elem.value);
    elem.value = "";
}

function process() {
    let elem = document.getElementById('task_name');
    add(elem.value);
    elem.value = "";
}

update();
