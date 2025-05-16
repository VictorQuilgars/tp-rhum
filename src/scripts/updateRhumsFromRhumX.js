const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Rhum = require("../models/rhums"); // adapte le chemin si besoin
const connectDB = require("../config/db"); // ta fonction de connexion DB

dotenv.config();

const safeExtract = async (page, selector, transform = el => el.textContent.trim()) => {
  try {
    return await page.$eval(selector, transform);
  } catch (e) {
    return null; // ou undefined si tu préfères
  }
};


const updateAllRhums = async () => {
  const errors = [];
  try {
    await connectDB();
    // Récupérer tous les rhums de la base de données
    const rhums = await Rhum.find();

    console.log(`Nombre de rhums trouvés : ${rhums.length}`);

    // Parcourir chaque rhum et appeler scrapeAndUpdateRhum
    for (const rhum of rhums) {
      if (rhum.rxid_number) {
        console.log(`Traitement du RXID : ${rhum.rxid_number}`);
        const result = await scrapeAndUpdateRhum(rhum.rxid_number);

        if (!result.success) {
          // Stocker les informations sur l'erreur
          errors.push({
            rxid: rhum.rxid_number,
            rhumId: rhum._id,
            error: result.error,
            intendedChanges: { name: "Nom récupéré depuis le scraping" }, // Exemple de changement attendu
          });
        }
      } else {
        console.log(`RXID manquant pour le rhum avec ID : ${rhum._id}`);
        errors.push({
          rhumId: rhum._id,
          error: "RXID manquant",
        });
      }
    }

    console.log("Mise à jour de tous les rhums terminée.");
  } catch (error) {
    console.error("Erreur lors de la mise à jour des rhums :", error.message);
  } finally {
    if (errors.length > 0) {
      console.log("\nRésumé des erreurs :");
      errors.forEach((err, index) => {
        console.log(
          `${index + 1}. Rhum ID: ${err.rhumId}, RXID: ${err.rxid || "N/A"}, Erreur: ${err.error}, Changements prévus: ${JSON.stringify(
            err.intendedChanges || {}
          )}`
        );
      });
    } else {
      console.log("Aucune erreur détectée.");
    }
    mongoose.connection.close();
  }
};

const scrapeAndUpdateRhum = async (rxid) => {
  try {
    const url = `https://www.rum-x.fr/rums/${rxid}`;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    const name = await safeExtract(page, "h1 > span");
    const pays = await safeExtract(page, ".rum-basic-data div:nth-child(1) a");
    const distillerie = await safeExtract(page, ".rum-basic-data div:nth-child(2) a");
    const ABV = await safeExtract(page, ".rum-basic-data div:nth-child(4) div");
    const categorie = await safeExtract(page, ".rum-basic-data div:nth-child(5) div");
    const vintage = await safeExtract(page, ".rum-basic-data div:nth-child(6) div");
    const fabriqueAvec = await safeExtract(page, ".rum-basic-data div:nth-child(7) div");
    const distillation = await safeExtract(page, ".rum-basic-data div:nth-child(8) div");
    const age = await safeExtract(page, ".rum-basic-data div:nth-child(9) div");
    const volume = await safeExtract(page, ".rum-basic-data div:nth-child(10) div");
    const type = await safeExtract(page, ".rum-basic-data div:nth-child(12) div");
    const degre = ABV ? parseFloat(ABV.match(/[\d,]+/)[0].replace(",", ".")) : null;

    const imagePath = await safeExtract(
      page,
      "#carouselExampleControls > div > div.carousel-item.active > img",
      img => img.getAttribute("src")
    );

    await browser.close();

    const rhum = await Rhum.findOne({ rxid_number: rxid });

    if (!rhum) {
      console.log(`❌ Aucun rhum trouvé avec rxid ${rxid}`);
      return;
    }

    let updated = false;

    const fields = {
      name,
      pays,
      distillerie,
      ABV,
      degre,
      categorie,
      vintage,
      fabriqueAvec,
      distillation,
      age,
      volume,
      type,
      imagePath
    };

    for (let key in fields) {
      if (fields[key] !== null && rhum[key] !== fields[key]) {
        rhum[key] = fields[key];
        updated = true;
      }
    }

    if (updated) {
      await rhum.save();
      console.log(`✅ Rhum ${rxid} mis à jour.`);
    } else {
      console.log(`🔍 Rhum ${rxid} déjà à jour.`);
    }
    return { success: true, fields };
  }
  catch (e) {
    //console.error("An error occurred:", e);
    console.log("Erreur");
    return { success: false, error: e.message };
  }
};

updateAllRhums();