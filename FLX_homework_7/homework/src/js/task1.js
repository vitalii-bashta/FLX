let login = prompt('Enter your login', '');
let currentHours;
let password;

if (!login) {
    alert('Canceled');
} else if (login.length < 4) {
    alert("I don't know any users having name length less than 4 symbols");
} else if (login === 'Admin') {
    password = prompt('Enter your password');
    if (!password) {
        alert('Canceled');
    } else if (password === 'RootPass') {
        currentHours = new Date().getHours();
        if (currentHours < 20) {
            alert('Good day, dear Admin!');
        } else {
            alert('Good evening, dear Admin');
        }
    } else {
        alert('Wrong password');
    }
} else if (login === 'User') {
    password = prompt('Enter your password');
    if (!password) {
        alert('Canceled');
    } else if (password === 'UserPass') {
        currentHours = new Date().getHours();
        if (currentHours < 20) {
            alert('Good day, dear User!');
        } else {
            alert('Good evening, dear User!');
        }
    } else {
        alert('Wrong password');
    }
} else {
    alert('I don’t know you');
}
