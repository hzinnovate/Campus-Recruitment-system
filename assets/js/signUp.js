const lctn = window.location.href;
function signUp(em) {
    const fullName = document.getElementById('name').value;
    const email = em + document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const address = document.getElementById('address').value;
    const number = document.getElementById('number').value;
    if (em === "cm") {
        var imgUrl = '../assets/images/dummy_Company.png';
        var marksheetImage = null;
    }
    else if (em === "st") {
        var nic = document.getElementById('nic').value;
        var dob = document.getElementById('dob').value;
        var imgUrl = '../assets/images/dummy_Student.png';
        var subject = document.getElementById('subject').value;
        var obtainMarks = document.getElementById('obtainMarks').value;
        var grade = document.getElementById('grade').value;
        var marksheetImage = document.getElementById('marksheetImage').files[0];
    }
    var form = formValidate(fullName, email, password, address, number, nic, dob, subject, obtainMarks, grade, marksheetImage)
    if (form) {
        document.getElementById('loader').style.display = "block";
        document.getElementById('disp').style.display = "none";
        if (em === "cm") {
            var usrObj = {
                fullName,
                email,
                password,
                address,
                number,
                imgUrl,
            }
        }
        else if (em === "st") {
            var usrObj = {
                fullName,
                email,
                password,
                address,
                number,
                nic,
                dob,
                imgUrl,
                subject,
                obtainMarks,
                grade,
            }
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((success) => {
                let usrUid = success.user.uid;
                usrObj.usrUid = usrUid;
                usrObj.email = usrObj.email.slice(2);
                if (em === "cm") {
                    var rf = `company/profiles/${usrUid}`
                    firebase.database().ref(rf).set(usrObj)
                        .then(() => {
                            swal({
                                title: `Account Created`,
                                text: "Click button to go Login page",
                                icon: "success",
                                button: "continue",
                                closeOnClickOutside: false,
                                closeOnEsc: false,
                            }).then(() => {
                                window.location = "./logIn.html"
                            })
                        })
                }
                else if (em === "st") {
                    var rf = `student/profiles/${usrUid}`
                    firebase.storage().ref(`markSheets/${usrUid}`).put(marksheetImage)
                        .then((url) => {
                            url.ref.getDownloadURL()
                                .then((urlRef) => {
                                    usrObj.marksheet = urlRef
                                    firebase.database().ref(rf).set(usrObj)
                                        .then(() => {
                                            swal({
                                                title: `Account Created`,
                                                text: "Click button to go Login page",
                                                icon: "success",
                                                button: "continue",
                                                closeOnClickOutside: false,
                                                closeOnEsc: false,
                                            }).then(() => {
                                                window.location = "./logIn.html"
                                            })
                                        })
                                })
                        })
                }
            })
            .catch((e) => {
                swal({
                    title: `Error`,
                    text: e.message,
                    icon: "error",
                    button: "Ok",
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                }).then(() => {
                    document.getElementById('loader').style.display = "none";
                    document.getElementById('disp').style.display = "block";
                })
            })
    }
}

function formValidate(fullName, email, password, address, number, nic, dob, subject, obtainMarks, grade, marksheetImage) {
    let nameLbl = document.getElementById('nameLbl');
    let emailLbl = document.getElementById('emailLbl');
    let passwordLbl = document.getElementById('passwordLbl');
    let addressLbl = document.getElementById('addressLbl');
    let nicLbl = document.getElementById('nicLbl');
    let numberLbl = document.getElementById('numberLbl');
    let dobLbl = document.getElementById('dobLbl');
    let subjectLbl = document.getElementById('subjectLbl');
    let obtainMarksLbl = document.getElementById('obtainMarksLbl');
    let gradeLbl = document.getElementById('gradeLbl');
    let marksheetImageLbl = document.getElementById('marksheetImageLbl');
    var a, b, c, d, e, f, g;
    if (fullName === "") {
        nameLbl.style.display = "block";
        a = 0;
    } else if (!fullName.replace(/\s/g, '').length) {
        nameLbl.style.display = "block";
        nameLbl.innerHTML = 'Pleas Enter some text';
        a = 0;
    } else {
        a = 1;
    }
    if (email === "") {
        emailLbl.style.display = "block";
        b = 0;
    } else if (!email.replace(/\s/g, '').length) {
        emailLbl.style.display = "block";
        emailLbl.innerHTML = 'Pleas Enter some text';
        b = 0;
    } else {
        b = 1;
    }
    if (password === "") {
        passwordLbl.style.display = "block";
        c = 0;
    } else if (!password.replace(/\s/g, '').length) {
        passwordLbl.style.display = "block";
        passwordLbl.innerHTML = 'Pleas Enter some text';
        c = 0;
    } else if (password.length < 7) {
        passwordLbl.innerHTML = "Pasword length atleast 8"
        passwordLbl.style.display = "block"
        c = 0;
    } else {
        passwordLbl.style.display = "none";
        c = 1;
    }
    if (address === "") {
        addressLbl.style.display = "block";
        d = 0;
    } else if (!address.replace(/\s/g, '').length) {
        addressLbl.style.display = "block";
        addressLbl.innerHTML = 'Pleas Enter some text';
        d = 0;
    } else {
        d = 1;
    }
    if (number === "") {
        numberLbl.style.display = "block";
        e = 0;
    } else if (number.length !== 11) {
        numberLbl.innerHTML = "Enter Number in 11 digits formate";
        numberLbl.style.display = "block";
        e = 0;
    } else {
        e = 1;
    }
    if (dob === undefined) {
        f = 1;
    }
    else if (dob === "") {
        dobLbl.style.display = "block";
        f = 0;
    } else {
        f = 1;
    }
    if (nic === undefined) {
        g = 1;
    }
    else if (nic === "") {
        nicLbl.style.display = "block";
        g = 0;
    } else if (nic.length !== 13) {
        nicLbl.innerHTML = "Pleas Enter complete number with OUt space & -";
        nicLbl.style.display = "block";
        g = 0;
    } else {
        g = 1;
    }
    if (subject === undefined) {
        h = 1;
    }
    else if (subject === "") {
        subjectLbl.style.display = "block";
        h = 0;
    } else {
        h = 1;
    }
    if (obtainMarks === undefined) {
        i = 1;
    }
    else if (obtainMarks === "") {
        obtainMarksLbl.style.display = "block";
        i = 0;
    } else {
        i = 1;
    }
    if (grade === undefined) {
        j = 1;
    }
    else if (grade === "") {
        gradeLbl.style.display = "block";
        j = 0;
    } else {
        j = 1;
    }
    if (marksheetImage === null) {
        k = 1;
    }
    else if (marksheetImage === undefined) {
        marksheetImageLbl.style.display = "block";
        k = 0;
    } else {
        k = 1;
    }
    var tst = a + b + c + d + e + f + g + h + i + j + k;
    if (tst === 11) {
        var flag = true;
    } else {
        var flag = false;
    }
    return (flag);
}

function hide(b) {
    let src = document.getElementById(b);
    src.innerHTML = "* Required";
    src.style.display = "none";
}