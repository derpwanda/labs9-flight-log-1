import * as admin from 'firebase-admin';
admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "lab9-flightlogs",
        "private_key_id": process.env.PRIVATE_KEY_ID,
        "private_key": process.env.PRIVATE_KEY,
        "client_email": "firebase-adminsdk-eyma0@lab9-flightlogs.iam.gserviceaccount.com",
        "client_id": "108912208589238471922",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-eyma0%40lab9-flightlogs.iam.gserviceaccount.com"    
    })
})
const admin= admin;
export default admin;