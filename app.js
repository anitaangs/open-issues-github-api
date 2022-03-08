// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {
    
    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;          

    // Run GitHub API function, passing in the GitHub username
    requestUserRepos(gitHubUsername);

})


function requestUserRepos(username){
    
    // Create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    
    // GitHub endpoint, dynamically passing in specified username
    const url = `https://api.github.com/users/${username}/repos`;

    
   
    // Open a new connection, using a GET request via URL endpoint
    // Providing 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open('GET', url, true);
    
    // When request is received
    // Process it here
    xhr.onload = function () {
    
        // Parse API data into JSON
        const data = JSON.parse(this.response);
        jsonString = JSON.stringify(data); 

        // Loop over each object in data array
        for (let i in data) {

            // Get the ul with id of of userRepos
            let ul = document.getElementById('userRepos');
    
            // Create variable that will create li's to be added to ul
            let li = document.createElement('li');
            
            // Add Bootstrap list item class to each li
            li.classList.add('list-group-item')
        
            // Create the html markup for each li
            li.innerHTML = (`
            <p style="color:#2a9d8f; border: 2px solid #e9c46a; border-radius: 8px; padding: 10px"><strong>Open Issues:</strong> <a href="${data[i].owner.issue_comment_url}"> ${data[i].open_issues} </a></p>
            <p style="color:#2a9d8f; border: 2px solid #e9c46a; border-radius: 8px; padding: 10px"><strong>Repository:</strong> ${data[i].name}</p>
            <p style="color:#2a9d8f; border: 2px solid #e9c46a; border-radius: 8px; padding: 10px"><strong>User:</strong> ${data[i].owner.login} </p>
            <p style="color:#2a9d8f; border: 2px solid #e9c46a; border-radius: 8px; padding: 10px"><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
            <p style="color:#2a9d8f"><strong>Avatar: <strong> <img src=" ${data[i].owner.avatar_url}" alt=""></p>
            `);
            
            // Append each li to the ul
            ul.appendChild(li);
        
        }

    }
    
    // Send the request to the server
    xhr.send();
    
}