#! /usr/bin/env node

console.log('This script populates some test items and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const async = require('async')
const Item = require('./models/item')
const Category = require('./models/category')


const mongoose = require('mongoose');

const mongoDB = userArgs[0];

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const items = [];
const categories = [];
const images = [];

function clearDB(cb) {
  async.parallel([
    async function(callback) {
      await Item.deleteMany({});
    },
    async function(callback) {
      await Category.deleteMany({});
    }
  ], cb);
}

function itemCreate(name, description, brand, modelNo, category, price, stock, img, cb) {
  const item = new Item({ name, description, brand, modelNo, category, price, stock, img });
  
  item.save()
    .then((item) => {
      console.log("New item: " + item);
      items.push(item);
      cb(null, item);
    })
    .catch(err => cb(err, null));
}

function categoryCreate(name, cb) {
  const category = new Category({ name });
  
  category.save()
    .then((category) => {
      console.log('New category: ' + category);
      categories.push(category);
      cb(null, category);
    })
    .catch(err => cb(err, null));
}

function imageCreate(file, cb) {
  const image = new Image({ file });
  
  
}

function createCategories(cb) {
  async.series([
    function(callback) {
      categoryCreate('IPS', callback);
    },
    function(callback) {
      categoryCreate('VA', callback);
    },
    function(callback) {
      categoryCreate('OLED', callback);
    },
  ], cb);
}

function createItems(cb) {
  async.series([
    function(callback) {
      itemCreate(
        'SAMSUNG Odyssey G7 Series 27-Inch WQHD (2560x1440) Gaming Monitor, 240Hz, Curved, 1ms, HDMI, G-Sync, FreeSync Premium Pro',
        'Bringing the same 240hz refresh rate, 1ms response times, G-Sync and FreeSync Premium Pro support and Infinity Core lighting of the G9 - the G7 is the perfect choice for those who want the future of gaming monitors, in a more traditional size.',
        'Samsung',
        'LC27G75TQSNXZA',
        categories[1],
        650,
        10,
        '',
        callback
      );
    },
    
    function(callback) {
      itemCreate(
        'Dell 2022 S2721HGF 27" 144Hz FHD LED Curved Gaming Monitor, 1920 x 1080 Resolution, Adaptive-Sync, 144Hz Refresh Rate, 16:9 Aspect Ratio, 178 Viewing Angles, HDMI, DisplayPort, Audio line-Out, Black',
        'Explore new worlds on an expansive 27” Full-HD display with remarkably vivid visuals that draw you deeper into the game. The 1500R curved screen creates a more realistic field of vision for an incredibly immersive viewing experience.',
        'Dell',
        'S2721HGF',
        categories[1],
        380,
        5,
        callback
      );
      
    },
    
    function(callback) {
      itemCreate(
        'ASUS ProArt Display 31.5” 4K OLED Professional Monitor (PA32DC) - UHD (3840 x 2160), Built-in Motorized Colorimeter, Color Accuracy ΔE<1, Calman Ready, 99%DCI-P3, USB-C, Auto Calibration, Dolby Vision',
        'ASUS ProArt Display PA32DC is the world’s first OLED monitor with automatic calibration. It also features a built-in motorized flip colorimeter to ensure professional-grade color accuracy. This 31.5-inch 4K HDR monitor offers a cutting-edge OLED panel with pure RGB stripes and 99% DCI-P3 coverage to deliver highly accurate colors that bring out the finest details in your creations.',
        'Asus',
        'PA32DC',
        categories[2],
        3299.99,
        3,
        callback
      );
    },
    
    function(callback) {
      itemCreate(
        'LG 32EP950-B 32” Ultrafine UHD (3840 x 2160) OLED Pro Display with Adobe RBG 99% / DCI-P3 99%, VESA Display HDR 400 True Black, 1M:1 Contrast Ratio and Tilt/Height/Pivot Adjustable Stand - Black',
        '32” 4K OLED UltraFine Display. Great craft starts with a great screen. With vivid clarity and 3840x2160 pixels, the smallest details are highlighted, so you can make sure every aspect of your work is pixel perfect.',
        'LG',
        '32EP950-B',
        categories[2],
        2799.99,
        2,
        callback
      );
    },
    
    function(callback) {
      itemCreate(
        'LG 27GP750-B 27” Ultragear FHD (1920 x 1080) IPS Gaming Monitor w/ 1ms Response Time & 240Hz Refresh Rate, NVIDIA G-SYNC Compatible with AMD FreeSync Premium, Thin Bezel, Tilt/Height/Pivot Adjustable',
        "Reimagine every scene with vivid, responsive IPS. At 27\" and 16:9 screen ratio, LG's UltraGear™ Full HD IPS Display features realistic, true color with sRGB 99% Color Gamut and HDR 10 for enhanced contrast, clarity and detail, while delivering an ultra-fast 240Hz refresh rate and 1ms (GtG) response time. This UltraGear monitor is NVIDIA G-SYNC Compatible and with AMD FreeSync Premium. The 3-Side virtually borderless design with a Tilt/Height/Pivot adjustable stand makes any gaming setting look great too.",
        'LG',
        '27GP750-B',
        categories[0],
        399,
        12,
        callback
      );
    },
    
    function(callback) {
      itemCreate(
        'GIGABYTE M27Q X 27" 240Hz 1440P -KVM Gaming -Monitor, 2560 x 1440 SS IPS Display, 1ms (MPRT) Response Time, 92% DCI-P3, 1x Display Port 1.4, 2x HDMI 2.0, 2x USB 3.0, 1x USB Type-C',
        "GIGABYTE gaming monitors pack upscale performance into a streamlined package. The M27Q-X provides an immersive experience through fluid gameplay and great color accuracy and compatibility with graphic card software.",
        'GIGABYTE',
        'M27Q X-SA',
        categories[0],
        429.99,
        21,
        callback
      );
    },
    
    function(callback) {
      itemCreate(
        'ASUS ROG Swift 27” 1440P Gaming Monitor (PG279QM) - WQHD (2560 x 1440), Fast IPS, 240Hz, 1ms, G-SYNC, NVIDIA Reflex Latency Analyzer, DisplayHDR400, Eye Care, HDMI, DisplayPort, USB, Height Adjustable',
        "ROG Swift PG279QM is the perfect gaming monitor for fast-paced action games. This 27-inch 1440P display features a Fast IPS panel with up to a 240Hz refresh rate, 1ms gray-to-gray (GTG) response time, and NVIDIA Reflex Latency Analyzer, a revolutionary integrated system latency measurement tool.",
        'ASUS',
        'PG279QM',
        categories[0],
        749,
        11,
        callback
      );
    },
  ], cb);
}

async.series([
  clearDB,
  createCategories,
  createItems
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Items: '+items);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



