var dt = window.localStorage.getItem('userAuth');
var dta = JSON.parse(dt);
var ltn = window.location.href;
function createVecancy() {
    document.getElementById('loader').style.display = "block"
    document.getElementById('disp').style.display = "none"
    let designation = document.getElementById('designation').value;
    let JobDescription = document.getElementById('JobDescription').value;
    let jobType = document.getElementById('jobType').value;
    let sallryPakkage = document.getElementById('sallryPakkage').value;

    let vecancy = {
        designation,
        JobDescription,
        jobType,
        sallryPakkage,
    }
    firebase.database().ref(`${dta.person}/vecancy/${dta.uid}/`).push(vecancy).then((succes) => {
        window.location = "./main.html"
    }).catch(() => {
        document.getElementById('disp').style.display = "block"
        document.getElementById('loader').style.display = "none"
    })

}
var vacShow = document.getElementById('ourVecancy');
if (ltn.search('company/main.html') !== -1) {
    window.addEventListener('load', () => {
        firebase.database().ref(`${dta.person}/vecancy/${dta.uid}/`).once('value', (e) => {
            let vcnc = e.val()
            for (var key in vcnc) {
                let vPost = `
                <div class="scrollDiv" style="margin: 10px;display: inline-block; padding: 10px; background-color: rgba(111, 190, 240, 0.863);text-align: center; border-radius: 15px; box-shadow: 0px 0px 1px 1px grey;">
                <img src="${dta.profile.imgUrl}" style="height: 125px; width: 125px;">
                <h4>${dta.profile.fullName}</h4>
                <div>Designation : ${vcnc[key].designation}</div>
                <div>${vcnc[key].jobType}</div>
                <div>${vcnc[key].sallryPakkage}</div>
                <div>Description : ${vcnc[key].JobDescription}</div>
                <div>${dta.profile.email}</div>
                <div>${dta.profile.number}</div>
                <div>${dta.profile.address}</div>
                <button key="${key}" onClick="deltVenancy(this)" class="btn btn-danger">Dellet</button>
                </div>
                `
                vacShow.innerHTML += vPost;
            }
        })
    })
}

function deltVenancy(ths) {
    document.getElementById('loader').style.display = "block"
    document.getElementById('disp').style.display = "none"
    let key = ths.getAttribute('key');
    var ui = window.localStorage.getItem('userAuth');
    var uid = JSON.parse(ui).profile.usrUid;
    firebase.database().ref(`company/vecancy/${uid}/${key}`).remove().then(() => {
        window.location = "./main.html"
    })
}