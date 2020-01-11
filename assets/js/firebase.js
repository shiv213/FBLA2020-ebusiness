// Your web app's Firebase configuration
var firebaseConfig = {
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
var name, email, photoUrl, uid, emailVerified;
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
            database.ref('users/').child(uid).update({
                username: name,
                email: email,
                profile_picture: photoUrl
            });
            // else {
            //     database.ref('users/' + uid).set({
            //         username: name,
            //         email: email,
            //         profile_picture: photoUrl
            //     });
            // }
        });
        document.getElementById("logoutNav").hidden = false;
    } else {
    }
});

function logOut() {
    event.preventDefault();
    document.getElementById("profileImg").src = "";
    document.querySelector(".fa-user").hidden = false;
    firebase.auth().signOut().catch(function (err) {// Handle errors
    });
    window.location = "index.html";
    document.getElementById("logoutNav").hidden = true;
}
