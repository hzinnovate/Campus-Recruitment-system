// initialize your firebase here to check this project


function loader(afterLoad) {
    if (afterLoad === "afterLoad") {
        document.getElementById('loader').style.display = "none";
        document.getElementById('disp').style.display = "block";
    } else if (afterLoad !== "afterLoad") {
        document.getElementById('disp').style.display = "none";
        document.getElementById('loader').style.display = "block";
    }
}
const lct = window.location.href;
function logIn(person) {
    loader()
    if (person === "admin") {
        let UserName = document.getElementById('UserName').value;
        var password = document.getElementById('adminPassword').value;
        var email = UserName + "@college.org";
    }
    else if (person === "student") {
        var gt = document.getElementById('stEmail').value;
        var password = document.getElementById('stPassword').value;
        var email = "st" + gt;
    }
    else if (person === "company") {
        var gt = document.getElementById('cEmail').value;
        var password = document.getElementById('cPassword').value;
        var email = "cm" + gt;
    }
    firebase.auth().signInWithEmailAndPassword(email, password).then((e) => {
        let uid = e.user.uid;
        firebase.database().ref(`deletedUsers/${uid}`).once('value', (e) => {
            if (e.val() !== null) {
                firebase.auth().currentUser.delete().then(() => {
                    firebase.database().ref(`deletedUsers/${uid}`).remove(() => {
                        swal({
                            title: "Your User has been deleted by Admin",
                            icon: "info",
                            button: "ok",
                            closeOnClickOutside: false,
                            closeOnEsc: false,
                        }).then(() => {
                            loader('afterLoad')
                        })
                    })
                })
            }
            else if (e.val() === null) {
                firebase.database().ref(`${person}/profiles/${uid}`).once("value", (a) => {
                    let profile = a.val();
                    let obj = {
                        uid,
                        person,
                        profile,
                    }
                    window.localStorage.setItem('userAuth', JSON.stringify(obj))
                })
                    .then(() => {
                        swal({
                            title: "Successfully LogIn",
                            icon: "success",
                            button: "continue",
                            closeOnClickOutside: false,
                            closeOnEsc: false,
                        }).then(() => {
                            window.location = './main.html'
                        })
                    })
            }
        })
    })
        .catch((error) => {
            swal({
                title: "Error",
                text: error.message,
                icon: "error",
                button: "Ok",
                closeOnClickOutside: false,
                closeOnEsc: false,
            }).then(() => {
                loader('afterLoad')
            })
        })
}
function logOut(indx) {
    loader()
    firebase.auth().signOut().then(() => {
        window.localStorage.setItem('userAuth', 'null')
        swal({
            title: "LogOut Success",
            icon: "info",
            button: "OK",
            closeOnClickOutside: false,
            closeOnEsc: false,
        }).then(() => {
            if (indx) {
                window.location = "./index.html"
            } else {
                window.location = './logIn.html'
            }
        })
    })
        .catch((err) => {
            swal({
                title: "Error",
                icon: "info",
                text: err.massege,
                button: "Ok",
                closeOnClickOutside: false,
                closeOnEsc: false,
            }).then(() => {
                loader('afterLoad')
            })
        })
}


if (lct.search('logIn.html') !== -1) {
    window.addEventListener('load', () => {
        loader()
        var lStr = window.localStorage.getItem('userAuth');
        if (lStr === null || lStr === 'null' || lStr === undefined) {
            loader('afterLoad')
        }
        else {
            swal("Are you sure you want to LogOut your account?", {
                buttons: ["Yes", "No"],
            }).then((e) => {
                if (e === null) {
                    logOut()
                }
                else if (e === true) {
                    window.location = './main.html'
                }
            })
        }
    })
}

if (lct.search('index.html') !== -1) {
    window.addEventListener('load', () => {
        let index = document.getElementById('index2');
        var lcl = window.localStorage.getItem('userAuth');
        var fLcl = JSON.parse(lcl);
        if (fLcl === null || fLcl === undefined) {
        }
        else if (fLcl !== null || fLcl !== undefined) {
            document.getElementById('index').innerHTML = " ";
            var at = fLcl.person;
            index.innerHTML = " ";
            index.innerHTML = ` 
            <li class="active"><a href="./${at}/main.html">${at.charAt(0).toUpperCase() + at.slice(1)}</a></li>
            <li><a class="aCustom" onClick="logOut('ind')" style="cursor: pointer;"><span class="glyphicon glyphicon-log-out"></span> LogOut from ${at.charAt(0).toUpperCase() + at.slice(1)}</a></li>`
        }
    })
}

