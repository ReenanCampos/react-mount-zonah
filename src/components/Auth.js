import axios from 'axios';

const Auth = {
    isAuthenticated: false,

    async authenticate(email, password) {
        return await axios.post(
            process.env.REACT_APP_STRAPI_API_URL_BASE + 
            process.env.REACT_APP_STRAPI_API_URL_LOGIN, {
            identifier: email,
            password: password,
        })
        .then(response => {
            this.isAuthenticated = true;
            return response;
        })
        .catch(error => {
            this.isAuthenticated = false;
            throw new Error("Login/Senha inválidos");
        });

    },

    signout() {
        this.isAuthenticated = false;
    },

    getAuth() {
        return this.isAuthenticated;
    }
};
export default Auth;