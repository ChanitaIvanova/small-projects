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

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).send("Unauthorized: No or invalid token");
      return;
    }

    const idToken = authHeader.split("Bearer ")[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const uid = decodedToken.uid;

      const data = req.body;

      // Simple validation
      if (!data ||
        !data.title ||
        !data.date ||
        !data.location ||
        !data.maxPlayers) {
        res
          .status(400)
          .send("Missing required fields: title, date, location, maxPlayers");
        return;
      }

      const ref = db.ref("games").push();
      await ref.set({
        uid,
        title: data.title,
        date: data.date,
        location: data.location,
        maxPlayers: data.maxPlayers,
        createdAt: admin.database.ServerValue.TIMESTAMP,
      });

      res.status(200).json({ success: true, id: ref.key });
    } catch (error) {
      console.error("Error adding document:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