let studentProForCompanies = document.getElementById('studentsPro');
var stdDataArryForCompany = [];
if (lct.search("company/students.html") !== -1) {
    window.addEventListener('load', () => {
        loader()
        var ls = window.localStorage.getItem('userAuth');
        if (ls === "null" || ls === undefined) {
            swal({
                title: "Login first",
                icon: "error",
                button: "OK",
                closeOnClickOutside: false,
                closeOnEsc: false,
            }).then(() => {
                window.location = "./logIn.html"
            })
        }
        else if (ls !== "null" || ls !== undefined) {
            firebase.database().ref('student/profiles').once('value', (e) => {
                let dta = e.val();
                for (var key in dta) { stdDataArryForCompany.push(dta[key]) }
            }).then(() => {
                for (var key2 in stdDataArryForCompany) {
                    let studentDataForCompany = `
                    <div class="scrollDiv"  style="margin: 10px;display: inline-block; padding: 10px; background-color: rgba(111, 190, 240, 0.863);text-align: center; border-radius: 15px; box-shadow: 0px 0px 1px 1px grey;">
                    <img src="${stdDataArryForCompany[key2].imgUrl}" style="height: 125px; width: 125px;">
                    <h4>${stdDataArryForCompany[key2].fullName}</h4>
                    <div>${stdDataArryForCompany[key2].email}</div>
                    <div>${stdDataArryForCompany[key2].number}</div>
                    <div>${stdDataArryForCompany[key2].subject}</div>
                    <div>${stdDataArryForCompany[key2].grade}</div>
                    <a href="${stdDataArryForCompany[key2].marksheet}" target="_blank" >Marksheet Image</a>
                    </div>`
                    studentProForCompanies.innerHTML += studentDataForCompany;
                }
            }).then(() => {
                loader('afterLoad')
            })
        }
    })
}

if (lct.search('student/companies.html') !== -1) {
    window.addEventListener('load', () => {
        loader()
        let companiesPro = document.getElementById('companiesPro');
        firebase.database().ref('company/profiles').once('value', (p) => {
            let companiesProData = p.val()
            for (var key in companiesProData) {
                let companyProPosts = `
                <div class="scrollDiv"  style="margin: 10px;display: inline-block; padding: 10px; background-color: rgba(111, 190, 240, 0.863);text-align: center; border-radius: 15px; box-shadow: 0px 0px 1px 1px grey;">
                <img src="${companiesProData[key].imgUrl}" style="height: 125px; width: 125px;">
                <h4>${companiesProData[key].fullName}</h4>
                <div>${companiesProData[key].email}</div>
                <div>${companiesProData[key].number}</div>
                <div>${companiesProData[key].address}</div>
                <button key="${key}" onClick="vecancy(this)" class="btn btn-danger">Vecancies</button>
                </div>
                `
                companiesPro.innerHTML += companyProPosts;
            }
        }).then(() => {
            loader('afterLoad')
        })
    })
}
function vecancy(ths) {
    loader()
    let key = ths.getAttribute('key');
    let vecanciesPost = document.getElementById('vecancies');
    document.getElementById('companiesPro').style.display = "none"
    vecanciesPost.style.display = "block";
    firebase.database().ref(`company/profiles/${key}`).once('value', (c) => {
    }).then((c) => {
        let profile = c.val()
        firebase.database().ref(`company/vecancy/${key}`).once('value', (v) => {
            let vecanc = v.val()
            for (var key2 in vecanc) {
                let companyvPost = `
            <div class="scrollDiv"  style="margin: 10px;display: inline-block; padding: 10px; background-color: rgba(111, 190, 240, 0.863);text-align: center; border-radius: 15px; box-shadow: 0px 0px 1px 1px grey;">
            <img src="${profile.imgUrl}" style="height: 125px; width: 125px;">
            <h4>${profile.fullName}</h4>
            <div>Designation : ${vecanc[key2].designation}</div>
            <div>${vecanc[key2].jobType}</div>
            <div>${vecanc[key2].sallryPakkage}</div>
            <div>Description : ${vecanc[key2].JobDescription}</div>
            <div>${profile.email}</div>
            <div>${profile.number}</div>
            <div>${profile.address}</div>
            </div>
            `
                vecanciesPost.innerHTML += companyvPost
            }
        }).then(() => {
            loader('afterLoad')
        })
    })
}