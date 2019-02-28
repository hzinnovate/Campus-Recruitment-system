let locat = window.location.href;
let usr = window.localStorage.getItem('userAuth');
let usrDta = JSON.parse(usr);

if (locat.search('student/main.html') !== -1) {
    var pImg = document.getElementById('pImg');
    pImg.src = usrDta.profile.imgUrl
    var name1 = document.getElementById('name');
    name1.innerHTML = " ";
    name1.innerHTML = usrDta.profile.fullName
    var subject = document.getElementById('subject');
    subject.innerHTML = " ";
    subject.innerHTML = usrDta.profile.subject;
    var marks = document.getElementById('marks');
    marks.innerHTML = " ";
    marks.innerHTML = usrDta.profile.obtainMarks;
    var grade = document.getElementById('grade');
    grade.innerHTML = " ";
    grade.innerHTML = usrDta.profile.grade;
    var email = document.getElementById('email');
    email.innerHTML = " ";
    email.innerHTML = usrDta.profile.email;
    var nic = document.getElementById('nic');
    nic.innerHTML = " ";
    nic.innerHTML = usrDta.profile.nic;
    var num = document.getElementById('num');
    num.innerHTML = " ";
    num.innerHTML = usrDta.profile.number;
    var dob = document.getElementById('dob');
    dob.innerHTML = " ";
    dob.innerHTML = usrDta.profile.dob;
    var city = document.getElementById('city');
    city.innerHTML = " ";
    city.innerHTML = usrDta.profile.address;
}
else if (locat.search('company/main.html') !== -1) {
    var pImg = document.getElementById('pImg');
    pImg.src = usrDta.profile.imgUrl
    var name2 = document.getElementById('name');
    name2.innerHTML = " ";
    name2.innerHTML = usrDta.profile.fullName
    var email = document.getElementById('email');
    email.innerHTML = " ";
    email.innerHTML = usrDta.profile.email;
    var num = document.getElementById('num');
    num.innerHTML = " ";
    num.innerHTML = usrDta.profile.number;
    var address = document.getElementById('adress');
    address.innerHTML = " ";
    address.innerHTML = usrDta.profile.address;
}