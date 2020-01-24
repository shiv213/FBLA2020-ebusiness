// window.addEventListener('DOMContentLoaded', (event) => {

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOEn76gMklx2Q4EVkoHdwmop-UPM3iV6s",
    authDomain: "fbla-ebusiness2020.firebaseapp.com",
    databaseURL: "https://fbla-ebusiness2020.firebaseio.com",
    projectId: "fbla-ebusiness2020",
    storageBucket: "fbla-ebusiness2020.appspot.com",
    messagingSenderId: "988148508318",
    appId: "1:988148508318:web:bd4d6b38493fe5869cfd8f",
    measurementId: "G-Z0X8756YEH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
window.database = firebase.database();

// $(document).ready(function() { /* code here */ });
window.addEventListener('DOMContentLoaded', (event) => {
    let name, email, photoUrl, uid, emailVerified;
    firebase.auth().onAuthStateChanged(function (user) {
        window.user = user;
        if (user) {
            user.providerData.forEach(function (profile) {
                console.log("Sign-in provider: " + profile.providerId);
                console.log("Provider-specific UID: " + profile.uid);
                console.log("Name: " + profile.displayName);
                console.log("Email: " + profile.email);
                console.log("Photo URL: " + profile.photoURL);
                window.name = profile.displayName;
                window.email = profile.email;
                window.photoUrl = profile.photoURL;
                if (profile.photoURL != null) {
                    document.getElementById("profileImg").src = profile.photoURL;
                    document.getElementById("profileImg").height = document.querySelector(".fa-user").offsetHeight * 1.75;
                    document.getElementById("profileImg").alt = profile.displayName;
                    document.querySelector(".fa-user").hidden = true;
                }
                window.emailVerified = profile.email;
                window.uid = user.uid;
                database.ref('users/').child(user.uid).update({
                    username: user.displayName,
                    email: user.email,
                    profile_picture: window.photoUrl
                });
            });
            document.getElementById("logoutNav").hidden = false;
            database.ref('users/' + window.user.uid).child('cart').once("value", function (data) {
                if (!(data.val() == null || (window.one === 0 && window.two === 0 && window.three === 0))) {
                    let childObject = data.val();
                    Object.keys(childObject).forEach(e => {
                        window[e + '_count'] = childObject[e].quantity;
                        // console.log(`item : ${e}`);
                        // console.log(`value = ${childObject[e].quantity}`);
                    });
                } else {
                    if (window.location.href.includes("cart.html")) {
                        document.getElementById("emptyCart").hidden = false;
                        // document.getElementById("rightColumn").hidden = true;
                    }
                }
                window.one = window['1_count'] || 0;
                window.two = window['2_count'] || 0;
                window.three = window['3_count'] || 0;

            });
        } else {
        }
    });
});

function addItem(x, y) {
    if (user) {
        switch (x) {
            case 1:
                window.one++;
                database.ref('users/' + user.uid + '/cart').child(x).update({
                    quantity: window.one,
                    price: 39.99
                });
                break;
            case 2:
                window.two++;
                database.ref('users/' + user.uid + '/cart').child(x).update({
                    quantity: window.two,
                    price: 59.99
                });
                break;
            case 3:
                window.three++;
                database.ref('users/' + user.uid + '/cart').child(x).update({
                    quantity: window.three,
                    price: 74.99
                });
        }
        if (y) {
            window.location.href = "cart.html";
        }
    } else {
        window.location.href = "account.html?checkout=true";
    }
}

function removeItem(x, y) {
    if (user) {
        switch (x) {
            case 1:
                window.one--;
                database.ref('users/' + user.uid + '/cart').child(x).update({
                    quantity: window.one,
                    price: 39.99
                });
                break;
            case 2:
                window.two--;
                database.ref('users/' + user.uid + '/cart').child(x).update({
                    quantity: window.two,
                    price: 59.99
                });
                break;
            case 3:
                window.three--;
                database.ref('users/' + user.uid + '/cart').child(x).update({
                    quantity: window.three,
                    price: 74.99
                });
        }
        if (y) {
            window.location.href = "cart.html";
        }
    } else {
        window.location.href = "account.html?checkout=true";
    }
}

function getCart() {
    $("#items").empty();
    if (window.one > 0) {
        $("#items").append(`<p><b>Basic Style</b></p><p>Get a world class custom haircut and styling in the comforts of your home from one of our trained hair aficionados. The basic package also comes with email support and a 24 hour cancellation policy.</p><p style="text-align: right;">Quantity: <a href="#" onclick="(function(){
                        removeItem(1, false);
                        getCart();
                        return false;
                    })();return false;"><i class="fas fa-minus-square"></i></a> ${window.one} <a href="#" onclick="(function(){
                        addItem(1, false);
                        getCart();
                        return false;
                    })();return false;"><i class="fas fa-plus-square"></i></a> <br/>$${window.one * 39.99}</p><hr>`);
    }
    if (window.two > 0) {
        $("#items").append(`<p><b>Style and Maintain</b><p>The same world class experience offered in the basic service with additional benefits such as coloring and phone support.</p><p style="text-align: right;">Quantity: <a href="#" onclick="(function(){
                        removeItem(2, false);
                        getCart();
                        return false;
                    })();return false;"><i class="fas fa-minus-square"></i></a> ${window.two} <a href="#" onclick="(function(){
                        addItem(2, false);
                        getCart();
                        return false;
                    })();return false;"><i class="fas fa-plus-square"></i></a> <br/>$${window.two * 59.99}</p><hr>`);

    }
    if (window.three > 0) {
        $("#items").append(`<p><b></a> Premium Style</b><p>Get the world class experience not just for you but for your whole crew. Whether a wedding, a birthday, or some other occasion let our excellent hair professionals make your special day even better. Comes with the same benefits as the premium package and an additional benefit of 3 hour cancellation. </p><p style="text-align: right;">Quantity: <a href="#" onclick="(function(){
                        removeItem(3, false);
                        getCart();
                        return false;
                    })();return false;"><i class="fas fa-minus-square"></i></a> ${window.three} <a href="#" onclick="(function(){
                        addItem(3, false);
                        getCart();
                        return false;
                    })();return false;"><i class="fas fa-plus-square"></i></a> <br/>$${window.three * 74.99}</p><hr>`);

    }
    if (window.one === 0 && window.two === 0 && window.three === 0) {
        document.getElementById("emptyCart").hidden = false;
        document.getElementById("rightColumn").hidden = true;
    } else {
        document.getElementById("rightColumn").hidden = false;
        $("#subtotal").empty();
        let subtotal = window.one * 39.99 + window.two * 59.99 + window.three * 74.99;
        let tax = subtotal * .04;
        $("#subtotal").append(`<div>Subtotal: <p style="display:inline; float: right;">$${(subtotal).toFixed(2)}</p></div><br/><div>Tax: <p style="display:inline; float: right;">$${(tax).toFixed(2)}</p></div><br/><div>Service Fee: <p style="display:inline; float: right;">$19.00</p></div><hr><div>Total: <p style="display:inline; float: right;">$${(subtotal + tax + 19).toFixed(2)}</p></div>`)
        window.total = 100 * (subtotal * 1.04 + 19);
    }
    // document.querySelector("[name=amount]").value = window.total.toString();
}

function logOut() {
    event.preventDefault();
    document.getElementById("profileImg").src = "";
    document.querySelector(".fa-user").hidden = false;
    firebase.auth().signOut().catch(function (err) {
        console.log(err);
    });
    window.location.href = "index.html";
    document.getElementById("logoutNav").hidden = true;
}
