/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import corsFactory from "cors";
import { AuthService } from "./services/auth.service";
import { Game } from "./models/game.model";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();
const db = admin.database();

const cors = corsFactory({ origin: ["http://localhost:4200"], credentials: true });

export const createGame = onRequest(async (req, res) => {
    cors(req, res, async () => {
        if (req.method !== "POST") {
            res.status(405).send("Method Not Allowed");
            return;
        }

        const isAuthenticated = await AuthService.isRequestAuthenticated(req);
        if (!isAuthenticated) {
            res.status(401).send("Unauthorized: No or invalid token");
            return;
        }

        try {
            const uid = await AuthService.getUidFromRequest(req);

            if (!uid) {
                res.status(401).send("Unauthorized: No or invalid token");
                return;
            }
            const game = new Game(req.body);

            // Simple validation
            if (!game.isValid()) {
                res
                    .status(400)
                    .send("Missing required fields: title, date, location, maxPlayers");
                return;
            }

            const ref = db.ref("games").push();
            await ref.set({
                uid,
                title: game.title,
                date: game.date,
                location: game.location,
                maxPlayers: game.maxPlayers,
                createdAt: admin.database.ServerValue.TIMESTAMP,
            });

            res.status(200).json({ success: true, id: ref.key });
        } catch (error) {
            console.error("Error adding document:", error);
            res.status(500).send("Internal Server Error");
        }
    });
});

export const getGames = onRequest(async (req, res) => {
    cors(req, res, async () => {
        if (req.method !== "GET") {
            res.status(405).send("Method Not Allowed");
            return;
        }

        const isAuthenticated = await AuthService.isRequestAuthenticated(req);
        if (!isAuthenticated) {
            res.status(401).send("Unauthorized: No or invalid token");
            return;
        }

        try {
            const gameList: Game[] = [];
            await db.ref("games").get().then((games) => {
                games.forEach((game) => {
                    gameList.push(new Game(game.val()));
                });
            });
            res.status(200).json({ success: true, games: gameList });
        } catch (error) {
            console.error("Error retrieving games:", error);
            res.status(500).send("Internal Server Error");
        }
    });
});
