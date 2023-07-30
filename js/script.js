const newNameTag = document.querySelector('#signupName'),
newEmailTag = document.querySelector('#signupEmail'),
newPasswordTag = document.querySelector('#signupPassword'),
signinEmailTag = document.querySelector('#signinEmail'),
signinPasswordTag = document.querySelector('#signinPassword'),
signupBtn = document.querySelector('#signupBtn'),
signinBtn = document.querySelector('#signinBtn'),
errorArea = document.querySelector('#errorMsg'),
msgArea = document.querySelector('#msg'),
userNameTag = document.querySelector('#userName');

let users = [];
var currentUser;

const nameRegex = /^[a-zA-Z]{3,}$/,
emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
passwordRegex = /.{6,}/;


function isEmailValid() {
    if (emailRegex.test(newEmailTag.value)) {
        return true
    } else {
        console.log('invalid Email');
        return false
    }
}

function isNameValid() {
    if (nameRegex.test(newNameTag.value)) {
        return true
    } else {
        console.log('invalid Name');
        return false
    }
}

function isPasswordValid() {
    if (passwordRegex.test(newPasswordTag.value)) {
        return true
    } else {
        console.log('invalid Password');
        return false
    }
}

function checkRepeat() {
    var repeatFlag = false;
    for (var i = 0; i < users.length; i++) {
        var userEmail = users[i].email.toLowerCase();
        if (newEmailTag.value == userEmail) {
            repeatFlag = true;
        }
    }
    return repeatFlag
}

function addUser() {
    var newUser;
    var testName = isNameValid(),
    testEmail = isEmailValid(),
    testPassword = isPasswordValid();
    if (testName == true && testEmail == true && testPassword == true) {
        var testRepeat = checkRepeat();
        if (testRepeat == false) {
            msgArea.innerHTML = '';
            newUser = {
                name: newNameTag.value,
                email: newEmailTag.value.toLowerCase(),
                password: newPasswordTag.value
            };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            currentUser = newUser;
            msgArea.innerHTML = 'SUCCESS';
            msgArea.classList.remove('text-danger');
            msgArea.classList.add('text-success');
            localStorage.setItem("currentUser", JSON.stringify(currentUser.name));
            window.open('hello.html', '_self');
        } else {
            msgArea.innerHTML = 'Repeated email';
            msgArea.classList.remove('text-success');
            msgArea.classList.add('text-danger');
        }
    } else {
        msgArea.innerHTML = 'Invalid info';
        msgArea.classList.remove('text-success');
        msgArea.classList.add('text-danger');
    }
}

function checkUser() {
    const tryUserEmail = signinEmailTag.value.toLowerCase();
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (tryUserEmail == user.email) {
            currentUser = user;
            return true
        }
    }
}

function checkPassword() {
    const tryUserPassword = signinPasswordTag.value;
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (tryUserPassword == user.password) {
            return true
        } else {
            return false
        }
    }
}

function signin() {
    if (checkUser()) {
        if (checkPassword()) {
            localStorage.setItem("currentUser", JSON.stringify(currentUser.name));
            window.open('hello.html', '_self');
        } else {
            errorArea.innerHTML = 'Invalid Password';
        }
    } else {
        errorArea.innerHTML = 'Email not registered';
    }
}


if (signinBtn != null) {
    signinBtn.addEventListener('click', signin);
    window.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            signinBtn.click();
        }
    });
}

if (signupBtn != null) {
    signupBtn.addEventListener('click', addUser);
    window.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            signupBtn.click();
        }
    });
}

if (userNameTag != null) {
    userNameTag.innerHTML = JSON.parse(localStorage.getItem('currentUser'));
}


if (localStorage.getItem('users') == null) {
    users = [];
} else {
    users = JSON.parse(localStorage.getItem('users'));
}