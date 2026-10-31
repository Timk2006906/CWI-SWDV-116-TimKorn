function isStrongPassword(password){
const longEnough = password.length >=12;
const hasUppercase = /[A-Z]/.test(pasword);
const hasLowercase = /[a-z]/.test(password);
const hasNumber = /[0-9]/.test(password);
const hasSpecial = /[!@#$%^&*()_+{}\[\]|\/<>?]/.test(password);
const noPasswordWord= !password.toLowerCase().includes("password");
if (longEnough && hasUppercase && hasLowercase 
    && hasNumber && hasSpecial && noPasswordWord){
        console.log("Strong Password");
        return true;
    } else {
        console.log("Weak Password");
        return false;
    }
}
let password = prompt("Enter a password");
if (password !== null){
isStrongPassword(password);
}
