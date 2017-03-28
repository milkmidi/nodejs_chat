console.log('login.js');
window.onSignIn = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    const email = profile.getEmail();
    const id_token = googleUser.getAuthResponse().id_token;
    console.log(email);
    axios.post('/api/token/', { id_token, email })
        .then((response) => {
            const rs = response.data;
            console.log(rs);
            if (rs.error) {
                alert(rs.error);
                // $('#myModal .modal-body p').html(rs.error);
                // $('#myModal').modal();
                // if (rs.code === 1000) { $('.g-signin2').remove(); }
                // alert( rs.error );
            } else if (rs.status === 'ok') {
                location.replace(redirect_url || '/');
            }
            console.log(rs, rs.status);
        })
        .catch((error) => {
            console.error(error);
        });
};
window.google_api_onload = () => {
    console.log('google_api_onload');
};
