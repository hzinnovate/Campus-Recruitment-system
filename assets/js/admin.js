var lcsg = window.location.href;
function loader(afterLoad) {
    if (afterLoad === "afterLoad") {
        document.getElementById('loader').style.display = "none";
        document.getElementById('disp').style.display = "block";
    } else if (afterLoad !== "afterLoad") {
        document.getElementById('disp').style.display = "none";
        document.getElementById('loader').style.display = "block";
    }
}

if (lcsg.search('admin/student.html') !== -1) {
    let studPro = document.getElementById('studPro');
    window.addEventListener('load', () => {
        loader()
        firebase.database().ref('student/profiles').once('value', (e) => {
            let dta = e.val();
            for (var key in dta) {
                let studentDataForCompany = `
            <div class="scrollDiv"  key="st" style="margin: 10px;display: inline-block; padding: 10px; background-color: rgba(111, 190, 240, 0.863);text-align: center; border-radius: 15px; box-shadow: 0px 0px 1px 1px grey;">
            <img src="${dta[key].imgUrl}" style="height: 125px; width: 125px;">
            <h4>${dta[key].fullName}</h4>
            <div>${dta[key].email}</div>
            <div>${dta[key].number}</div>
            <div>${dta[key].subject}</div>
            <div>${dta[key].grade}</div>
            <a href="${dta[key].marksheet}" target="_blank" >Marksheet Image</a>
            <br>
            <button key="${key}" onClick="del(this)" class="btn btn-danger">Delet Profile</button>
            </div>`
                studPro.innerHTML += studentDataForCompany;
            }
        }).then(() => {
            loader('afterLoad')
        })
    })
}
else if (lcsg.search('admin/companies.html') !== -1) {
    window.addEventListener('load', () => {
        loader()
        let comPro = document.getElementById('comPro');
        firebase.database().ref('company/profiles').once('value', (p) => {
            let companiesProData = p.val()
            for (var key in companiesProData) {
                let companyProPosts = `
                <div class="scrollDiv"  key="cm" style="margin: 10px;display: inline-block; padding: 10px; background-color: rgba(111, 190, 240, 0.863);text-align: center; border-radius: 15px; box-shadow: 0px 0px 1px 1px grey;">
                <img src="${companiesProData[key].imgUrl}" style="height: 125px; width: 125px;">
                <h4>${companiesProData[key].fullName}</h4>
                <div>${companiesProData[key].email}</div>
                <div>${companiesProData[key].number}</div>
                <div>${companiesProData[key].address}</div>
                <button key="${key}" onClick="vec(this)" class="btn btn-info">Show Vecancies</button>
                <br>
                <br>
                <button key="${key}" onClick="del(this)" class="btn btn-danger">Delet Profile</button>
                </div>
                `
                comPro.innerHTML += companyProPosts;
            }
        }).then(() => {
            loader('afterLoad')
        })
    })
}

function vec(ths) {
    loader()
    let key = ths.getAttribute('key')
    document.getElementById('comPro').style.display = "none";
    let vac = document.getElementById('vac');
    vac.style.display = "block"
    firebase.database().ref(`company/profiles/${key}`).once('value', (c) => {
    }).then((c) => {
        let profile = c.val()
        firebase.database().ref(`company/vecancy/${key}`).once('value', (v) => {
            let vecanc = v.val()
            for (var key2 in vecanc) {
                let companyvPost = `
                <div class="scrollDiv"  key="${profile.usrUid}" style="margin: 10px;display: inline-block; padding: 10px; background-color: rgba(111, 190, 240, 0.863);text-align: center; border-radius: 15px; box-shadow: 0px 0px 1px 1px grey;">
                <img src="${profile.imgUrl}" style="height: 125px; width: 125px;">
                <h4>${profile.fullName}</h4>
                <div>Designation : ${vecanc[key2].designation}</div>
                <div>${vecanc[key2].jobType}</div>
                <div>${vecanc[key2].sallryPakkage}</div>
                <div>Description : ${vecanc[key2].JobDescription}</div>
                <div>${profile.email}</div>
                <div>${profile.number}</div>
                <div>${profile.address}</div>
                <button key="${key2}" onClick="del(this)" class="btn btn-danger">Delet Vecancy</button>

                </div>
                `
                vac.innerHTML += companyvPost
            }
        }).then(() => {
            loader('afterLoad')
        })

    })
}


function del(ths) {
    loader()
    let key = ths.getAttribute('key')
    let pnkey = ths.parentNode.getAttribute('key')
    if (pnkey === "cm") {
        firebase.database().ref(`company/profiles/${key}`).remove(() => {
            firebase.database().ref(`company/vecancy/${key}`).remove()
            var delUsr = {
                key: key,
            }
            firebase.database().ref(`deletedUsers/${key}`).set(delUsr).then(() => {
                firebase.storage().ref(`profileImage/cm/`).child(key).delete().then(() => {
                    location.reload()
                }).catch((error) => {
                    if (error.message.search('does not exist') !== -1) {
                        console.clear()
                        location.reload();
                    }
                })
            })
        })
    }
    else if (pnkey === "st") {
        firebase.database().ref(`student/profiles/${key}`).remove(() => {
            var delUsr = {
                key: key,
            }
            firebase.database().ref(`deletedUsers/${key}`).set(delUsr).then(() => {

                firebase.storage().ref(`markSheets/`).child(key).delete().then(() => {
                    firebase.storage().ref(`profileImage/st/`).child(key).delete().then(() => {
                        location.reload();
                    }).catch((error) => {
                        if (error.message.search('does not exist') !== -1) {
                            console.clear()
                            location.reload();
                        }
                    })
                })
            })
        })

    }
    else if (ths.innerHTML === "Delet Vecancy") {
        firebase.database().ref(`company/vecancy/${pnkey}/${key}`).remove().then(() => {
            window.location.reload()
        })
    }

}