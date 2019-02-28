function editImg() {
    document.getElementById('disp').style.display = "none"
    document.getElementById('imgUpld').style.display = "block"
}
function cancle() {
    document.getElementById('imgUpld').style.display = "none"
    document.getElementById('disp').style.display = "block"
}
function upload(h) {
    document.getElementById('loader').style.display = "block"
    document.getElementById('imgUpld').style.display = "none"
    let imgupldLbl = document.getElementById('imgupldLbl');
    let imgfile = document.getElementById('imgfile').files[0];
    if (imgfile === undefined) {
        document.getElementById('loader').style.display = "none"
        document.getElementById('imgUpld').style.display = "block"
        imgupldLbl.innerHTML = "Pleas upload Image then click upload button to process"
        imgupldLbl.style.display = "block"
    }
    else if (imgfile !== undefined) {
        document.getElementById('loader').style.display = "block"
        document.getElementById('imgUpld').style.display = "none"
        var usr = window.localStorage.getItem('userAuth');
        var user = JSON.parse(usr);
        firebase.storage().ref(`profileImage/${h}/${user.profile.usrUid}`).put(imgfile)
            .then((url) => {
                url.ref.getDownloadURL()
                    .then((urlRef) => {
                        user.profile.imgUrl = urlRef
                        window.localStorage.setItem('userAuth', JSON.stringify(user))
                        firebase.database().ref(`${user.person}/profiles/${user.profile.usrUid}`).set(user.profile)
                            .then(() => {
                                location.reload();
                            })
                    })
            })
    }

}