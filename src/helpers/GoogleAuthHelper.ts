declare const gapi: any;

let key: string;
let cookiePolicy: string;

if (process.env.NODE_ENV === 'production') {
    key = '4993407912-dakflmq66sk3vshr6qnm3ld2cvjp6l44.apps.googleusercontent.com';
    cookiePolicy = 'https://moviediary.azurewebsites.net';
} else {
    key = '4993407912-b5urkj1fodpa8b8ftftkeclt2q4q9v9d.apps.googleusercontent.com';
    cookiePolicy = 'http://localhost:8080/;Secure;SameSite=Strict';
}

class GoogleAuthHelper {
    auth2Instance: any;

    Init(button: Element, clickHandler: Function) {
        gapi.load('auth2', async () => {
            this.auth2Instance = await gapi.auth2.init({
                client_id: key,
                cookiepolicy: cookiePolicy,
            });

            this.auth2Instance.attachClickHandler(button, {}, (googleUser: any) => clickHandler(googleUser));
        });
    }

    GoogleLogin(googleAuthCallback: Function) {
        if (!this.auth2Instance) {
            gapi.load('auth2', async () => {
                this.auth2Instance = await gapi.auth2.init({
                    client_id: key,
                    cookiepolicy: cookiePolicy,
                });

                this.auth2Instance.signIn().then((googleUser: any) => {
                    googleAuthCallback(googleUser);
                });
            });
        } else {
            this.auth2Instance.signIn().then((googleUser: any) => {
                googleAuthCallback(googleUser);
            });
        }
    }

    async GoogleLogout() {
        if (!this.auth2Instance) {
            await gapi.load('auth2', async () => {
                this.auth2Instance = await gapi.auth2.init({
                    client_id: key,
                    cookiepolicy: cookiePolicy,
                });

                this.auth2Instance.signOut();
            });
        } else {
            await this.auth2Instance.signOut();
        }
    }
}

export default GoogleAuthHelper;
