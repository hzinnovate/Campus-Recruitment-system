window.addEventListener('load', () => {
    let lStr = window.localStorage.getItem('userAuth');
    if (lStr === 'null') {
        swal({
            title: "Error",
            text: "Please Login First",
            icon: "Error",
            button: "OK",
            closeOnClickOutside: false,
            closeOnEsc: false,
        }).then(() => {
            window.location = "./logIn.html"
        })
    }
})

const lc = window.location.href;
let str = window.localStorage.getItem('userAuth')
let prsn = JSON.parse(str).person;
if (lc.search('admin/main.html') !== -1) {
    if (prsn !== "admin") {
        window.location = `../${prsn}/main.html`
    }
}
else if (lc.search('company/main.html') !== -1) {
    if (prsn !== "company") {
        window.location = `../${prsn}/main.html`
    }
}
else if (lc.search('student/main.html') !== -1) {
    if (prsn !== "student") {
        window.location = `../${prsn}/main.html`
    }
}

