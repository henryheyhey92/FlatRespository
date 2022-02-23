const BASE_API_URL = `https://data.gov.sg/api/action/datastore_search`;
const ID_YEAR_12_14 = "83b2fc37-ce8c-4df4-968b-370fd818138b";
const ID_YEAR_15_16 = "1b702208-44bf-4829-b620-4615ee19b57c";
const ID_YEAR_17_22 = "f1765b54-a209-4718-8d38-a39237f502b3";
const CSV_YEAR_12_14 = "year12to14data.csv";
const CSV_YEAR_15_16 = "year15to16data.csv";
const CSV_YEAR_17_22 = "year17to22data.csv";
const townNameArr = ["ANG MO KIO", "BEDOK","BISHAN", "BUKIT BATOK", "BUKIT MERAH","BUKIT PANJANG","BUKIT TIMAH"
,"CENTRAL AREA", "CHOA CHU KANG", "CLEMENTI", "GEYLANG", "HOUGANG", "JURONG EAST", "JURONG WEST", "KALLANG/WHAMPOA"
,"MARINE PARADE", "PASIR RIS", "PUNGGOL", "QUEENSTOWN", "SEMBAWANG","SENGKANG","SERANGOON", "TAMPINES","TOA PAYOH"
,"WOODLANDS", "YISHUN"];

const flatType = ["3 ROOM", "4 ROOM", "5 ROOM", "2 ROOM", "EXECUTIVE", "1 ROOM", "MULTI-GENERATION"];

let years = ['2012','2013','2014','2015','2016','2017', '2018', '2019', '2020', '2021', '2022'];

const central = ["BISHAN","BUKIT MERAH","CENTRAL AREA", "GEYLANG", "KALLANG/WHAMPOA", "MARINE PARADE", "TOA PAYOH", "QUEENSTOWN"];
const east = ["BEDOK", "PASIR RIS", "TAMPINES"];
const north = ["SEMBAWANG", "YISHUN", "ANG MO KIO", "HOUGANG", "PUNGGOL","SENGKANG", "SERANGOON", "WOODLANDS"];
const south = []