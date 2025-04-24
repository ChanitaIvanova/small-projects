import * as admin from "firebase-admin";
import * as https from "firebase-functions/v2/https";

export class AuthService {
    static async isRequestAuthenticated(request: https.Request): Promise<boolean> {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return Promise.resolve(false);
        }
        const idToken = this.getIdToken(authHeader);

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        if (decodedToken) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    static async getUidFromRequest(request: https.Request): Promise<string> {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return Promise.resolve("");
        }
        const idToken = this.getIdToken(authHeader);

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        if (decodedToken) {
            return Promise.resolve(decodedToken.uid);
        }
        return Promise.resolve("");
    }

    private static getIdToken(authHeader: string): string {
        return authHeader.split("Bearer ")[1];
    }
}
