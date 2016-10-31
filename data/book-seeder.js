var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/roundup')

var books = [

    new Product({
        "name": "Big Book 75th Anniversary",
        "title": "AA Big Book-75th Anniv. Edition",
        "price": 12,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Big Book - Hard Cover",
        "title": "AA Big Book - Hard Cover",
        "price": 9.5,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Big Book - Soft Cover",
        "title": "AA Big Book - Soft Cover",
        "price": 9.1,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Big Book - Mini",
        "title": "Mini Big Book - first 164 pages",
        "price": 5,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Big Book - Large Print",
        "title": "AA Big Book - Large Print",
        "price": 10.3,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Big Book - Large (1st 164)",
        "title": "LG Print Big Book - first 164 pages",
        "price": 6,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Big Book - Braile",
        "title": "AA Big Book - Braille",
        "price": 8,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "12&12",
        "title": "12 Steps & 12 Traditions",
        "price": 8.9,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "12&12 - Soft Cover",
        "title": "12 & 12 - Soft Cover",
        "price": 8.25,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "12&12 - Mini",
        "title": "12 & 12 - Mini",
        "price": 6.5,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "12&12 - Gift",
        "title": "12 & 12 - Gift Edition",
        "price": 8.25,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "12&12 - Large Print",
        "title": "12 & 12 - Large Print",
        "price": 8.25,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "12&12 - Braille",
        "title": "12 & 12 - Braille",
        "price": 7.4,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Came to Believe",
        "title": "Came to Believe",
        "price": 5,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Came to Believe - Large Print",
        "title": "Came to Believe - Large Print",
        "price": 5.25,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Living Sober",
        "title": "Living Sober",
        "price": 5,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Living Sober - Large Print",
        "title": "Living Sober - Large Print",
        "price": 5.25,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "As Bill Sees It - Hard Cover",
        "title": "As Bill Sees It - Hard Cover",
        "price": 9,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "As Bill Sees It - Soft Cover",
        "title": "As Bill Sees It - Soft Cover",
        "price": 8.6,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "As Bill Sees It - Large Print",
        "title": "As Bill Sees It - Large Print",
        "price": 9.5,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Daily Reflections",
        "title": "Daily Reflections",
        "price": 10.25,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Daily Reflections - Large Print",
        "title": "Daily Reflections - Large Print",
        "price": 10.75,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Daily Reflections - Braille",
        "title": "Daily Reflections - Braille",
        "price": 8.25,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "AA Comes of Age",
        "title": "AA Comes of Age",
        "price": 9.5,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "AA Comes of Age - 75th Anniv. Ed.",
        "title": "AA Comes of Age - 75th Anniv. Ed.",
        "price": 7,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Dr. Bob & The Good Old-Timers",
        "title": "Dr. Bob & The Good Old-Timers",
        "price": 10.5,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Pass It On",
        "title": "Pass It On",
        "price": 11,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Boxed Set - Dr. Bob & Pass It On",
        "title": "Boxed Set - Dr. Bob & Pass It On",
        "price": 21.5,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Boxed Set - Big Book & B20",
        "title": "Boxed Set - Big Book & B20",
        "price": 15,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "AA in Prison/Inmate to Inmate",
        "title": "AA in Prison/Inmate to Inmate",
        "price": 2.5,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Experience, Strength & Hope",
        "title": "Experience, Strength & Hope",
        "price": 5.5,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "AA Service Manual",
        "title": "AA Service Manual",
        "price": 3.55,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "AA Service Manual - Large Print",
        "title": "AA Service Manual - Large Print",
        "price": 8.3,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "International AA Directory",
        "title": "International AA Directory",
        "price": 1.8,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "AA Directory Eastern (Western 3, Canada 2)",
        "title": "AA Directory Eastern (Western 3, Canada 2)",
        "price": 3.6,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Public Information Workbook",
        "title": "Public Information Workbook",
        "price": 2,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "5-County Meeting Directory",
        "title": "5-County Meeting Directory",
        "price": 1,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Beginner Packet",
        "title": "Beginner Packet",
        "price": 2,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Green Card",
        "title": "Green Card",
        "price": 0.1,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Yellow Card",
        "title": "Yellow Card (Steps/Rewards)",
        "price": 0.1,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Daily Inventory",
        "title": "Daily Inventory Guide",
        "price": 0.1,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Daily Meditation",
        "title": "Daily Meditation Guide",
        "price": 0.1,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "12 Questions",
        "title": "20 Questions",
        "price": 0.1,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Beginner's Guide",
        "title": "Guide for Beginner",
        "price": 0.1,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Intergroup - Carrying the Message",
        "title": "Intergroup - Carrying the Message",
        "price": 0.1,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Serenity Prayer",
        "title": "Wallet Card (Serenity Prayer)",
        "price": 0.15,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Responsibility Card",
        "title": "Responsibility Wallet Card",
        "price": 0.15,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Anononymity Card",
        "title": "Anonymity Wallet Card",
        "price": 0.15,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Beginner's Meeting Guide",
        "title": "Guide to Leading Beginners Mtg",
        "price": 2.75,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Group Handbook",
        "title": "The Group Handbook",
        "price": 11,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Display Rack",
        "title": "Display Rack",
        "price": 20,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Display Rack / Extension",
        "title": "Set of Display Rack & Extension",
        "price": 35,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "12 Steps",
        "title": "Twelve Steps (12\" x 17\")",
        "price": 3.4,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "12 Traditions",
        "title": "Twelve Traditions (12\" x 17\")",
        "price": 3.4,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Serenity Prayer",
        "title": "Serenity Prayer (12\" x 17\")",
        "price": 3.4,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Serenity Prayer, 12 Steps, 12 Traditions",
        "title": "Set of 3 (12\" x 17\")",
        "price": 7.15,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Responsibility Card",
        "title": "Responsibility Placard (19\"x 29\")",
        "price": 8.65,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Preamble",
        "title": "Preamble Placard (19\"x 29\")",
        "price": 8.65,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "12 Steps Shade",
        "title": "12 Steps Window Shade",
        "price": 29,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "12 Traditions Shade",
        "title": "12 Traditions Window Shade",
        "price": 29,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "12&12 Shade",
        "title": "Set/12 & 12 Window Shades",
        "price": 48,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "12 Concepts Shade",
        "title": "12 Concepts Window Shade",
        "price": 29,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Bill's Last Message",
        "title": "Bill's Last Message",
        "price": 3,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Farewell Talk",
        "title": "Dr. Bob's Farewell Talk",
        "price": 3,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Bill and Bob - Last Message",
        "title": "Set-Bill & Bob-Last Message/Farewell Talk",
        "price": 6,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Round AA Meeting Sign",
        "title": "Round AA Meeting Sign (8 1/2 \" dia)",
        "price": 7,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Table-top Display 12&12",
        "title": "12 & 12 Tabletop Display",
        "price": 20,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Unity Card",
        "title": "Unity Placard (19\"x 29\")",
        "price": 8.65,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Anononymity Card",
        "title": "Anonymity Display Card",
        "price": 0.2,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Meeting in a Pocket",
        "title": "A.A. Meeting in a Pocket **",
        "price": 1,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Assortment 1",
        "title": "$35.00 Literature Assortment",
        "price": 35,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "Assortment 2",
        "title": "$20.00 Literature Assortment",
        "price": 20,
        "category": "Books",
        "productType": "LITERATURE"
    }),
    new Product({
        "name": "This is AA Pamphlet",
        "title": "This is AA",
        "price": 0.15,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "FAQ Pamphlet",
        "title": "Frequently Asked Questions",
        "price": 0.25,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Is AA for you?",
        "title": "Is AA For You?",
        "price": 0.1,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Young People and AA",
        "title": "Young People and AA",
        "price": 0.3,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA For The Woman",
        "title": "AA For The Woman",
        "price": 0.3,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "3 Talks to the Medical Society",
        "title": "3 Talks to the Medical Society",
        "price": 0.45,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "The 12 Concepts Illustrated",
        "title": "The 12 Concepts Illustrated",
        "price": 0.45,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Memo to Inmate Alcoholic",
        "title": "Memo to Inmate Alcoholic",
        "price": 0.2,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "How it Works",
        "title": "How it Works",
        "price": 0.15,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA Medications & Other Drugs",
        "title": "AA Medications & Other Drugs",
        "price": 0.25,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Jack Alexander Article",
        "title": "Jack Alexander Article",
        "price": 0.25,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Do You Think You're Different?",
        "title": "Do You Think You're Different?",
        "price": 0.3,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Q & A on Sponsorship",
        "title": "Q & A on Sponsorship",
        "price": 0.15,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "The AA Group",
        "title": "The AA Group",
        "price": 0.3,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA Tradition-How It Developed",
        "title": "AA Tradition-How It Developed",
        "price": 0.3,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Inside AA",
        "title": "Inside AA",
        "price": 0.08,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "G.S.R. may be most important job",
        "title": "G.S.R. may be most important job",
        "price": 0.08,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA for Native North American",
        "title": "AA for Native North American",
        "price": 0.4,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA for the Older Alcoholic",
        "title": "AA for the Older Alcoholic",
        "price": 0.4,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA Resource Health Care Prof",
        "title": "AA Resource Health Care Prof",
        "price": 0.25,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "A Newcomer Asks",
        "title": "A Newcomer Asks",
        "price": 0.1,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Clergy Asks About AA",
        "title": "Clergy Asks About AA",
        "price": 0.25,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA in Correctional Facilities",
        "title": "AA in Correctional Facilities",
        "price": 0.3,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA in Treatment Facilities",
        "title": "AA in Treatment Facilities",
        "price": 0.3,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Twelve Traditions Flyer",
        "title": "Twelve Traditions Flyer",
        "price": 0.15,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "How AA Members Cooperate",
        "title": "How AA Members Cooperate",
        "price": 0.45,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Is There Alcoholic in Your Life?",
        "title": "Is There Alcoholic in Your Life?",
        "price": 0.25,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA In Your Community",
        "title": "AA In Your Community",
        "price": 0.15,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA & the Gay/Lesbian Alcoholic",
        "title": "AA & the Gay/Lesbian Alcoholic",
        "price": 0.4,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "It Sure Beats Sitting in a Cell",
        "title": "It Sure Beats Sitting in a Cell",
        "price": 0.25,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Let's Be Friendly w/Our Friends",
        "title": "Let's Be Friendly w/Our Friends",
        "price": 0.15,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Problems Other Than Alcohol",
        "title": "Problems Other Than Alcohol",
        "price": 0.15,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Is AA For Me?",
        "title": "Is AA For Me?",
        "price": 0.25,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Too Young?",
        "title": "Too Young?",
        "price": 0.25,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "What Happened to Joe?",
        "title": "What Happened to Joe?",
        "price": 0.25,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "It Happened to Alice",
        "title": "It Happened to Alice",
        "price": 0.25,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Speaking at Non-AA Meetings",
        "title": "Speaking at Non-AA Meetings",
        "price": 0.3,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "A Member's Eye View of AA",
        "title": "A Member's Eye View of AA",
        "price": 0.25,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Brief Guide to AA",
        "title": "Brief Guide to AA",
        "price": 0.15,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Twelve Traditions Illustrated",
        "title": "Twelve Traditions Illustrated",
        "price": 0.45,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA's Legacy of Service",
        "title": "AA's Legacy of Service",
        "price": 0.25,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Circles of Love & Service",
        "title": "Circles of Love & Service",
        "price": 0.08,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "If You Are A Professional…",
        "title": "If You Are A Professional…",
        "price": 0.25,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Understanding Anonymity",
        "title": "Understanding Anonymity",
        "price": 0.25,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "2011 Membership Survey",
        "title": "2011 Membership Survey",
        "price": 0.15,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Bridging the Gap: Temp Contact",
        "title": "Bridging the Gap: Temp Contact",
        "price": 0.25,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA & the Armed Services",
        "title": "AA & the Armed Services",
        "price": 0.45,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA for the Black/African American",
        "title": "AA for the Black/African American",
        "price": 0.4,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Co-Founders of AA",
        "title": "Co-Founders of AA",
        "price": 0.3,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Is There Alcoholic in Workplace?",
        "title": "Is There Alcoholic in Workplace?",
        "price": 0.08,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Twelve Steps Illustrated",
        "title": "Twelve Steps Illustrated",
        "price": 0.3,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA for Alcoholic w/Special Needs",
        "title": "AA for Alcoholic w/Special Needs",
        "price": 0.4,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Many Paths to Spirituality **",
        "title": "Many Paths to Spirituality **",
        "price": 0.3,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Traditions Checklist - Group Inv.",
        "title": "Traditions Checklist - Group Inv.",
        "price": 0.11,
        "category": "Pamphlets"
    }),
    new Product({
        "name": "Concepts Checklist",
        "title": "Concepts Checklist",
        "price": "-",
        "category": "Pamphlets"
    }),
    new Product({
        "name": "AA Big Book - Cassettes",
        "title": "AA Big Book - Cassettes",
        "price": 18,
        "category": "Audio Cassettes"
    }),
    new Product({
        "name": "12 & 12 - Cassettes",
        "title": "12 & 12 - Cassettes",
        "price": 18,
        "category": "Audio Cassettes"
    }),
    new Product({
        "name": "AA Comes of Age - Cassettes",
        "title": "AA Comes of Age - Cassettes",
        "price": 18,
        "category": "Audio Cassettes"
    }),
    new Product({
        "name": "Pioneers of AA - Cassettes",
        "title": "Pioneers of AA - Cassettes",
        "price": 10,
        "category": "Audio Cassettes"
    }),
    new Product({
        "name": "Living Sober - Cassettes",
        "title": "Living Sober - Cassettes",
        "price": 18,
        "category": "Audio Cassettes"
    }),
    new Product({
        "name": "Three Legacies, By Bill - Cassettes",
        "title": "Three Legacies, By Bill - Cassettes",
        "price": 6,
        "category": "Audio Cassettes"
    }),
    new Product({
        "name": "Voices of our Co-Founders - Cass.",
        "title": "Voices of our Co-Founders - Cass.",
        "price": 6,
        "category": "Audio Cassettes"
    }),
    new Product({
        "name": "Bill Discusses the Twelve Traditions",
        "title": "Bill Discusses the Twelve Traditions",
        "price": 6,
        "category": "Audio Cassettes"
    }),
    new Product({
        "name": "Young People & AA - DVD",
        "title": "Young People & AA - DVD",
        "price": 10,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Bill's Own Story - DVD - 60 min",
        "title": "Bill's Own Story - DVD - 60 min",
        "price": 10,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Bill Discusses 12 Traditions - DVD",
        "title": "Bill Discusses 12 Traditions - DVD",
        "price": 10,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Carrying Message Behind Walls - DVD",
        "title": "Carrying Message Behind Walls - DVD",
        "price": 10,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "AA GSO, GV & Service Structure DVD",
        "title": "AA GSO, GV & Service Structure DVD",
        "price": 10,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "It Sure Beats Sitting in a Cell -DVD",
        "title": "It Sure Beats Sitting in a Cell -DVD",
        "price": 10,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Hope: Alcoholics Anonymous -DVD",
        "title": "Hope: Alcoholics Anonymous -DVD",
        "price": 10,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Big Book -Text only-not audio",
        "title": "Big Book -Text only-not audio",
        "price": 30,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Big Book - 6 CDs - first 164 pages",
        "title": "Big Book - 6 CDs - first 164 pages",
        "price": 18,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Big Book - 16 CDs - Audio",
        "title": "Big Book - 16 CDs - Audio",
        "price": 55,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "12 & 12 - 6 CDs",
        "title": "12 & 12 - 6 CDs",
        "price": 18,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "AA Comes of Age - 10 CDs",
        "title": "AA Comes of Age - 10 CDs",
        "price": 10,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Living Sober - CD - 4 hours",
        "title": "Living Sober - CD - 4 hours",
        "price": 10,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Three Legacies by Bill - CD",
        "title": "Three Legacies by Bill - CD",
        "price": 6,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Voices of Our Co-Founders - CD",
        "title": "Voices of Our Co-Founders - CD",
        "price": 6,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Bill Discusses the 12 Traditions - CD",
        "title": "Bill Discusses the 12 Traditions - CD",
        "price": 6,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Pioneers of AA - CD",
        "title": "Pioneers of AA - CD",
        "price": 18,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "A Brief Guide to AA - CD",
        "title": "A Brief Guide to AA - CD",
        "price": 3,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Emotional Sobriety - 2 CDs",
        "title": "Emotional Sobriety - 2 CDs",
        "price": 20,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Spiritual Awakenings - 2 CDs",
        "title": "Spiritual Awakenings - 2 CDs",
        "price": 20,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Pathways to Spirituality - CD",
        "title": "Pathways to Spirituality - CD",
        "price": 10,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "The Story of AA - CD - 60 min",
        "title": "The Story of AA - CD - 60 min",
        "price": 10,
        "category": "CDs and DVDs"
    }),
    new Product({
        "name": "Best of Bill - Hardcover Gift",
        "title": "Best of Bill - Hardcover Gift",
        "price": 6.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Best of Bill - Soft",
        "title": "Best of Bill - Soft",
        "price": 4.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Best of Bill - Large print Soft cover",
        "title": "Best of Bill - Large print Soft cover",
        "price": 5.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Language of the Heart - Hard",
        "title": "Language of the Heart - Hard",
        "price": 13.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "AA Around the World",
        "title": "AA Around the World",
        "price": 9.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Language of the Heart - Soft",
        "title": "Language of the Heart - Soft",
        "price": 12.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Thank You For Sharing",
        "title": "Thank You For Sharing",
        "price": 10.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Spiritual Awakenings",
        "title": "Spiritual Awakenings",
        "price": 10.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "The Home Group: Heartbeat of AA",
        "title": "The Home Group: Heartbeat of AA",
        "price": 8.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "I Am Responsible: Hand of AA",
        "title": "I Am Responsible: Hand of AA",
        "price": 9.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Emotional Sobriety",
        "title": "Emotional Sobriety",
        "price": 9.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Language of the Heart -Large",
        "title": "Language of the Heart -Large",
        "price": 14.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "In Our Own Words: Stories of Young AA",
        "title": "In Our Own Words: Stories of Young AA",
        "price": 9.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Beginners' Book",
        "title": "Beginners' Book",
        "price": 8.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Voices of Long-Term Sobriety",
        "title": "Voices of Long-Term Sobriety",
        "price": 9.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "A Rabbit Walks Into a Bar",
        "title": "A Rabbit Walks Into a Bar",
        "price": 9.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Spiritual Awakenings II",
        "title": "Spiritual Awakenings II",
        "price": 10.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "75th Anniv Edition Grapevine",
        "title": "75th Anniv Edition Grapevine",
        "price": 4,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Step by Step: Real AA, Real Recovery",
        "title": "Step by Step: Real AA, Real Recovery",
        "price": 10.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Emotional Sobriety II: Next Frontier",
        "title": "Emotional Sobriety II: Next Frontier",
        "price": 9.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Young & Sober",
        "title": "Young & Sober",
        "price": 10.95,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Into Action",
        "title": "Into Action",
        "price": 10.99,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Happy, Joyous & Free",
        "title": "Happy, Joyous & Free",
        "price": 10.99,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "One on One: AA Sponsorship in Action",
        "title": "One on One: AA Sponsorship in Action",
        "price": 10.99,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "No Matter What (Dealing with Adversity)",
        "title": "No Matter What (Dealing with Adversity)",
        "price": 10.99,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Grapevine Daily Quote Book",
        "title": "Grapevine Daily Quote Book",
        "price": 10.99,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Sober & Out **",
        "title": "Sober & Out **",
        "price": 10.99,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "AA Preamble (5 1/2\" x 7 1/2\")",
        "title": "AA Preamble (5 1/2\" x 7 1/2\")",
        "price": 2,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Man on the Bed Poster",
        "title": "Man on the Bed Poster",
        "price": 3,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Slogans - Set of Five",
        "title": "Slogans - Set of Five",
        "price": 4.5,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Serenity Prayer (5 1/2\" x 7 1/2\")",
        "title": "Serenity Prayer (5 1/2\" x 7 1/2\")",
        "price": 2,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "2015 Wall Calendar (SOLD OUT)",
        "title": "2015 Wall Calendar (SOLD OUT)",
        "price": 9,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "GV 2015 Pocket Planner (SOLD OUT)",
        "title": "GV 2015 Pocket Planner (SOLD OUT)",
        "price": 5,
        "category": "Grapevine Items"
    }),
    new Product({
        "name": "Co-Founders Memorial Issue",
        "title": "Co-Founders Memorial Issue",
        "price": 6,
        "category": "Grapevine Items"
    })
]

var done = 0;
for (var i = 0; i < books.length; i++) {
    books[i].save(function() {
        done++;
        if (done == books.length) {
            exit();
        }
    })
}

function exit() {
    mongoose.disconnect()
}
