async function register() {
    const name = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Password Mismatch',
            text: 'Passwords do not match. Please try again.',
        });
        return;
    }

    const userData = {
        name,
        email,
        phoneNumber,
        password
    };

    try {
        const response = await fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const rawResponse = await response.text();
        console.log("Raw Response:", rawResponse);

        if (response.ok) {
         
            let result;
            try {
                result = JSON.parse(rawResponse); 
            } catch (jsonError) {
                
                result = { message: rawResponse };
            }

            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: result.message || 'You will be redirected to the login page.',
                timer: 3000,
                timerProgressBar: true,
            }).then(() => {
                window.location.href = '/Login.html';
            });
        } else {
     
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: rawResponse || 'An error occurred during registration.',
            });
        }
    } catch (error) {
  
        console.error("Error:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred. Please try again.',
        });
    }
}