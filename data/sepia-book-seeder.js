var Product = require('../models/product');
var mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');
dotenv.load({
    path: '.env.hackathon'
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  logger.log('error','%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});
var books = [
    new Product({
        "name": "Big Book 75th Anniversary",
        "code": "B0",
        "title": "AA Big Book-75th Anniv. Edition",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1200,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Big Book - Hard Cover",
        "code": "B1",
        "title": "AA Big Book - Hard Cover",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 950,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Big Book - Soft Cover",
        "code": "B30",
        "title": "AA Big Book - Soft Cover",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 910,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Big Book - Mini",
        "code": "B35",
        "title": "Mini Big Book - first 164 pages",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 500,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Big Book - Large Print",
        "code": "B16",
        "title": "AA Big Book - Large Print",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1030,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Big Book - Large (1st 164)",
        "code": "B24",
        "title": "LG Print Big Book - first 164 pages",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 600,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Big Book - Braile",
        "code": "M34",
        "title": "AA Big Book - Braille",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 800,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "12&12",
        "code": "B2  ",
        "title": "12 Steps & 12 Traditions",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 890,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "12&12 - Soft Cover",
        "code": "B15",
        "title": "12 & 12 - Soft Cover Edition",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 825,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "12&12 - Mini",
        "code": "B17",
        "title": "12 & 12 - Mini Edition",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 850,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "12&12 - Gift",
        "code": "B4",
        "title": "12 & 12 - Gift Edition",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 825,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "12&12 - Large Print",
        "code": "B14",
        "title": "12 & 12 - Large Print Edition",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 825,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "12&12 - Braille",
        "code": "M35",
        "title": "12 & 12 - Braille Edition",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 740,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Came to Believe",
        "code": "B6",
        "title": "Came to Believe",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 500,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Came to Believe - Large Print",
        "code": "B26",
        "title": "Came to Believe - Large Print",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 525,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Living Sober",
        "code": "B7",
        "title": "Living Sober",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 500,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Living Sober - Large Print",
        "code": "B25",
        "title": "Living Sober - Large Print",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 525,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "As Bill Sees It - Hard Cover",
        "code": "B5",
        "title": "As Bill Sees It - Hard Cover",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 900,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "As Bill Sees It - Soft Cover",
        "code": "B18",
        "title": "As Bill Sees It - Soft Cover",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 860,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "As Bill Sees It - Large Print",
        "code": "B27",
        "title": "As Bill Sees It - Large Print",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 950,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Daily Reflections",
        "code": "B12",
        "title": "Daily Reflections",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1025,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Daily Reflections - Large Print",
        "code": "B19",
        "title": "Daily Reflections - Large Print",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1075,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Daily Reflections - Braille",
        "code": "M50",
        "title": "Daily Reflections - Braille",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 825,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "AA Comes of Age",
        "code": "B3",
        "title": "AA Comes of Age",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 950,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "AA Comes of Age - 75th Anniv. Ed.",
        "code": "B59",
        "title": "AA Comes of Age - 75th Anniv. Ed.",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 700,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Dr. Bob & The Good Old-Timers",
        "code": "B8",
        "title": "Dr. Bob & The Good Old-Timers",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1050,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Pass It On",
        "code": "B9",
        "title": "Pass It On",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1100,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Boxed Set - Dr. Bob & Pass It On",
        "code": "B10",
        "title": "Boxed Set - Dr. Bob & Pass It On",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 2150,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Boxed Set - Big Book & B20",
        "code": "B11",
        "title": "Boxed Set - Big Book & B20",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1500,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "AA in Prison/Inmate to Inmate",
        "code": "B13",
        "title": "AA in Prison/Inmate to Inmate",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 250,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Experience, Strength & Hope",
        "code": "B20",
        "title": "Experience, Strength & Hope",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 550,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "AA Service Manual",
        "code": "BM31",
        "title": "AA Service Manual",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 355,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "AA Service Manual - Large Print",
        "code": "BM33",
        "title": "AA Service Manual - Large Print",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 830,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "International AA Directory",
        "code": "MD1",
        "title": "International AA Directory",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 180,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "AA Directory Eastern (Western 3, Canada 2)",
        "code": "MD4",
        "title": "AA Directory Eastern (Western 3, Canada 2)",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 360,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Public Information Workbook",
        "code": "M217",
        "title": "Public Information Workbook",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 200,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "5-County Meeting Directory",
        "code": "ML1",
        "title": "5-County Meeting Directory",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 100,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Beginner Packet",
        "code": "BG01",
        "title": "Beginner Packet",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 200,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Green Card",
        "code": "GC1",
        "title": "Green Card",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 10,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Yellow Card",
        "code": "YC1",
        "title": "Yellow Card (Steps/Rewards)",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 10,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Daily Inventory",
        "code": "DI1",
        "title": "Daily Inventory Guide",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 10,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Daily Meditation",
        "code": "DM1",
        "title": "Daily Meditation Guide",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 10,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "12 Questions",
        "code": "TQ20",
        "title": "20 Questions",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 10,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Beginner's Guide",
        "code": "OC1",
        "title": "Guide for Beginner",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 10,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Intergroup - Carrying the Message",
        "code": "IG01",
        "title": "Intergroup - Carrying the Message",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 10,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Serenity Prayer",
        "code": "M2",
        "title": "Wallet Card (Serenity Prayer)",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 15,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Responsibility Card",
        "code": "M21",
        "title": "Responsibility Wallet Card",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 15,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Anononymity Card",
        "code": "M22",
        "title": "Anonymity Wallet Card",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 75,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Beginner's Meeting Guide",
        "code": "M1",
        "title": "Guide to Leading Beginners Mtg",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 275,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Group Handbook",
        "code": "M36",
        "title": "The Group Handbook",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1100,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Display Rack",
        "code": "M8",
        "title": "Display Rack",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 2000,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Display Rack / Extension",
        "code": "M82",
        "title": "Set of Display Rack & Extension",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 3500,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "12 Steps",
        "code": "M3",
        "title": "Twelve Steps (12\" x 17\")",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 340,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "12 Traditions",
        "code": "M4",
        "title": "Twelve Traditions (12\" x 17\")",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 340,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Serenity Prayer",
        "code": "M5",
        "title": "Serenity Prayer (12\" x 17\")",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 340,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Serenity Prayer, 12 Steps, 12 Traditions",
        "code": "M6",
        "title": "Set of 3 (12\" x 17\")",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 715,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Responsibility Card",
        "code": "M9",
        "title": "Responsibility Placard (19\"x 29\")",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 86500,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Preamble",
        "code": "M10",
        "title": "Preamble Placard (19\"x 29\")",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 86500,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "12 Steps Shade",
        "code": "M14",
        "title": "12 Steps Window Shade",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 2900,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "12 Traditions Shade",
        "code": "M18",
        "title": "12 Traditions Window Shade",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 2900,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "12&12 Shade",
        "code": "M19",
        "title": "Set/12 & 12 Window Shades",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 4800,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "12 Concepts Shade",
        "code": "M20",
        "title": "12 Concepts Window Shade",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 2900,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Bill's Last Message",
        "code": "M12",
        "title": "Bill's Last Message",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 300,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Farewell Talk",
        "code": "M16",
        "title": "Dr. Bob's Farewell Talk",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 300,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Bill and Bob - Last Message",
        "code": "M17",
        "title": "Set-Bill & Bob-Last Message/Farewell Talk",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 600,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Round AA Meeting Sign",
        "code": "M30",
        "title": "Round AA Meeting Sign (8 1/2 \" dia)",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 700,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Table-top Display 12&12",
        "code": "M33",
        "title": "12 & 12 Tabletop Display",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 2000,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Unity Card",
        "code": "M56",
        "title": "Unity Placard (19x 29)",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 86500,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Anononymity Card",
        "code": "M61",
        "title": "Anonymity Display Card",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 2000,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Meeting in a Pocket",
        "code": "MP1",
        "title": "A.A. Meeting in a Pocket **",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 100,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Assortment 1",
        "code": "TP1",
        "title": "$35.00 Literature Assortment",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 3500,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "Assortment 2",
        "code": "TP2",
        "title": "$20.00 Literature Assortment",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 2000,
        "Product_Group": "LITERATURE",
        "category": "Books"
    }),
    new Product({
        "name": "This is AA Pamphlet",
        "code": "P1",
        "title": "This is AA",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 15,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "FAQ Pamphlet",
        "code": "P2",
        "title": "Frequently Asked Questions",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 25,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Is AA for you?",
        "code": "P3",
        "title": "Is AA For You?",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 10,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Young People and AA",
        "code": "P4",
        "title": "Young People and AA",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 30,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA For The Woman",
        "code": "P5",
        "title": "AA For The Woman",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 30,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "3 Talks to the Medical Society",
        "code": "P6",
        "title": "3 Talks to the Medical Society",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 45,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "The 12 Concepts Illustrated",
        "code": "P8",
        "title": "The 12 Concepts Illustrated",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 45,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Memo to Inmate Alcoholic",
        "code": "P9",
        "title": "Memo to Inmate Alcoholic",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 20,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "How it Works",
        "code": "P10",
        "title": "How it Works",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 15,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA Medications & Other Drugs",
        "code": "P11",
        "title": "AA Medications & Other Drugs",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 25,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Jack Alexander Article",
        "code": "P12",
        "title": "Jack Alexander Article",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 25,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Do You Think You're Different?",
        "code": "P13",
        "title": "Do You Think You're Different?",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 30,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Q & A on Sponsorship",
        "code": "P15",
        "title": "Q & A on Sponsorship",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 15,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "The AA Group",
        "code": "P16",
        "title": "The AA Group",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 30,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA Tradition-How It Developed",
        "code": "P17",
        "title": "AA Tradition-How It Developed",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 30,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Inside AA",
        "code": "P18",
        "title": "Inside AA",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 8,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "G.S.R. may be most important job",
        "code": "P19",
        "title": "G.S.R. may be most important job",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 8,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA for Native North American",
        "code": "P21",
        "title": "AA for Native North American",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 40,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA for the Older Alcoholic",
        "code": "P22",
        "title": "AA for the Older Alcoholic",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 40,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA Resource Health Care Prof",
        "code": "P23",
        "title": "AA Resource Health Care Prof",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 25,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "A Newcomer Asks",
        "code": "P24",
        "title": "A Newcomer Asks",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 10,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Clergy Asks About AA",
        "code": "P25",
        "title": "Clergy Asks About AA",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 25,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA in Correctional Facilities",
        "code": "P26",
        "title": "AA in Correctional Facilities",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 30,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA in Treatment Facilities",
        "code": "P27",
        "title": "AA in Treatment Facilities",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 30,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Twelve Traditions Flyer",
        "code": "P28",
        "title": "Twelve Traditions Flyer",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 15,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "How AA Members Cooperate",
        "code": "P29",
        "title": "How AA Members Cooperate",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 45,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Is There Alcoholic in Your Life?",
        "code": "P30",
        "title": "Is There Alcoholic in Your Life?",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 25,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA In Your Community",
        "code": "P31",
        "title": "AA In Your Community",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 15,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA & the Gay/Lesbian Alcoholic",
        "code": "P32",
        "title": "AA & the Gay/Lesbian Alcoholic",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 40,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "It Sure Beats Sitting in a Cell",
        "code": "P33",
        "title": "It Sure Beats Sitting in a Cell",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 25,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Let's Be Friendly w/Our Friends",
        "code": "P34",
        "title": "Let's Be Friendly w/Our Friends",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 15,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Problems Other Than Alcohol",
        "code": "P35",
        "title": "Problems Other Than Alcohol",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 15,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Is AA For Me?",
        "code": "P36",
        "title": "Is AA For Me?",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 25,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Too Young?",
        "code": "P37",
        "title": "Too Young?",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 25,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "What Happened to Joe?",
        "code": "P38",
        "title": "What Happened to Joe?",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 25,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "It Happened to Alice",
        "code": "P39",
        "title": "It Happened to Alice",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 25,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Speaking at Non-AA Meetings",
        "code": "P40",
        "title": "Speaking at Non-AA Meetings",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 30,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "A Member's Eye View of AA",
        "code": "P41",
        "title": "A Member's Eye View of AA",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 25,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Brief Guide to AA",
        "code": "P42",
        "title": "Brief Guide to AA",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 15,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Twelve Traditions Illustrated",
        "code": "P43",
        "title": "Twelve Traditions Illustrated",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 45,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA's Legacy of Service",
        "code": "P44",
        "title": "AA's Legacy of Service",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 25,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Circles of Love & Service",
        "code": "P45",
        "title": "Circles of Love & Service",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 8,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "If You Are A Professional…",
        "code": "P46",
        "title": "If You Are A Professional…",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 25,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Understanding Anonymity",
        "code": "P47",
        "title": "Understanding Anonymity",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 25,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "2011 Membership Survey",
        "code": "P48",
        "title": "2011 Membership Survey",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 15,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Bridging the Gap: Temp Contact",
        "code": "P49",
        "title": "Bridging the Gap: Temp Contact",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 25,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA & the Armed Services",
        "code": "P50",
        "title": "AA & the Armed Services",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 45,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA for the Black/African American",
        "code": "P51",
        "title": "AA for the Black/African American",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 40,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Co-Founders of AA",
        "code": "P53",
        "title": "Co-Founders of AA",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 30,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Is There Alcoholic in Workplace?",
        "code": "P54",
        "title": "Is There Alcoholic in Workplace?",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 8,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Twelve Steps Illustrated",
        "code": "P55",
        "title": "Twelve Steps Illustrated",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 30,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA for Alcoholic w/Special Needs",
        "code": "P83",
        "title": "AA for Alcoholic w/Special Needs",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 40,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Many Paths to Spirituality **",
        "code": "P84",
        "title": "Many Paths to Spirituality **",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 30,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Traditions Checklist - Group Inv.",
        "code": "MS20",
        "title": "Traditions Checklist - Group Inv.",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 11,
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Concepts Checklist",
        "code": "F91",
        "title": "Concepts Checklist",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": "-",
        "Product_Group": "LITERATURE",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA Big Book - Cassettes",
        "code": "MB1",
        "title": "AA Big Book - Cassettes",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1800,
        "Product_Group": "LITERATURE",
        "category": "Audio Cassettes"
    }),
    new Product({
        "name": "12 & 12 - Cassettes",
        "code": "MB2",
        "title": "12 & 12 - Cassettes",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1800,
        "Product_Group": "LITERATURE",
        "category": "Audio Cassettes"
    }),
    new Product({
        "name": "AA Comes of Age - Cassettes",
        "code": "MB3",
        "title": "AA Comes of Age - Cassettes",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1800,
        "Product_Group": "LITERATURE",
        "category": "Audio Cassettes"
    }),
    new Product({
        "name": "Pioneers of AA - Cassettes",
        "code": "MB4",
        "title": "Pioneers of AA - Cassettes",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1000,
        "Product_Group": "LITERATURE",
        "category": "Audio Cassettes"
    }),
    new Product({
        "name": "Living Sober - Cassettes",
        "code": "MB7",
        "title": "Living Sober - Cassettes",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1800,
        "Product_Group": "LITERATURE",
        "category": "Audio Cassettes"
    }),
    new Product({
        "name": "Three Legacies, By Bill - Cassettes",
        "code": "M15",
        "title": "Three Legacies, By Bill - Cassettes",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 600,
        "Product_Group": "LITERATURE",
        "category": "Audio Cassettes"
    }),
    new Product({
        "name": "Voices of our Co-Founders - Cass.",
        "code": "M37",
        "title": "Voices of our Co-Founders - Cass.",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 600,
        "Product_Group": "LITERATURE",
        "category": "Audio Cassettes"
    }),
    new Product({
        "name": "Bill Discusses the Twelve Traditions",
        "code": "M38",
        "title": "Bill Discusses the Twelve Traditions",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 600,
        "Product_Group": "LITERATURE",
        "category": "Audio Cassettes"
    }),
    new Product({
        "name": "Young People & AA - DVD",
        "code": "DV03",
        "title": "Young People & AA - DVD",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1000,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Bill's Own Story - DVD - 60 min",
        "code": "DV04",
        "title": "Bill's Own Story - DVD - 60 min",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1000,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Bill Discusses 12 Traditions - DVD",
        "code": "DV05",
        "title": "Bill Discusses 12 Traditions - DVD",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1000,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Carrying Message Behind Walls - DVD",
        "code": "DV06",
        "title": "Carrying Message Behind Walls - DVD",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1000,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "AA GSO, GV & Service Structure DVD",
        "code": "DV07",
        "title": "AA GSO, GV & Service Structure DVD",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1000,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "It Sure Beats Sitting in a Cell -DVD",
        "code": "DV08",
        "title": "It Sure Beats Sitting in a Cell -DVD",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1000,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Hope: Alcoholics Anonymous -DVD",
        "code": "DV09",
        "title": "Hope: Alcoholics Anonymous -DVD",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1000,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Big Book -Text only-not audio",
        "code": "M70",
        "title": "Big Book -Text only-not audio",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 3000,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Big Book - 6 CDs - first 164 pages",
        "code": "M81A",
        "title": "Big Book - 6 CDs - first 164 pages",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1800,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Big Book - 16 CDs - Audio",
        "code": "M81A",
        "title": "Big Book - 16 CDs - Audio",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 5500,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "12 & 12 - 6 CDs",
        "code": "M83",
        "title": "12 & 12 - 6 CDs",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1800,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "AA Comes of Age - 10 CDs",
        "code": "M84",
        "title": "AA Comes of Age - 10 CDs",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1000,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Living Sober - CD - 4 hours",
        "code": "M85",
        "title": "Living Sober - CD - 4 hours",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1000,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Three Legacies by Bill - CD",
        "code": "M87",
        "title": "Three Legacies by Bill - CD",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 600,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Voices of Our Co-Founders - CD",
        "code": "M88",
        "title": "Voices of Our Co-Founders - CD",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 600,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Bill Discusses the 12 Traditions - CD",
        "code": "M89",
        "title": "Bill Discusses the 12 Traditions - CD",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 600,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Pioneers of AA - CD",
        "code": "M90",
        "title": "Pioneers of AA - CD",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1800,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "A Brief Guide to AA - CD",
        "code": "M91",
        "title": "A Brief Guide to AA - CD",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 300,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Emotional Sobriety - 2 CDs",
        "code": "CD17",
        "title": "Emotional Sobriety - 2 CDs",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 2000,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Spiritual Awakenings - 2 CDs",
        "code": "CD19",
        "title": "Spiritual Awakenings - 2 CDs",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 2000,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Pathways to Spirituality - CD",
        "code": "CD01",
        "title": "Pathways to Spirituality - CD",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1000,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "The Story of AA - CD - 60 min",
        "title": "The Story of AA - CD - 60 min",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1000,
        "Product_Group": "LITERATURE",
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Best of Bill - Hardcover Gift",
        "code": "BB05",
        "title": "Best of Bill - Hardcover Gift",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 695,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Best of Bill - Soft",
        "code": "BB06",
        "title": "Best of Bill - Soft",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 495,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Best of Bill - Large print Soft cover",
        "code": "BB07",
        "title": "Best of Bill - Large print Soft cover",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 595,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Language of the Heart - Hard",
        "code": "GV06",
        "title": "Language of the Heart - Hard",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1395,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "AA Around the World",
        "code": "GV10",
        "title": "AA Around the World",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 995,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Language of the Heart - Soft",
        "code": "GV10",
        "title": "Language of the Heart - Soft",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1295,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Thank You For Sharing",
        "code": "GV13",
        "title": "Thank You For Sharing",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1095,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Spiritual Awakenings",
        "code": "GV14",
        "title": "Spiritual Awakenings",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1095,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "The Home Group: Heartbeat of AA",
        "code": "GV15",
        "title": "The Home Group: Heartbeat of AA",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 895,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "I Am Responsible: Hand of AA",
        "code": "GV16",
        "title": "I Am Responsible: Hand of AA",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 995,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Emotional Sobriety",
        "code": "GV17",
        "title": "Emotional Sobriety",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 995,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Language of the Heart -Large",
        "code": "GV18",
        "title": "Language of the Heart -Large",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1495,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "In Our Own Words: Stories of Young AA",
        "code": "GV19",
        "title": "In Our Own Words: Stories of Young AA",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 995,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Beginners' Book",
        "code": "GV20",
        "title": "Beginners' Book",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 895,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Voices of Long-Term Sobriety",
        "code": "GV21",
        "title": "Voices of Long-Term Sobriety",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 995,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "A Rabbit Walks Into a Bar",
        "code": "GV22",
        "title": "A Rabbit Walks Into a Bar",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 995,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Spiritual Awakenings II",
        "code": "GV23",
        "title": "Spiritual Awakenings II",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1095,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "75th Anniv Edition Grapevine",
        "code": "GV24",
        "title": "75th Anniv Edition Grapevine",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 400,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Step by Step: Real AA, Real Recovery",
        "code": "GV25",
        "title": "Step by Step: Real AA, Real Recovery",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1095,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Emotional Sobriety II: Next Frontier",
        "code": "GV26",
        "title": "Emotional Sobriety II: Next Frontier",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 995,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Young & Sober",
        "code": "GV27",
        "title": "Young & Sober",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1095,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Into Action",
        "code": "GV28",
        "title": "Into Action",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1099,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Happy, Joyous & Free",
        "code": "GV29",
        "title": "Happy, Joyous & Free",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1099,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "One on One: AA Sponsorship in Action",
        "code": "GV30",
        "title": "One on One: AA Sponsorship in Action",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1099,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "No Matter What (Dealing with Adversity)",
        "code": "GV31",
        "title": "No Matter What (Dealing with Adversity)",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1099,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Grapevine Daily Quote Book",
        "code": "GV32",
        "title": "Grapevine Daily Quote Book",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1099,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Sober & Out **",
        "code": "GV33",
        "title": "Sober & Out **",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 1099,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "AA Preamble (5 1/2\" x 7 1/2\")",
        "code": "MS01",
        "title": "AA Preamble (5 1/2\" x 7 1/2\")",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 200,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Man on the Bed Poster",
        "code": "MS03",
        "title": "Man on the Bed Poster",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 300,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Slogans - Set of Five",
        "code": "MS04",
        "title": "Slogans - Set of Five",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 450,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Serenity Prayer (5 1/2\" x 7 1/2\")",
        "code": "MS05",
        "title": "Serenity Prayer (5 1/2\" x 7 1/2\")",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 200,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "2015 Wall Calendar (SOLD OUT)",
        "code": "MS08",
        "title": "2015 Wall Calendar (SOLD OUT)",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 900,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "GV 2015 Pocket Planner (SOLD OUT)",
        "code": "MS09",
        "title": "GV 2015 Pocket Planner (SOLD OUT)",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 500,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Co-Founders Memorial Issue",
        "code": "MS15",
        "title": "Co-Founders Memorial Issue",
        "taxable": "Yes",
        "shipable": "Yes",
        "price": 600,
        "Product_Group": "LITERATURE",
        "category": "Grapevine Items"
    })
]

var done = 0;
for (var i = 0; i < books.length; i++) {
    books[i].save(function(err,book) {
    	if (err) {
    		console.log('error: ' + err.message + ' ' + i);
    	}
        done++;
        console.log(book);
        if (done == books.length) {
            exit();
        }
    })
}

function exit() {
    mongoose.disconnect()
}
