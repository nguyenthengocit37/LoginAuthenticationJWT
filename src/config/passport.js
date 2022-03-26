const MY_CLIENT_ID= "528384475396-1u0e6h3pvo83h8ockuuu8961hcuvjlhc.apps.googleusercontent.com";
const MY_CLIENT_SECRET= "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";
const FACEBOOK_CLIENT_ID="1010637409590698";
const FACEBOOK_CLIENT_SECRET="90a7d26438f61f729020a34527be805c";

module.exports ={
    JWT_SECRET : process.env.JWT_ASSESS_KEY,
    auth : {
        google:{
            GOOGLE_CLIENT_ID : MY_CLIENT_ID,
            GOOGLE_CLIENT_SECRET : MY_CLIENT_SECRET,
        },
        facebook:{
            FACEBOOK_CLIENT_ID : FACEBOOK_CLIENT_ID,
            FACEBOOK_CLIENT_SECRET : FACEBOOK_CLIENT_SECRET,
        }
    }

}