const bcrypt = require('bcrypt');

const password = 'myPlainPassword'; // ඔයාගේ test password
const saltRounds = 10; // security level

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
    } else {
        console.log('Hashed password:', hash);
    }
});
