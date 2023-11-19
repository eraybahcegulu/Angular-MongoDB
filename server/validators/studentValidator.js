
function validateName(name) {
    return (name.length>20 || name.length<3);
}

function validateSurname(surname) {
    return (surname.length>20 || surname.length<3 );
}

function validateEmail(email) {
    return (email.length>40 || email.length<3 );
}

function validateNo(no) {
    var stringNo = no.toString();
    return (stringNo.length>15 || stringNo.length<3 );
}

function validatePassword(password) {
    return (password.length>20 || password.length<6 );
}

function validateAbsenteeism(absenteeism) {
    var stringAbsenteeism = absenteeism.toString();
    return (stringAbsenteeism.length>3);
}

module.exports = { validateEmail, validateName, validateSurname, validateNo, validatePassword, validateAbsenteeism};
