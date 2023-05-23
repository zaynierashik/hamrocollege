    // Back to Top

    const arrowLink = document.querySelector('.top');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 750){
            arrowLink.classList.remove('hidden');
        }else{
            arrowLink.classList.add('hidden');
        }
    });

    // Show Password

    function showPassword(){
        var x = document.getElementById("password");
        if(x.type == "password"){
            x.type = "text";
        }else{
            x.type = "password";
        }
    }
    
    function orgShowPassword(){
        var x = document.getElementById("orgPassword");
        if(x.type == "password"){
            x.type = "text";
        }else{
            x.type = "password";
        }
    }

    // Modal

    const modal = document.querySelector('#my-modal');
    const modalBtn = document.querySelector('#modal-btn');
    const closeBtn = document.querySelector('.fa-lg');

    modalBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    function openModal(){
        modal.style.display = 'block';
    }

    function closeModal(){
        modal.style.display = 'none';
    }

    // Validation

//     const form = document.getElementById('form');
//     const nameInput = document.getElementById('fullname');
//     const emailInput = document.getElementById('email');
//     const passwordInput = document.getElementById('password');
//     const nameError = document.getElementById('name-error');
//     const emailError = document.getElementById('email-error');
//     const passwordError = document.getElementById('password-error');

//     form.addEventListener('submit', function(event){
//         event.preventDefault();
//             if(validateName() && validateEmail() && validatePassword()){
//                 form.submit();
//             }
//     });

//     function validateName(){
//         const nameValue = nameInput.value.trim();
//         const nameRegex = /^[a-zA-Z]+$/;
//         if(nameValue === ''){
//             setError(nameInput, "*Name is required", 'name-error');
//             return false;   
//         }else if(!nameRegex.test(nameValue)){
//             setError(nameInput, "*Name must contain only letters", 'name-error');
//             return false;
//         }else{
//             removeError(nameInput, 'name-error');
//             return true;
//         }
//     }

//     function validateEmail(){
//         const emailValue = emailInput.value.trim();
//         const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//         if(emailValue === ''){
//             setError(emailInput, "*Email is required", 'email-error');
//             return false;
//         }else if(!emailRegex.test(emailValue)){
//             setError(emailInput, "*Invalid email format!", 'email-error');
//             return false;
//         }else{
//             removeError(emailInput, 'email-error');
//             return true;
//         }
//     }

//     function validatePassword(){
//         const passValue = passwordInput.value.trim();
//         if(passValue === ''){
//             setError(passwordInput, "*Password is required", 'password-error');
//             return false;
//         }else if(passValue.length < 8){
//             setError(passwordInput, "*Password must be atleast 8 characters", 'password-error');
//             return false;
//         }else{
//             removeError(passwordInput, 'password-error');
//             return true;
//         }
//        }

//     // Set error message
// function setError(inputElement, message, errorId) {
//     const errorElement = document.getElementById(errorId);
//     errorElement.textContent = message;
//      inputElement.classList.add('error-message');
// }

// // Remove error message
// function removeError(inputElement, errorId) {
//     const errorElement = document.getElementById(errorId);
//     errorElement.textContent = '';
//     inputElement.classList.remove('error-message');
// }

//     nameInput.addEventListener('blur', validateName);
//     emailInput.addEventListener('blur', validateEmail);
//     passwordInput.addEventListener('blur', validatePassword);

    //    Toggle Form

    function showRegisterForm(){
        $("#register").hide();
        $("#organization-register").show();
    }