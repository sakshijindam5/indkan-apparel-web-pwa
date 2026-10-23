/*
  INDKAN World Wide Exim Pvt. Ltd. - Apparel Catalogue Data
  Curated & Structured by: Sakshi Jindam (sakshijindam17@gmail.com)
  Pre-Interview Practical Assignment Submission
  18 Export Products (6 Men's, 6 Women's, 6 Traditional)
  Includes fabric specifications, export MOQs, sizes, and wholesale pricing in INR (₹).
*/

const products = [
  // ==========================================
  // 1. MEN'S WEAR (6 Products)
  // ==========================================
  {
    id: 1,
    slug: "cotton-kurta",
    name: "Pure Cotton Kurta",
    category: "men",
    priceMin: 450,
    priceMax: 650,
    price: "₹450 – ₹650 per piece",
    moq: "100 pieces",
    fabric: "100% Combed Breathable Cotton",
    sizes: "M, L, XL, XXL",
    description: "Classic straight-cut men's cotton kurta with mandarin collar and functional side pockets.\nLightweight and breathable weave tailored specifically for comfortable warm-weather export wear.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    slug: "nehru-jacket",
    name: "Khadi Nehru Jacket",
    category: "men",
    priceMin: 850,
    priceMax: 1200,
    price: "₹850 – ₹1,200 per piece",
    moq: "50 pieces",
    fabric: "Handspun Khadi Cotton & Matka Silk Blend",
    sizes: "38, 40, 42, 44",
    description: "Sleeveless formal Nehru jacket featuring front button placket and piped welt pockets.\nStructured internal canvas lining that pairs well over both kurtas and western dress shirts.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    slug: "linen-shirt",
    name: "Pure Linen Casual Shirt",
    category: "men",
    priceMin: 650,
    priceMax: 900,
    price: "₹650 – ₹900 per piece",
    moq: "100 pieces",
    fabric: "100% Pure Organic Flax Linen (60 Lea)",
    sizes: "S, M, L, XL, XXL",
    description: "Relaxed regular-fit button-down linen shirt with curved hem and chest pocket.\nGarment-washed finish ensuring superior softness, breathability, and minimal post-wash shrinkage.",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    slug: "jodhpuri-suit",
    name: "Classic Jodhpuri Bandhgala Suit",
    category: "men",
    priceMin: 2400,
    priceMax: 3500,
    price: "₹2,400 – ₹3,500 per set",
    moq: "25 sets",
    fabric: "Premium Poly-Viscose Suiting Fabric",
    sizes: "36, 38, 40, 42, 44",
    description: "Regal two-piece formal Jodhpuri bandhgala coat paired with tapered matching trousers.\nCrafted with high-density fusing and padded shoulders for sharp silhouette at formal galas.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    slug: "denim-jacket",
    name: "Yarn-Dyed Denim Jacket",
    category: "men",
    priceMin: 750,
    priceMax: 1050,
    price: "₹750 – ₹1,050 per piece",
    moq: "100 pieces",
    fabric: "100% Cotton Indigo Denim (10.5 oz)",
    sizes: "S, M, L, XL, XXL",
    description: "Classic utility trucker denim jacket with dual button-flap chest pockets and brass shanks.\nReinforced twin-needle stitching throughout for rugged durability in overseas retail chains.",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    slug: "pathani-suit",
    name: "Traditional Pathani Suit Set",
    category: "men",
    priceMin: 950,
    priceMax: 1350,
    price: "₹950 – ₹1,350 per set",
    moq: "50 sets",
    fabric: "Cotton Linen Blend Fabric",
    sizes: "M, L, XL, XXL",
    description: "Comfortable two-piece ethnic Pathani kurta with shoulder epaulettes and matching salwar.\nA staple festive garment popular among South Asian apparel distributors in UK, UAE and USA.",
    image: "https://images.unsplash.com/photo-1620012253295-c15c429fbb41?auto=format&fit=crop&w=700&q=80"
  },

  // ==========================================
  // 2. WOMEN'S WEAR (6 Products)
  // ==========================================
  {
    id: 7,
    slug: "anarkali-kurti",
    name: "Embroidered Anarkali Kurti",
    category: "women",
    priceMin: 650,
    priceMax: 950,
    price: "₹650 – ₹950 per piece",
    moq: "100 pieces",
    fabric: "Rayon Slub with Cotton Voile Lining",
    sizes: "S, M, L, XL, XXL",
    description: "Gracefully flared floor-grazing Anarkali silhouette with delicate zari and thread work yoke.\nSoft flowing fabric providing elegant drape, ideal for both festive parties and daily ethnic wear.",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 8,
    slug: "cotton-saree",
    name: "Bengal Handloom Cotton Saree",
    category: "women",
    priceMin: 500,
    priceMax: 800,
    price: "₹500 – ₹800 per piece",
    moq: "50 pieces",
    fabric: "100% Combed Bengal Handloom Cotton",
    sizes: "Standard 5.5 meters (with 0.8m blouse piece)",
    description: "Lightweight summer saree woven on traditional wooden looms with contrasting temple borders.\nKnown for feathery lightweight comfort and skin-safe natural vegetable dye prints.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 9,
    slug: "palazzo-set",
    name: "Printed Kurti & Palazzo Set",
    category: "women",
    priceMin: 750,
    priceMax: 1100,
    price: "₹750 – ₹1,100 per set",
    moq: "100 sets",
    fabric: "100% Pure Cambric Cotton (60s Count)",
    sizes: "S, M, L, XL, XXL",
    description: "Coordinated straight calf-length kurta matched with flared wide-leg printed palazzo pants.\nTailored with an elasticated waistband and side slit kurta for effortless all-day movement.",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 10,
    slug: "salwar-suit",
    name: "Chanderi Cotton Salwar Suit",
    category: "women",
    priceMin: 900,
    priceMax: 1400,
    price: "₹900 – ₹1,400 per set",
    moq: "50 sets",
    fabric: "Chanderi Cotton Silk with Nazneen Chiffon Dupatta",
    sizes: "Unstitched Fabric / Readymade S to XXL",
    description: "Complete three-piece ethnic suit comprising embroidered top fabric, bottom, and dupatta.\nAvailable as unstitched fabric rolls for custom tailoring or pre-stitched ready-to-wear sizes.",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 11,
    slug: "block-print-dupatta",
    name: "Hand Block-Print Chanderi Dupatta",
    category: "women",
    priceMin: 300,
    priceMax: 450,
    price: "₹300 – ₹450 per piece",
    moq: "100 pieces",
    fabric: "Cotton-Silk Chanderi Weave",
    sizes: "Free Size (2.5m x 0.9m)",
    description: "Artisanal stole printed by hand using hand-carved wooden blocks and colorfast azo-free dyes.\nFinished with neat selvedge edges and playful matching thread tassels along both borders.",
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 12,
    slug: "ethnic-tunic",
    name: "Everyday Ethnic Cotton Tunic",
    category: "women",
    priceMin: 400,
    priceMax: 600,
    price: "₹400 – ₹600 per piece",
    moq: "100 pieces",
    fabric: "100% Breathable Cambric Cotton",
    sizes: "XS, S, M, L, XL, XXL",
    description: "Short fusion ethnic tunic top featuring a notched round neck and coconut shell buttons.\nCombines Indian block print motifs with contemporary western cut for versatile casual wear.",
    image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=700&q=80"
  },

  // ==========================================
  // 3. TRADITIONAL APPAREL (6 Products)
  // ==========================================
  {
    id: 13,
    slug: "banarasi-saree",
    name: "Royal Banarasi Silk Saree",
    category: "traditional",
    priceMin: 2200,
    priceMax: 3800,
    price: "₹2,200 – ₹3,800 per piece",
    moq: "25 pieces",
    fabric: "Pure Art Silk with Gold Zari Brocade",
    sizes: "Standard 6.3 meters (includes 0.8m blouse)",
    description: "Heritage bridal saree enriched with dense floral jaal motifs and an opulent zari pallu.\nA premier heirloom garment prized across international Indian bridal exhibitions and boutiques.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 14,
    slug: "kanjeevaram-saree",
    name: "Kanjeevaram Style Woven Silk Saree",
    category: "traditional",
    priceMin: 2500,
    priceMax: 4200,
    price: "₹2,500 – ₹4,200 per piece",
    moq: "25 pieces",
    fabric: "Heavy Silk Blend with Rich Metallic Zari",
    sizes: "Standard 6.3 meters (includes 0.8m blouse)",
    description: "South Indian ceremonial saree defined by vibrant contrast temple borders and heavy weave.\nDurable warp and weft construction designed to hold sharp, crisp pleats throughout long events.",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 15,
    slug: "sherwani",
    name: "Groomswear Zari Sherwani Set",
    category: "traditional",
    priceMin: 3500,
    priceMax: 6000,
    price: "₹3,500 – ₹6,000 per set",
    moq: "15 sets",
    fabric: "Raw Silk with Hand Embroidered Zardozi",
    sizes: "38, 40, 42, 44, 46",
    description: "Luxurious groom's long-line sherwani coat accompanied by silk churidar bottom and stole.\nDetailed with ornate micro-sequins, antique metallic buttons, and a stiffened mandarin collar.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 16,
    slug: "lehenga-choli",
    name: "Semi-Stitched Bridal Lehenga Choli",
    category: "traditional",
    priceMin: 2800,
    priceMax: 5500,
    price: "₹2,800 – ₹5,500 per set",
    moq: "20 sets",
    fabric: "Heavy Georgette & Art Silk with Net Dupatta",
    sizes: "Semi-Stitched (Fits waist up to 42 inches)",
    description: "Sweeping circular lehenga skirt embroidered with dori work, unstitched choli, and dupatta.\nGenerous 4-meter flare with double can-can inner net lining to create a dramatic bridal silhouette.",
    image: "https://images.unsplash.com/photo-1583391733975-ae4d19335e26?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 17,
    slug: "dhoti-kurta",
    name: "Festive Dhoti Kurta Set",
    category: "traditional",
    priceMin: 1100,
    priceMax: 1650,
    price: "₹1,100 – ₹1,650 per set",
    moq: "50 sets",
    fabric: "Tussar Silk Kurta & Combed Cotton Dhoti",
    sizes: "M, L, XL, XXL (Pre-pleated Dhoti)",
    description: "Classic Bengali ceremonial outfit with embroidered tussar kurta and ready-to-wear border dhoti.\nDhoti features an elasticated drawstring waistband for hassle-free drape without complex pleating.",
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 18,
    slug: "phulkari-dupatta",
    name: "Handcrafted Phulkari Chiffon Dupatta",
    category: "traditional",
    priceMin: 450,
    priceMax: 700,
    price: "₹450 – ₹700 per piece",
    moq: "100 pieces",
    fabric: "Flowing Chiffon with Pat Silk Embroidery",
    sizes: "Free Size (2.4m x 1.0m)",
    description: "Traditional Punjabi folk embroidery worked in vibrant geometric silk threads across chiffon.\nInstantly elevates plain salwar suits and western gowns with authentic Indian craft character.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=80"
  }
];

// Helper function to find a product by ID or slug
function getProductById(idOrSlug) {
  if (!idOrSlug) return null;
  return products.find(p => p.id == idOrSlug || p.slug === String(idOrSlug).toLowerCase());
}
