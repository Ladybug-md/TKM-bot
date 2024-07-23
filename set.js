const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUdXMTAvbFRZRmV3TmF1MlFvek94dUhST1g3SURXYThlRXQ5Nk00NGttbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSkh1SUVxVDVDZy9ZMnlEVkpzVzVBeCtYZS83UDR2OXVFTTAzMUk2REUzWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzRlJLcy8wYkRBdmdEVWlzMEM2akZFM3Z0cERSVEZzUGNTRWZWbDNwdUdFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkY29tSzFmZEhDWVQ0b21BMFJYUGhWR2ZTcks3bUdIU3hnMUxuL1BPZUc0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndMSDZ5UTFMM3hsV0dMZU8ra3FrSXhEaTM1UzhyRG9sbWlzK0pvZGI4Mm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkYweFY5T3c1dzU2Zk5FMFNUdjdnb0xyWVdvR0x4dGxSVU9ka1lWVi8zeVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUMyc2w3bWxBdk5EcjY5d0ZObm8yNFgzWFNKZzB2ZGpJL2VucncrOFYyYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1JVb1Zmb0svMlJrclUxVG5scXR1U2RoQ3RLWG9WZ2M2WHlLYnM2SWJnVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjB1Vk1naDU0ZDZJYTRXOU93RlVOZU8veTRYZytPei9sVWdtUmpnbVJjR3JZUzJHVTRlVllzTE9zYjRDRXBXb2NRZU00MzJBM05uaWNDUWp5eG9TQWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc4LCJhZHZTZWNyZXRLZXkiOiJoMkhSQ2hCWHpkRmlHdGI4L25SQ21zTGFJcEVweUdJemFqejRlelllaUxZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJBcnFlWXhIbFFOV2xzd1BBaGZucld3IiwicGhvbmVJZCI6ImE4MmI5MjZlLTkyNWQtNDM2Zi1iZmYyLWU3MGRkNmYwODEyNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtT3Y3TFcxNXFOWHBITm9xUzQzemxSUE1WOUk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHNleVpaTUtzRVZxYXZrcFV5L2JOTVNIL1VBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkdUR1lMTVdXIiwibWUiOnsiaWQiOiI5MjMyODQ2NDUxNjk6MUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUHJEeFBnR0VOR0gvN1FHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiT3NKcHM4MEdZZnBRMy9CTGtWUEg5akU3a3hoVktrK20yYTNsRHVLbVJpaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiL2w2bEhZSFF0Vjcwcnpxd1RjakRoT0JXVkcxa3h6R2RTY1d5NjZMZHpzVHRSbXBjWW1OV2kwZmpoaWpGd1VnRzdrSmM0aENXd1YyWnVLRGRWckJEQWc9PSIsImRldmljZVNpZ25hdHVyZSI6IldDV1EzU2ZNMldIeXQ3Yk5EVHhCZnp2T3pocy9GcmtOdkJrMXdWY05VMjNUdTJoWmt6YXFWQ3lzdjg4SlU5bGkxMEp3QUs1dWRXQU04M2dmdWxET2pRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMjg0NjQ1MTY5OjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVHJDYWJQTkJtSDZVTi93UzVGVHgvWXhPNU1ZVlNwUHB0bXQ1UTdpcGtZcCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTc0NjQwNH0===',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
