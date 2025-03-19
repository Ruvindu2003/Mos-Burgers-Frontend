function login() {

    const name = document.getElementById('username').value;
    console.log(name);
    
    const password = document.getElementById('password').value;

    const url = `http://localhost:8080/api/users/login?name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.text()) 
    .then(data => {
        
        if (data === "Login successful!") {
       
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'You have successfully logged in.',
            }).then(() => {
               
                window.location.href = '/index.html'; 
            });
        } else {
            
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid credentials. Please try again.',
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Please try again later.',
        });
    });
}