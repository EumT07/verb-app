import { PrismaClient } from "@prisma/client";
const fs = require("fs")

const prisma = new PrismaClient();

const main = async () => {
    try {
        let verbs_file = fs.readFileSync("./prisma/JSON/verbs.json", "utf-8");
        let regularVerbs_file = fs.readFileSync("./prisma/JSON/regularVerbs.json", "utf-8");
        let irregularVerbs_file = fs.readFileSync("./prisma/JSON/irregularVerbs.json", "utf-8");
        let ipaRegularVerbs_file = fs.readFileSync("./prisma/JSON/ipaRegularVerbs.json", "utf-8");
        let ipaIrregularVerbs_file = fs.readFileSync("./prisma/JSON/ipaIrregularVerbs.json", "utf-8");
        let meaning_file = fs.readFileSync("./prisma/JSON/meaning.json", "utf-8");

        const verbsJSON = JSON.parse(verbs_file);
        const regularVerbsJSON = JSON.parse(regularVerbs_file);
        const irregularVerbsJSON = JSON.parse(irregularVerbs_file);
        const ipaRegularVerbsJSON = JSON.parse(ipaRegularVerbs_file);
        const ipaIrregularVerbsJSON = JSON.parse(ipaIrregularVerbs_file);
        const meaningJSON = JSON.parse(meaning_file);

        // Create verbs table
        await prisma.verbs.createMany({
            data: verbsJSON
        });
        // Create meaning file
        await prisma.meaning.createMany({
            data: meaningJSON
        })
        // Create IPA Regular Verbs Table
        await prisma.iPA_regular_verbs.createMany({
            data: ipaRegularVerbsJSON
        });
        // Create IPA Irregular Verbs Table
        await prisma.iPA_irregular_verbs.createMany({
            data: ipaIrregularVerbsJSON
        });
        // Create Irregular Verbs Table
        await prisma.irregularVerbs.createMany({
            data: irregularVerbsJSON
        });
        //Create Regular Verbs Table
        await prisma.regularVerbs.createMany({
            data: regularVerbsJSON
        });
    } catch (error) {
        //Todo: change this
        console.error(error.message);
    } finally {
        await prisma.$disconnect();
    }
};

main().catch((err) => {
    console.warn('Error While generating Seed: \n', err);
});