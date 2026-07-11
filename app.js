/* ==========================================
   MISE EN PLACE - APPLICATION ENGINE (app.js)
   ========================================== */

// --- Constants & Templates (Local AI Dataset) ---
const RECIPE_DATABASE = {
  standard: {
    busy: {
      breakfast: {
        name: "Quick Berry Greek Yogurt Bowl",
        time: "5 mins",
        desc: "High protein Greek yogurt topped with fresh honey, mixed berries, and honey oats.",
        steps: ["Spoon 1 cup of Greek yogurt into a bowl.", "Wash and add 1/2 cup of fresh mixed berries.", "Drizzle 1 tbsp of honey or maple syrup.", "Top with 1/4 cup of granola oats for crunch."]
      },
      lunch: {
        name: "Toasted Turkey & Cheddar Ciabatta",
        time: "10 mins",
        desc: "Savory smoked turkey, cheddar cheese, sliced tomatoes, and honey mustard pressed in a ciabatta roll.",
        steps: ["Slice ciabatta roll in half and spread honey mustard on both sides.", "Layer 4 slices of smoked turkey breast and 2 slices of sharp cheddar cheese.", "Add 3 thin slices of ripe tomato.", "Toast in a pan or panini press for 4-5 minutes until the cheese is beautifully melted."]
      },
      dinner: {
        name: "15-Minute Garlic Butter Shrimp Pasta",
        time: "15 mins",
        desc: "Sautéed garlic shrimp tossed with angel hair pasta, freshly squeezed lemon, and chopped parsley.",
        steps: ["Boil angel hair pasta in salted water for 5-6 minutes.", "In a large skillet, melt 2 tbsp of butter with 1 tbsp of olive oil.", "Add 4 cloves of minced garlic and sauté for 1 minute until fragrant.", "Add peeled shrimp and cook for 2-3 minutes per side until pink.", "Drain pasta, toss in the skillet with shrimp, lemon juice, and chopped fresh parsley. Season with black pepper."]
      },
      grocery: [
        { id: "g1", name: "Greek Yogurt (32oz)", category: "Dairy/Other", cost: 4.50 },
        { id: "g2", name: "Fresh Strawberries & Blueberries", category: "Produce", cost: 5.00 },
        { id: "g3", name: "Granola Oats", category: "Pantry", cost: 3.50 },
        { id: "g4", name: "Ciabatta Bread Rolls (4-pack)", category: "Pantry", cost: 3.80 },
        { id: "g5", name: "Deli Smoked Turkey Breast (1/2 lb)", category: "Protein", cost: 6.00 },
        { id: "g6", name: "Cheddar Cheese Slices", category: "Dairy/Other", cost: 3.00 },
        { id: "g7", name: "Roma Tomatoes (3-pack)", category: "Produce", cost: 1.50 },
        { id: "g8", name: "Raw Medium Shrimp (1/2 lb)", category: "Protein", cost: 8.50 },
        { id: "g9", name: "Angel Hair Pasta (16oz)", category: "Pantry", cost: 1.50 },
        { id: "g10", name: "Fresh Lemons & Garlic", category: "Produce", cost: 2.00 }
      ],
      subs: [
        { originalId: "g5", originalName: "Deli Smoked Turkey Breast (1/2 lb)", replacementName: "Canned Chickpeas (2 cans)", replacementCost: 1.80 },
        { originalId: "g8", originalName: "Raw Medium Shrimp (1/2 lb)", replacementName: "Firm Tofu Block", replacementCost: 2.50 },
        { originalId: "g2", originalName: "Fresh Strawberries & Blueberries", replacementName: "Frozen Mixed Berries Bag", replacementCost: 3.00 }
      ]
    },
    normal: {
      breakfast: {
        name: "Avocado Egg Sourdough Toast",
        time: "15 mins",
        desc: "Toasted artisanal sourdough spread with seasoned mashed avocado, topped with two sunny-side-up eggs.",
        steps: ["Slice and toast 2 thick slices of artisanal sourdough bread.", "Mash 1 ripe avocado with a pinch of sea salt, black pepper, and lime juice.", "Heat 1 tsp butter in a non-stick skillet and fry 2 large eggs until white is set but yolk is runny.", "Spread avocado mash on the toast, top with fried eggs, and sprinkle with red pepper flakes."]
      },
      lunch: {
        name: "Mediterranean Grilled Chicken Salad",
        time: "20 mins",
        desc: "Slices of grilled chicken breast over chopped cucumbers, kalamata olives, feta cheese, and tomatoes in a light vinaigrette.",
        steps: ["Season 1 chicken breast with oregano, garlic powder, salt, and olive oil.", "Grill chicken in a skillet over medium heat for 6-7 minutes per side until done. Let it rest, then slice.", "In a large bowl, combine chopped cucumbers, cherry tomatoes, olives, and crumbled feta.", "Toss with 1 tbsp olive oil and 1 tsp red wine vinegar. Top with grilled chicken slices."]
      },
      dinner: {
        name: "Pan-Seared Salmon with Asparagus & Quinoa",
        time: "30 mins",
        desc: "Crispy pan-seared salmon fillet served alongside garlic-roasted asparagus and fluffy quinoa.",
        steps: ["Rinse and cook 1/2 cup of quinoa in 1 cup of water or vegetable broth for 15 minutes.", "Toss asparagus spears in olive oil, minced garlic, salt, and pepper. Roast in a pan for 8-10 minutes.", "Pat salmon fillet dry and season with salt and pepper.", "Heat 1 tbsp oil in a skillet over medium-high heat. Sear salmon skin-side down for 4 minutes, flip and cook for 3 more minutes.", "Serve salmon over cooked quinoa with roasted asparagus on the side."]
      },
      grocery: [
        { id: "g21", name: "Artisanal Sourdough Loaf", category: "Pantry", cost: 4.80 },
        { id: "g22", name: "Fresh Avocados (2-pack)", category: "Produce", cost: 2.50 },
        { id: "g23", name: "Pasture-Raised Eggs (1 dozen)", category: "Dairy/Other", cost: 4.50 },
        { id: "g24", name: "Boneless Skinless Chicken Breasts (1 lb)", category: "Protein", cost: 7.00 },
        { id: "g25", name: "Cucumbers & Cherry Tomatoes", category: "Produce", cost: 3.50 },
        { id: "g26", name: "Feta Cheese Block (8oz)", category: "Dairy/Other", cost: 4.00 },
        { id: "g27", name: "Salmon Fillets (2 portions)", category: "Protein", cost: 14.00 },
        { id: "g28", name: "Fresh Asparagus Bunch", category: "Produce", cost: 3.20 },
        { id: "g29", name: "Organic Quinoa Bag (16oz)", category: "Pantry", cost: 3.80 }
      ],
      subs: [
        { originalId: "g27", originalName: "Salmon Fillets (2 portions)", replacementName: "Cod Fillets (2 portions)", replacementCost: 7.00 },
        { originalId: "g24", originalName: "Boneless Skinless Chicken Breasts (1 lb)", replacementName: "Canned White Beans (2 cans)", replacementCost: 1.60 },
        { originalId: "g28", originalName: "Fresh Asparagus Bunch", replacementName: "Frozen Green Beans Bag", replacementCost: 1.50 }
      ]
    },
    free: {
      breakfast: {
        name: "Fluffy Buttermilk Pancakes with Caramelized Apples",
        time: "30 mins",
        desc: "Homemade fluffy buttermilk pancakes topped with sweet warm apples caramelized in cinnamon and brown sugar.",
        steps: ["Whisk 1 cup flour, 1 tbsp sugar, 1 tsp baking powder, 1/2 tsp baking soda, and a pinch of salt.", "Mix in 1 cup buttermilk, 1 egg, and 2 tbsp melted butter until just combined.", "Sauté 2 sliced apples with 2 tbsp butter, 2 tbsp brown sugar, and 1 tsp cinnamon until tender.", "Cook pancakes on a buttered griddle over medium heat until bubbles form, flip, and cook until golden.", "Stack pancakes and spoon warm caramelized apples and maple syrup over top."]
      },
      lunch: {
        name: "Gourmet Caprese Panini with Basil Pesto",
        time: "20 mins",
        desc: "Thick sourdough toasted with fresh mozzarella, sliced tomatoes, organic baby spinach, and rich basil pesto.",
        steps: ["Spread 1 tbsp basil pesto on two slices of sourdough bread.", "Layer thick slices of fresh mozzarella cheese and tomatoes on one slice. Add fresh basil leaves or spinach.", "Top with the second slice and brush the outside with olive oil.", "Toast in a skillet over medium heat, pressing down with a heavy pan, for 3-4 minutes per side until crispy."]
      },
      dinner: {
        name: "Slow-Simmered Beef Ragu over Pappardelle",
        time: "60 mins",
        desc: "Rich, slow-simmered beef chuck shoulder stewed in crushed tomatoes, red wine, and aromatics, served over wide egg noodles.",
        steps: ["Pat 1 lb of beef chuck dry and cut into large chunks. Season generously with salt and pepper.", "Sear beef in a Dutch oven with olive oil over high heat until browned on all sides, then remove.", "Sauté diced onion, carrot, celery, and garlic in the same pot for 5 minutes.", "Deglaze the pot with 1/2 cup red wine, scraping up browned bits. Add crushed tomatoes and rosemary.", "Return beef, cover, and simmer on low for 45 minutes until tender. Shred beef with forks.", "Boil pappardelle pasta, toss in the rich ragu sauce, and top with grated parmesan."]
      },
      grocery: [
        { id: "g41", name: "Buttermilk & Eggs", category: "Dairy/Other", cost: 3.50 },
        { id: "g42", name: "Fresh Crisp Gala Apples (3-pack)", category: "Produce", cost: 2.20 },
        { id: "g43", name: "Maple Syrup (8oz)", category: "Pantry", cost: 4.80 },
        { id: "g44", name: "Fresh Mozzarella Log (8oz)", category: "Dairy/Other", cost: 4.50 },
        { id: "g45", name: "Jarred Basil Pesto (6oz)", category: "Pantry", cost: 3.20 },
        { id: "g46", name: "Beef Chuck Roast (1 lb)", category: "Protein", cost: 11.00 },
        { id: "g47", name: "San Marzano Crushed Tomatoes", category: "Pantry", cost: 2.80 },
        { id: "g48", name: "Dry Pappardelle Pasta", category: "Pantry", cost: 2.50 },
        { id: "g49", name: "Parmigiano-Reggiano Block", category: "Dairy/Other", cost: 5.50 },
        { id: "g50", name: "Carrots, Celery & Red Wine (Cooking mini)", category: "Produce", cost: 4.50 }
      ],
      subs: [
        { originalId: "g46", originalName: "Beef Chuck Roast (1 lb)", replacementName: "Cremini Mushrooms (1 lb) & Lentils", replacementCost: 4.00 },
        { originalId: "g49", originalName: "Parmigiano-Reggiano Block", replacementName: "Grated Parmesan Canister", replacementCost: 2.50 },
        { originalId: "g43", originalName: "Maple Syrup (8oz)", replacementName: "Honey Squeeze Bottle", replacementCost: 2.20 }
      ]
    }
  },
  vegan: {
    busy: {
      breakfast: {
        name: "Turmeric Spiced Tofu Scramble Toast",
        time: "10 mins",
        desc: "Crumbled firm tofu sautéed with turmeric, nutritional yeast, and baby spinach served on toasted sourdough.",
        steps: ["Heat 1 tsp olive oil in a pan. Crumble 1/2 block of firm tofu directly into the skillet.", "Add 1/4 tsp turmeric, 1 tbsp nutritional yeast, salt, and pepper. Sauté for 5 minutes.", "Toss in a handful of fresh baby spinach and stir until wilted.", "Serve on toasted bread slices."]
      },
      lunch: {
        name: "Smashed Chickpea & Avocado Wrap",
        time: "10 mins",
        desc: "Creamy smashed chickpeas mixed with ripe avocado, lemon, and fresh greens inside a whole wheat tortilla.",
        steps: ["Drain and rinse 1/2 can of chickpeas. Mash them in a bowl with 1/2 ripe avocado.", "Add a squeeze of lemon juice, salt, pepper, and finely chopped celery or parsley.", "Lay a large tortilla flat, spread the chickpea mixture, top with fresh baby greens, and wrap tightly."]
      },
      dinner: {
        name: "15-Minute Sesame Garlic Peanut Noodles",
        time: "15 mins",
        desc: "Ramen or udon noodles tossed in a rich, velvety peanut butter, soy sauce, maple syrup, and chili garlic paste glaze.",
        steps: ["Boil noodles according to package instructions (about 5-6 mins).", "In a bowl, whisk 2 tbsp peanut butter, 1 tbsp soy sauce, 1 tsp maple syrup, 1/2 tsp chili garlic sauce, and 2 tbsp warm noodle water.", "Drain noodles, return to pot, and pour sauce over. Toss over low heat for 1 minute.", "Garnish with sliced green scallions and sesame seeds."]
      },
      grocery: [
        { id: "v1", name: "Firm Tofu Block (14oz)", category: "Protein", cost: 1.80 },
        { id: "v2", name: "Baby Spinach (5oz)", category: "Produce", cost: 2.50 },
        { id: "v3", name: "Canned Garbanzo Beans (Chickpeas)", category: "Pantry", cost: 0.90 },
        { id: "v4", name: "Hass Avocados (2-pack)", category: "Produce", cost: 2.50 },
        { id: "v5", name: "Whole Wheat Tortillas (8-pack)", category: "Pantry", cost: 2.20 },
        { id: "v6", name: "Ramen/Udon Noodles", category: "Pantry", cost: 1.50 },
        { id: "v7", name: "Creamy Peanut Butter (16oz)", category: "Pantry", cost: 2.80 },
        { id: "v8", name: "Soy Sauce & Chili Garlic Paste", category: "Pantry", cost: 3.50 },
        { id: "v9", name: "Scallions & Garlic", category: "Produce", cost: 1.20 }
      ],
      subs: [
        { originalId: "v7", originalName: "Creamy Peanut Butter (16oz)", replacementName: "Tahini Paste (8oz)", replacementCost: 3.80 },
        { originalId: "v4", originalName: "Hass Avocados (2-pack)", replacementName: "Hummus Tub (8oz)", replacementCost: 1.80 }
      ]
    },
    normal: {
      breakfast: {
        name: "Cinnamon Apple Steel-Cut Oatmeal",
        time: "20 mins",
        desc: "Hearty oats simmered with almond milk, grated apples, pecans, and topped with maple syrup.",
        steps: ["In a small saucepan, bring 1 cup of almond milk and 1/2 cup of water to a boil.", "Stir in 1/2 cup steel-cut oats, 1 grated red apple, 1/2 tsp cinnamon, and a pinch of salt.", "Reduce heat to low, cover, and simmer for 15 minutes, stirring occasionally, until thick.", "Serve topped with a handful of chopped pecans and a drizzle of pure maple syrup."]
      },
      lunch: {
        name: "Warm Quinoa Salad with Roasted Sweet Potato",
        time: "25 mins",
        desc: "Roasted cubed sweet potatoes tossed with fluffy warm quinoa, baby spinach, pumpkin seeds, and tahini dressing.",
        steps: ["Preheat oven or air-fryer to 400°F (200°C). Dice sweet potato into small cubes.", "Toss sweet potato in 1 tsp olive oil, salt, and pepper. Air fry or roast for 15 minutes until crispy.", "Boil 1/2 cup of quinoa in 1 cup of water for 12-14 minutes.", "Whisk 1 tbsp tahini, 1 tsp maple syrup, 1 tsp lemon juice, and 1 tbsp warm water to make dressing.", "Combine warm quinoa, spinach, sweet potatoes, and pumpkin seeds. Drizzle with dressing."]
      },
      dinner: {
        name: "Cozy Coconut Chickpea Curry",
        time: "30 mins",
        desc: "Creamy coconut milk stewed with chickpeas, diced sweet potatoes, baby spinach, ginger, and aromatic spices.",
        steps: ["Heat 1 tbsp oil in a deep pan. Sauté 1/2 diced onion, 1 tbsp minced ginger, and 2 cloves of garlic.", "Add 1 tbsp curry powder, 1/2 tsp cumin, and stir for 30 seconds to toast spices.", "Pour in 1 can of coconut milk and 1/2 cup vegetable broth. Add diced sweet potatoes.", "Bring to a simmer, cover, and cook for 15 minutes until potatoes are tender.", "Stir in drained chickpeas and fresh spinach. Simmer for 5 minutes until spinach is wilted. Serve with rice."]
      },
      grocery: [
        { id: "v21", name: "Steel-Cut Oats Box", category: "Pantry", cost: 3.20 },
        { id: "v22", name: "Almond Milk Carton (Half-Gal)", category: "Dairy/Other", cost: 2.80 },
        { id: "v23", name: "Gala Apples & Sweet Potatoes", category: "Produce", cost: 3.00 },
        { id: "v24", name: "Pecan Halves (4oz)", category: "Pantry", cost: 4.00 },
        { id: "v25", name: "White Quinoa Bag (12oz)", category: "Pantry", cost: 3.50 },
        { id: "v26", name: "Tahini Sesame Paste (8oz)", category: "Pantry", cost: 3.80 },
        { id: "v27", name: "Canned Coconut Milk (Full-Fat)", category: "Pantry", cost: 2.00 },
        { id: "v28", name: "Garbanzo Beans (2 cans)", category: "Pantry", cost: 1.80 },
        { id: "v29", name: "Basmati Rice Bag (32oz)", category: "Pantry", cost: 2.50 },
        { id: "v30", name: "Fresh Onion, Ginger & Garlic", category: "Produce", cost: 1.80 }
      ],
      subs: [
        { originalId: "v24", originalName: "Pecan Halves (4oz)", replacementName: "Sunflower Seeds (6oz)", replacementCost: 1.80 },
        { originalId: "v26", originalName: "Tahini Sesame Paste (8oz)", replacementName: "Creamy Peanut Butter", replacementCost: 2.50 },
        { originalId: "v22", originalName: "Almond Milk Carton (Half-Gal)", replacementName: "Oat Milk Carton (Half-Gal)", replacementCost: 3.50 }
      ]
    },
    free: {
      breakfast: {
        name: "Baked Cinnamon Berry Oatmeal Casserole",
        time: "40 mins",
        desc: "Warm baked oats blended with ripe bananas, almond milk, cinnamon, and loaded with blueberries and walnuts.",
        steps: ["Preheat oven to 375°F (190°C). Grease an 8x8 inch baking dish.", "Mash 2 ripe bananas in a bowl. Whisk in 1.5 cups almond milk, 2 tbsp maple syrup, and 1 tsp vanilla.", "Stir in 2 cups rolled oats, 1 tsp cinnamon, 1 tsp baking powder, and a pinch of salt.", "Gently fold in 1 cup of fresh blueberries and 1/2 cup chopped walnuts.", "Pour into dish and bake for 30 minutes until set and golden brown on top."]
      },
      lunch: {
        name: "Ultimate Smoky Tempeh Club Sandwich",
        time: "30 mins",
        desc: "Crispy maple-soy marinated tempeh strips layered with avocado, tomatoes, butter lettuce, and vegan garlic aioli.",
        steps: ["Slice 8oz tempeh into thin strips.", "Whisk 1 tbsp soy sauce, 1 tsp maple syrup, 1/2 tsp smoked paprika, and 1 tsp olive oil. Toss tempeh in marinade.", "Pan-fry tempeh strips in a skillet over medium heat for 4-5 minutes per side until crispy.", "Toast 3 slices of rustic bread. Spread vegan garlic aioli on slices.", "Build double-decker sandwich with crispy tempeh, avocado slices, tomato, and lettuce leaves."]
      },
      dinner: {
        name: "Simmered Lentil Bolognese over Fettuccine",
        time: "50 mins",
        desc: "Brown lentils slow-simmered in rich red wine marinara with minced celery, carrots, onions, and topped with walnut parmesan.",
        steps: ["Heat 1 tbsp olive oil in a pot. Sauté finely minced onion, carrot, and celery for 7-8 minutes.", "Stir in 2 cloves minced garlic, 1 tbsp tomato paste, and cook for 1 minute.", "Add 1/2 cup brown lentils (rinsed) and 1/4 cup red wine. Simmer until wine reduces by half.", "Pour in 1 jar (24oz) marinara sauce and 1 cup vegetable broth. Cover and simmer on low for 30-35 minutes.", "Boil fettuccine pasta in salted water. Drain and toss with lentil bolognese.", "Garnish with blended walnuts and nutritional yeast ('walnut parmesan')."]
      },
      grocery: [
        { id: "v41", name: "Rolled Oats (32oz)", category: "Pantry", cost: 3.00 },
        { id: "v42", name: "Bananas & Fresh Blueberries", category: "Produce", cost: 4.50 },
        { id: "v43", name: "Walnut Halves (8oz)", category: "Pantry", cost: 5.50 },
        { id: "v44", name: "Organic Tempeh Block (8oz)", category: "Protein", cost: 3.50 },
        { id: "v45", name: "Avocado & Roma Tomatoes", category: "Produce", cost: 3.20 },
        { id: "v46", name: "Rustic Sliced Sourdough", category: "Pantry", cost: 4.50 },
        { id: "v47", name: "Vegan Mayonnaise Tub (8oz)", category: "Dairy/Other", cost: 3.80 },
        { id: "v48", name: "Brown Lentils Dry Bag", category: "Pantry", cost: 1.50 },
        { id: "v49", name: "Premium Marinara Jar (24oz)", category: "Pantry", cost: 4.50 },
        { id: "v50", name: "Dry Fettuccine Pasta (16oz)", category: "Pantry", cost: 1.80 }
      ],
      subs: [
        { originalId: "v44", originalName: "Organic Tempeh Block (8oz)", replacementName: "Extra Firm Tofu Block", replacementCost: 1.80 },
        { originalId: "v49", originalName: "Premium Marinara Jar (24oz)", replacementName: "Canned Crushed Tomatoes", replacementCost: 1.50 },
        { originalId: "v47", originalName: "Vegan Mayonnaise Tub (8oz)", replacementName: "Hummus Tub", replacementCost: 2.00 }
      ]
    }
  },
  "high-protein": {
    busy: {
      breakfast: {
        name: "Fast Berry Whey Protein Shake & Eggs",
        time: "10 mins",
        desc: "A rich protein shake paired with two hard-boiled eggs for an immediate high-protein morning start.",
        steps: ["Blend 1 scoop of whey protein powder, 1 cup milk, and 1/2 cup frozen berries until smooth.", "Peel and slice 2 pre-boiled eggs, seasoning with salt and pepper."]
      },
      lunch: {
        name: "Double Turkey & Swiss High-Protein Wrap",
        time: "10 mins",
        desc: "Over 6oz of smoked turkey breast, Swiss cheese, spinach, and Greek yogurt mustard dressing wrapped in a high-fiber tortilla.",
        steps: ["Mix 1 tbsp plain Greek yogurt with 1 tsp Dijon mustard.", "Lay out 1 large high-fiber flatbread, spread the dressing.", "Layer 6-8 slices of deli turkey breast and 2 slices of Swiss cheese.", "Roll tightly with baby spinach and sliced cucumber."]
      },
      dinner: {
        name: "Garlic Herb Seared Chicken Breast & Broccoli",
        time: "15 mins",
        desc: "Quick-tenderized thin chicken breast fillets seared in a hot pan and served with steamed garlic broccoli.",
        steps: ["Cut 1 large chicken breast horizontally to make thin cutlets. Season with garlic herb blend, salt, and olive oil.", "Heat a pan over medium-high heat. Sear chicken for 3-4 minutes per side until fully cooked.", "Place fresh broccoli florets in a microwave-safe bowl with 2 tbsp water, cover, and microwave on high for 3 minutes.", "Drain broccoli, toss with 1 tsp olive oil, salt, and garlic powder. Serve with seared chicken."]
      },
      grocery: [
        { id: "hp1", name: "Whey Protein Powder (Single Scoop packet)", category: "Pantry", cost: 2.00 },
        { id: "hp2", name: "Whole Milk Carton (Quart)", category: "Dairy/Other", cost: 2.00 },
        { id: "hp3", name: "Large Grade-A Eggs", category: "Dairy/Other", cost: 3.50 },
        { id: "hp4", name: "Deli Turkey Breast (1 lb)", category: "Protein", cost: 9.00 },
        { id: "hp5", name: "Sliced Swiss Cheese (8oz)", category: "Dairy/Other", cost: 3.50 },
        { id: "hp6", name: "High-Fiber Flatbread Wraps", category: "Pantry", cost: 3.20 },
        { id: "hp7", name: "Plain Greek Yogurt (Single serving cup)", category: "Dairy/Other", cost: 1.50 },
        { id: "hp8", name: "Boneless Chicken Breasts (1.5 lbs)", category: "Protein", cost: 9.50 },
        { id: "hp9", name: "Fresh Broccoli Crowns (2)", category: "Produce", cost: 2.50 }
      ],
      subs: [
        { originalId: "hp8", originalName: "Boneless Chicken Breasts (1.5 lbs)", replacementName: "Firm Tofu Block (2 blocks)", replacementCost: 3.60 },
        { originalId: "hp4", originalName: "Deli Turkey Breast (1 lb)", replacementName: "Canned Tuna (3 cans)", replacementCost: 3.00 }
      ]
    },
    normal: {
      breakfast: {
        name: "Egg White Veggie Scramble & Turkey Bacon",
        time: "15 mins",
        desc: "A massive egg white scramble cooked with baby spinach, tomatoes, and mushrooms, served with 3 strips of crispy turkey bacon.",
        steps: ["Heat a non-stick pan over medium heat. Cook 3 strips of turkey bacon for 3-4 minutes per side until crispy.", "Pour 1 cup of liquid egg whites into the pan. Toss in sliced mushrooms, cherry tomatoes, and spinach.", "Scramble everything for 5 minutes until egg whites are firm and cooked through.", "Serve hot alongside turkey bacon."]
      },
      lunch: {
        name: "Zesty Canned Tuna Avocado Salad Bowls",
        time: "15 mins",
        desc: "High-protein chunk light tuna flakes tossed with avocado mash, diced cucumbers, onions, and squeeze of lemon, served over spinach.",
        steps: ["Drain 2 cans of chunk light tuna. Flake with a fork in a bowl.", "Mash in 1/2 avocado, 1 tsp Dijon mustard, and a squeeze of fresh lemon juice.", "Fold in finely diced cucumber and red onion.", "Serve tuna salad inside avocado skins or over a bed of baby spinach."]
      },
      dinner: {
        name: "High-Protein Beef & Edamame Stir-Fry",
        time: "25 mins",
        desc: "Lean ground beef stir-fried with shelled edamame, bell peppers, broccoli, and a low-sodium teriyaki glaze over brown rice.",
        steps: ["Cook 1 cup of instant brown rice according to package directions.", "In a large skillet, brown 1 lb of lean ground beef over medium-high heat. Drain excess fat.", "Add chopped bell pepper, broccoli florets, and 1/2 cup of shelled edamame to the beef.", "Stir-fry for 6-8 minutes until vegetables are tender-crisp.", "Drizzle 3 tbsp of teriyaki sauce over the beef stir-fry and toss. Serve over warm brown rice."]
      },
      grocery: [
        { id: "hp21", name: "Turkey Bacon Pack", category: "Protein", cost: 4.50 },
        { id: "hp22", name: "Liquid Egg Whites Carton (32oz)", category: "Dairy/Other", cost: 5.50 },
        { id: "hp23", name: "Canned Chunk Light Tuna (3 cans)", category: "Protein", cost: 3.60 },
        { id: "hp24", name: "Avocado, Cucumber & Lemon", category: "Produce", cost: 3.20 },
        { id: "hp25", name: "Lean Ground Beef 93/7 (1 lb)", category: "Protein", cost: 7.50 },
        { id: "hp26", name: "Shelled Edamame Bag (Frozen)", category: "Protein", cost: 2.80 },
        { id: "hp27", name: "Bell Peppers & Broccoli Crown", category: "Produce", cost: 3.00 },
        { id: "hp28", name: "Low-Sodium Teriyaki Sauce", category: "Pantry", cost: 2.50 },
        { id: "hp29", name: "Instant Brown Rice Box", category: "Pantry", cost: 2.20 }
      ],
      subs: [
        { originalId: "hp25", originalName: "Lean Ground Beef 93/7 (1 lb)", replacementName: "Lean Ground Turkey (1 lb)", replacementCost: 4.80 },
        { originalId: "hp22", originalName: "Liquid Egg Whites Carton (32oz)", replacementName: "Large Whole Eggs (1 dozen)", replacementCost: 3.50 }
      ]
    },
    free: {
      breakfast: {
        name: "Egg White Oats & Greek Yogurt Bowl Combo",
        time: "25 mins",
        desc: "Oatmeal cooked with egg whites folded in for extra volume and protein, topped with peanut butter, paired with a Greek yogurt cup.",
        steps: ["Bring 1 cup water and 1/2 cup rolled oats to a boil. Reduce heat to medium.", "Slowly pour in 1/2 cup liquid egg whites, whisking vigorously to prevent scrambling.", "Cook for 3 minutes until voluminous and creamy. Stir in 1 tbsp peanut butter and cinnamon.", "Serve bowl hot, alongside 1 cup of plain Greek yogurt topped with a few fresh berries."]
      },
      lunch: {
        name: "Meal-Prep Lemon Herb Chicken & Quinoa Bowls",
        time: "35 mins",
        desc: "Herb-marinated chicken breast baked and served over protein-packed quinoa with roasted asparagus.",
        steps: ["Preheat oven to 400°F (200°C). Season 1.5 lbs chicken breasts with olive oil, lemon juice, oregano, salt, and pepper.", "Rinse and boil 1 cup of quinoa in 2 cups of water for 15 minutes.", "Toss asparagus spears in olive oil, salt, and pepper.", "Bake chicken and asparagus on a sheet pan for 20 minutes until chicken reaches 165°F.", "Slice chicken and partition into bowls with quinoa and asparagus."]
      },
      dinner: {
        name: "Thick Sirloin Steak with Sweet Potato & Green Beans",
        time: "40 mins",
        desc: "Seared lean sirloin steak with garlic butter, served with a baked sweet potato and sautéed fresh green beans.",
        steps: ["Wash sweet potato, poke holes with a fork, and microwave on high for 7-8 minutes until soft.", "Season sirloin steak generously with salt, pepper, and garlic powder.", "Heat a cast-iron skillet over high heat until smoking. Sear steak for 3-4 minutes per side for medium-rare.", "In the last minute, add 1 tbsp butter and garlic to the pan, basting the steak. Let it rest for 5 minutes.", "Sauté green beans in the steak drippings for 4 minutes. Serve steak with sweet potato and green beans."]
      },
      grocery: [
        { id: "hp41", name: "Rolled Oats & Peanut Butter", category: "Pantry", cost: 4.80 },
        { id: "hp42", name: "Greek Yogurt (32oz)", category: "Dairy/Other", cost: 4.50 },
        { id: "hp43", name: "Boneless Chicken Breasts (1.5 lbs)", category: "Protein", cost: 9.50 },
        { id: "hp44", name: "Organic Quinoa Bag", category: "Pantry", cost: 3.80 },
        { id: "hp45", name: "Asparagus Bunch & Lemons", category: "Produce", cost: 4.00 },
        { id: "hp46", name: "Lean Top Sirloin Steaks (1 lb)", category: "Protein", cost: 14.50 },
        { id: "hp47", name: "Sweet Potatoes (3-pack)", category: "Produce", cost: 2.50 },
        { id: "hp48", name: "Fresh Green Beans Bag", category: "Produce", cost: 2.20 }
      ],
      subs: [
        { originalId: "hp46", originalName: "Lean Top Sirloin Steaks (1 lb)", replacementName: "Pork Tenderloin (1.5 lbs)", replacementCost: 6.50 },
        { originalId: "hp43", originalName: "Boneless Chicken Breasts (1.5 lbs)", replacementName: "Canned Salmon (4 cans)", replacementCost: 7.00 }
      ]
    }
  },
  keto: {
    busy: {
      breakfast: {
        name: "Quick Bulletproof Coffee & Bacon Eggs",
        time: "10 mins",
        desc: "High fat, zero carb start: rich butter coffee paired with microwaved crispy bacon and scrambles.",
        steps: ["Brew 1 mug of hot coffee. Blend or whisk in 1 tbsp unsalted butter and 1 tbsp coconut oil until frothy.", "Scramble 3 large eggs in a pan with butter. Microwave 3 bacon strips for 3 minutes until crisp."]
      },
      lunch: {
        name: "Keto Italian Meat & Cheese Roll-ups",
        time: "10 mins",
        desc: "No bread wrap: thick slices of provolone cheese wrapped around salami, pepperoni, and spinach, dipped in olive oil.",
        steps: ["Lay out 4 slices of provolone cheese flat.", "Layer 3 slices of Genoa salami and 4 slices of pepperoni on each.", "Top with a few leaves of spinach and roll up tightly. Serve with a side of olive oil and red wine vinegar for dipping."]
      },
      dinner: {
        name: "Pan-Seared Salmon Fillet & Avocado Salsa",
        time: "15 mins",
        desc: "Rich, healthy fat-packed dinner: crispy skin salmon seared in olive oil topped with chunky avocado lime salsa.",
        steps: ["Pat salmon fillet dry and season with salt and pepper.", "Sear salmon skin-side down in a hot oil skillet for 4 minutes, flip and cook for 3 minutes. Remove to plate.", "Dice 1 avocado and mix with chopped cilantro, lime juice, and a pinch of salt.", "Spoon avocado salsa over the warm salmon fillet."]
      },
      grocery: [
        { id: "k1", name: "Grass-Fed Unsalted Butter", category: "Dairy/Other", cost: 3.50 },
        { id: "k2", name: "Bacon Strips Pack", category: "Protein", cost: 5.00 },
        { id: "k3", name: "Large Grade-A Eggs", category: "Dairy/Other", cost: 3.50 },
        { id: "k4", name: "Sliced Provolone Cheese (8oz)", category: "Dairy/Other", cost: 3.50 },
        { id: "k5", name: "Deli Genoa Salami & Pepperoni", category: "Protein", cost: 6.00 },
        { id: "k6", name: "Salmon Fillets (2 portions)", category: "Protein", cost: 14.00 },
        { id: "k7", name: "Avocados, Cilantro & Lime", category: "Produce", cost: 3.50 }
      ],
      subs: [
        { originalId: "k6", originalName: "Salmon Fillets (2 portions)", replacementName: "Chicken Thighs (1.5 lbs)", replacementCost: 5.50 },
        { originalId: "k2", originalName: "Bacon Strips Pack", replacementName: "Canned Sardines (3 cans)", replacementCost: 3.00 }
      ]
    },
    normal: {
      breakfast: {
        name: "Keto Avocado Egg Boats",
        time: "20 mins",
        desc: "Hass avocado halves baked with an egg cracked in the center, topped with cheddar cheese and crumbled bacon.",
        steps: ["Preheat oven or toaster oven to 400°F (200°C).", "Cut avocado in half and remove the pit. Scoop out a small spoon of flesh to make the hole larger.", "Place avocado halves on a baking sheet. Crack 1 egg into each hole.", "Bake for 12-15 minutes until egg whites are set. Top with shredded cheddar and pre-cooked crumbled bacon."]
      },
      lunch: {
        name: "Creamy Chicken Salad Lettuce Boats",
        time: "15 mins",
        desc: "Shredded chicken breast mixed with rich mayonnaise, celery, walnuts, and served inside crisp butter lettuce cups.",
        steps: ["Combine 1 cup shredded cooked chicken with 3 tbsp mayonnaise, 1 tsp Dijon mustard, salt, and pepper.", "Fold in finely chopped celery and walnuts.", "Spoon chicken salad into washed romaine or butter lettuce leaves and enjoy."]
      },
      dinner: {
        name: "Garlic Butter Steak Bites & Zucchini Noodles",
        time: "25 mins",
        desc: "Sirloin beef cubed and seared in garlic butter, tossed with fresh spiralized zucchini noodles.",
        steps: ["Cut 1 lb sirloin steak into bite-sized cubes. Season with salt, pepper, and garlic powder.", "Heat 1 tbsp oil in a skillet over high heat. Sear steak bites for 2 minutes per side until browned. Remove steak.", "Reduce heat to medium, melt 2 tbsp butter in the same pan. Add 3 minced garlic cloves.", "Add spiralized zucchini noodles (zoodles) to the pan and toss for 2 minutes until just tender.", "Return steak bites to the pan, toss with the garlic butter and zoodles, and serve hot."]
      },
      grocery: [
        { id: "k21", name: "Fresh Hass Avocados (2-pack)", category: "Produce", cost: 2.50 },
        { id: "k22", name: "Grade-A Eggs & Cheddar Cheese", category: "Dairy/Other", cost: 5.00 },
        { id: "k23", name: "Shredded Chicken Breast (cooked 12oz)", category: "Protein", cost: 6.00 },
        { id: "k24", name: "Real Mayonnaise Jar (12oz)", category: "Pantry", cost: 3.00 },
        { id: "k25", name: "Butter Lettuce Heads & Celery", category: "Produce", cost: 3.20 },
        { id: "k26", name: "Top Sirloin Steak (1 lb)", category: "Protein", cost: 14.50 },
        { id: "k27", name: "Fresh Zucchini Noodles (Zoodles)", category: "Produce", cost: 3.50 },
        { id: "k28", name: "Salted Butter Block", category: "Dairy/Other", cost: 3.00 }
      ],
      subs: [
        { originalId: "k26", originalName: "Top Sirloin Steak (1 lb)", replacementName: "Boneless Pork Chops (1.5 lbs)", replacementCost: 5.80 },
        { originalId: "k23", originalName: "Shredded Chicken Breast (cooked 12oz)", replacementName: "Canned Canned Tuna (3 cans)", replacementCost: 3.60 }
      ]
    },
    free: {
      breakfast: {
        name: "Baked Bacon, Spinach & Feta Frittata",
        time: "35 mins",
        desc: "A rich, fluffy egg frittata baked with bacon, fresh spinach, heavy cream, and crumbled feta cheese.",
        steps: ["Preheat oven to 375°F (190°C). Grease an oven-safe skillet or pie dish.", "Sauté 4 chopped bacon strips in a pan until crispy. Remove bacon, leave 1 tsp fat in pan.", "Sauté spinach in the bacon fat for 2 minutes until wilted.", "Whisk 8 eggs with 1/4 cup heavy cream, salt, pepper, and garlic powder.", "Pour egg mixture into the dish, stir in bacon, spinach, and 1/2 cup crumbled feta.", "Bake for 20-25 minutes until eggs are set in the center and golden on top."]
      },
      lunch: {
        name: "Keto Cobb Salad with Garlic Aioli Dressing",
        time: "20 mins",
        desc: "Layered hard-boiled eggs, bacon crumbs, grilled chicken, blue cheese, and avocado over mixed greens in garlic aioli.",
        steps: ["In a large bowl, create a base of mixed salad greens.", "Arrange rows of sliced hard-boiled eggs, cooked chicken, crumbled bacon, blue cheese, and diced avocado.", "Whisk 2 tbsp mayo, 1 tsp olive oil, minced garlic, and lemon juice to make dressing.", "Drizzle dressing over the salad and toss gently."]
      },
      dinner: {
        name: "Creamy Tuscan Garlic Chicken Thighs",
        time: "45 mins",
        desc: "Bone-in chicken thighs pan-seared until crispy, then simmered in a rich cream sauce with garlic, spinach, and sun-dried tomatoes.",
        steps: ["Season chicken thighs with salt, pepper, and Italian seasoning.", "Sear chicken in a deep pan with olive oil over medium-high heat for 6-8 minutes per side. Remove chicken.", "Add minced garlic and sliced sun-dried tomatoes to the pan, sautéing for 1 minute.", "Pour in 1/2 cup chicken broth and 3/4 cup heavy cream. Bring to a simmer.", "Add baby spinach leaves and simmer until wilted. Return chicken thighs to the sauce.", "Simmer on low for 15-20 minutes until chicken is fully cooked and sauce is thick. Serve hot."]
      },
      grocery: [
        { id: "k41", name: "Bacon Strips Pack", category: "Protein", cost: 5.00 },
        { id: "k42", name: "Heavy Whipping Cream Pint", category: "Dairy/Other", cost: 2.80 },
        { id: "k43", name: "Feta & Blue Cheese Crumbles", category: "Dairy/Other", cost: 5.50 },
        { id: "k44", name: "Large Grade-A Eggs", category: "Dairy/Other", cost: 3.50 },
        { id: "k45", name: "Boneless Chicken Thighs (1.5 lbs)", category: "Protein", cost: 6.80 },
        { id: "k46", name: "Baby Spinach & Mixed Salad Greens", category: "Produce", cost: 4.50 },
        { id: "k47", name: "Sun-Dried Tomatoes Jar (6oz)", category: "Pantry", cost: 3.20 },
        { id: "k48", name: "Avocado & Fresh Garlic", category: "Produce", cost: 2.00 }
      ],
      subs: [
        { originalId: "k47", originalName: "Sun-Dried Tomatoes Jar (6oz)", replacementName: "Fresh Cherry Tomatoes (1 pint)", replacementCost: 2.00 },
        { originalId: "k43", originalName: "Feta & Blue Cheese Crumbles", replacementName: "Shredded Mozzarella Cheese", replacementCost: 3.00 }
      ]
    }
  },
  "gluten-free": {
    busy: {
      breakfast: {
        name: "Gluten-Free Oats & Berry Cup",
        time: "5 mins",
        desc: "Certified gluten-free rolled oats cooked instantly and topped with fresh berries, walnuts, and coconut flakes.",
        steps: ["Combine 1/2 cup certified gluten-free oats with 1 cup water/milk in a microwave-safe bowl.", "Microwave on high for 2 minutes.", "Stir in 1 tbsp maple syrup, 1/2 cup fresh berries, and 2 tbsp walnuts."]
      },
      lunch: {
        name: "Gluten-Free Turkey & Cheddar Rice Cake Stack",
        time: "10 mins",
        desc: "Crisp brown rice cakes stacked with smoked turkey breast slices, cheddar cheese, sliced tomato, and mustard.",
        steps: ["Lay out 3 crisp brown rice cakes.", "Spread Dijon mustard lightly on each.", "Stack 2 slices of deli turkey breast, 1 slice of cheddar, and 1 slice of tomato on each rice cake.", "Season with black pepper and eat immediately while crispy."]
      },
      dinner: {
        name: "15-Minute Ground Turkey & Rice Bowl",
        time: "15 mins",
        desc: "Lean ground turkey cooked with tamari (gluten-free soy sauce), ginger, and garlic, served over instant jasmine rice.",
        steps: ["Cook 1 cup of instant jasmine rice according to package directions.", "Heat 1 tsp oil in a pan. Brown 1 lb ground turkey over medium-high heat until fully cooked.", "Add 2 tbsp tamari, 1 tsp sesame oil, minced garlic, and ginger. Cook for 2 more minutes.", "Serve ground turkey over warm jasmine rice and top with sliced green onions."]
      },
      grocery: [
        { id: "gf1", name: "Certified Gluten-Free Oats", category: "Pantry", cost: 3.80 },
        { id: "gf2", name: "Fresh Blueberries & Strawberries", category: "Produce", cost: 5.00 },
        { id: "gf3", name: "Brown Rice Cakes Pack", category: "Pantry", cost: 2.20 },
        { id: "gf4", name: "Deli Turkey Breast (1/2 lb)", category: "Protein", cost: 6.00 },
        { id: "gf5", name: "Cheddar Cheese Slices", category: "Dairy/Other", cost: 3.00 },
        { id: "gf6", name: "Lean Ground Turkey (1 lb)", category: "Protein", cost: 5.50 },
        { id: "gf7", name: "Gluten-Free Tamari Soy Sauce", category: "Pantry", cost: 3.20 },
        { id: "gf8", name: "Instant Jasmine Rice Box", category: "Pantry", cost: 2.00 },
        { id: "gf9", name: "Fresh Scallions & Ginger", category: "Produce", cost: 1.50 }
      ],
      subs: [
        { originalId: "gf4", originalName: "Deli Turkey Breast (1/2 lb)", replacementName: "Canned Canned Tuna (3 cans)", replacementCost: 3.60 },
        { originalId: "gf7", originalName: "Gluten-Free Tamari Soy Sauce", replacementName: "Low-Sodium Soy Sauce (Contains Gluten)", replacementCost: 2.20 }
      ]
    },
    normal: {
      breakfast: {
        name: "Gluten-Free Sweet Potato Breakfast Hash",
        time: "20 mins",
        desc: "Sautéed sweet potato cubes, bell peppers, and onions cooked crispy in a skillet, topped with 2 fried eggs.",
        steps: ["Peel and dice 1 sweet potato into small cubes. Dice onions and green bell peppers.", "Heat 1 tbsp oil in a skillet over medium heat. Sauté sweet potato cubes for 10 minutes until softening.", "Add peppers and onions, cooking for 5 more minutes until everything is lightly browned.", "Push potatoes to the side, crack 2 eggs directly in the pan, and fry until whites are set. Serve hot."]
      },
      lunch: {
        name: "Mexican Chicken & Black Bean Quinoa Salad",
        time: "20 mins",
        desc: "Quinoa salad tossed with shredded chicken, black beans, corn, lime, cilantro, and cumin vinaigrette.",
        steps: ["Boil 1/2 cup quinoa in 1 cup of water for 12-14 minutes.", "In a bowl, combine cooked quinoa, 1 cup shredded cooked chicken, 1/2 can black beans, and 1/2 cup corn kernels.", "Whisk 1 tbsp olive oil, 1 tbsp lime juice, 1/2 tsp cumin, salt, and pepper.", "Pour dressing over salad, toss with fresh chopped cilantro, and serve."]
      },
      dinner: {
        name: "Gluten-Free Lemon Herb Baked Cod & Asparagus",
        time: "30 mins",
        desc: "Cod fillets baked with butter, lemon juice, and herbs, served with roasted asparagus and baby red potatoes.",
        steps: ["Preheat oven to 400°F (200°C). Dice red potatoes into small quarters.", "Toss red potatoes in olive oil, salt, and rosemary. Bake on a sheet pan for 10 minutes first.", "Season cod fillets with salt, pepper, lemon juice, and 1 tbsp melted butter.", "Add cod and asparagus spears to the sheet pan next to red potatoes. Bake everything for an additional 12-15 minutes until cod flakes easily."]
      },
      grocery: [
        { id: "gf21", name: "Sweet Potatoes & Red Potatoes", category: "Produce", cost: 3.50 },
        { id: "gf22", name: "Green Peppers & Onions", category: "Produce", cost: 2.00 },
        { id: "gf23", name: "Large Grade-A Eggs", category: "Dairy/Other", cost: 3.50 },
        { id: "gf24", name: "White Quinoa Bag (12oz)", category: "Pantry", cost: 3.50 },
        { id: "gf25", name: "Shredded Chicken Breast (cooked 12oz)", category: "Protein", cost: 6.00 },
        { id: "gf26", name: "Canned Black Beans & Sweet Corn", category: "Pantry", cost: 1.80 },
        { id: "gf27", name: "Fresh Cod Fillets (2 portions)", category: "Protein", cost: 10.50 },
        { id: "gf28", name: "Asparagus Bunch & Lemons", category: "Produce", cost: 4.00 }
      ],
      subs: [
        { originalId: "gf27", originalName: "Fresh Cod Fillets (2 portions)", replacementName: "Tilapia Fillets (2 portions)", replacementCost: 5.50 },
        { originalId: "gf25", originalName: "Shredded Chicken Breast (cooked 12oz)", replacementName: "Canned Chickpeas (2 cans)", replacementCost: 1.60 }
      ]
    },
    free: {
      breakfast: {
        name: "Fluffy Gluten-Free Almond Flour Pancakes",
        time: "30 mins",
        desc: "Golden-brown pancakes made from almond flour, eggs, and maple syrup, topped with caramelized bananas.",
        steps: ["In a bowl, whisk 1 cup almond flour, 2 eggs, 1/4 cup almond milk, 1 tbsp maple syrup, and 1 tsp baking powder.", "Heat 1 tsp coconut oil or butter in a skillet over medium-low heat.", "Pour batter in small circles. Cook for 3-4 minutes until small bubbles form, flip, and cook for 2 minutes.", "Slice a banana. Sauté banana slices in a pan with 1 tsp maple syrup for 2 minutes until caramelized.", "Top pancakes with caramelized bananas and warm syrup."]
      },
      lunch: {
        name: "Gourmet GF Turkey & Avocado Club Salad",
        time: "20 mins",
        desc: "Mixed spring greens with thick turkey breast slices, bacon bits, hard-boiled eggs, avocado slices, and honey mustard.",
        steps: ["Hard boil 2 eggs. Let cool, peel, and slice.", "Cook 3 strips of bacon in a pan until crispy, then crumble.", "Create a bed of spring greens in a bowl. Layer sliced deli turkey, hard-boiled eggs, bacon, and diced avocado.", "Drizzle with a simple gluten-free honey mustard dressing."]
      },
      dinner: {
        name: "Gluten-Free Beef & Vegetable Shepherds Pie",
        time: "55 mins",
        desc: "Ground beef cooked with carrots and peas in rich gluten-free gravy, baked under a layer of creamy garlic mashed potatoes.",
        steps: ["Peel and chop 4 large russet potatoes. Boil in water for 15 minutes until soft. Drain and mash with butter and milk.", "In a skillet, brown 1 lb ground beef with diced onion, celery, and garlic.", "Add 1 cup carrots and peas, 1 tbsp cornstarch (dissolved in 1 cup beef broth), and 1 tbsp GF tamari.", "Simmer for 10 minutes until gravy thickens.", "Pour meat mixture into a baking dish. Spread mashed potatoes on top.", "Bake at 400°F (200°C) for 25 minutes until the mashed potatoes are golden brown on top."]
      },
      grocery: [
        { id: "gf41", name: "Almond Flour Bag (8oz)", category: "Pantry", cost: 6.50 },
        { id: "gf42", name: "Bananas & Russet Potatoes (5 lbs)", category: "Produce", cost: 4.20 },
        { id: "gf43", name: "Large Eggs & Salted Butter", category: "Dairy/Other", cost: 6.50 },
        { id: "gf44", name: "Deli Sliced Turkey Breast (1/2 lb)", category: "Protein", cost: 6.00 },
        { id: "gf45", name: "Bacon Strips Pack", category: "Protein", cost: 5.00 },
        { id: "gf46", name: "Avocado & Spring Salad Greens", category: "Produce", cost: 3.50 },
        { id: "gf47", name: "Lean Ground Beef (1 lb)", category: "Protein", cost: 7.50 },
        { id: "gf48", name: "Frozen Peas & Carrots Bag", category: "Produce", cost: 1.50 },
        { id: "gf49", name: "Beef Broth & Cornstarch", category: "Pantry", cost: 2.20 }
      ],
      subs: [
        { originalId: "gf41", originalName: "Almond Flour Bag (8oz)", replacementName: "Gluten-Free 1-to-1 Flour Blend", replacementCost: 3.80 },
        { originalId: "gf47", originalName: "Lean Ground Beef (1 lb)", replacementName: "Brown Lentils Dry Bag", replacementCost: 1.50 }
      ]
    }
  }
};

// Fun cooking tips to cycle through in the sidebar
const COOKING_TIPS = [
  "Pre-measuring and preparing ingredients before you turn on the stove reduces stress and prevents overcooking.",
  "If you want crispy roasted vegetables or seared meat, dry them thoroughly with paper towels before cooking.",
  "Save your veggie scraps (onion skins, celery ends, carrot peels) in the freezer to make homemade vegetable stock.",
  "Store fresh herbs like bouquets in a glass of water in the fridge to keep them fresh for up to two weeks.",
  "Read the entire recipe before you start. It prevents surprises like 'marinate for 4 hours' when you're hungry."
];

// --- State Variables ---
let currentMealPlan = null;
let currentBudgetLimit = 25;
let isDarkMode = false;
let audioContext = null;

// --- Sound Synth Engine (Web Audio API) ---
function playChime(success = true) {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    const now = audioContext.currentTime;
    
    if (success) {
      // Pleasant chime sound (two ascending notes)
      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.12); // E5
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1046.50, now + 0.12); // C6
      
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioContext.destination);
      
      osc1.start(now);
      osc2.start(now + 0.12);
      
      osc1.stop(now + 0.4);
      osc2.stop(now + 0.4);
    } else {
      // Subdued warning note (for clearing or alert clicks)
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(329.63, now); // E4
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.25); // A3 slide down
      
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch (e) {
    console.warn("Audio Context not supported or allowed by browser user interaction policy.", e);
  }
}

// --- App Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  setupEventListeners();
  loadApiKey();
  cycleTips();
  
  // Set random tip intervals
  setInterval(cycleTips, 12000);
});

// --- Theme Management ---
function setupTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
    isDarkMode = true;
    updateThemeIcon();
  }
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = document.getElementById("theme-icon");
  if (isDarkMode) {
    // Sun icon
    icon.innerHTML = `<circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.07l1.42-1.42M18.36 5.64l1.42-1.42" />`;
  } else {
    // Moon icon
    icon.innerHTML = `<path class="moon-path" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />`;
  }
}

// --- API Configuration Panel ---
function loadApiKey() {
  const key = localStorage.getItem("gemini_key");
  if (key) {
    document.getElementById("gemini-api-key").value = key;
    document.getElementById("toggle-api-settings").classList.add("btn-primary");
    document.getElementById("toggle-api-settings").classList.remove("btn-secondary");
  }
}

function setupEventListeners() {
  // Theme Toggle
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
  
  // API Key Settings Modal
  const apiModal = document.getElementById("api-modal");
  document.getElementById("toggle-api-settings").addEventListener("click", () => {
    apiModal.classList.remove("hidden");
  });
  document.getElementById("close-api-settings").addEventListener("click", () => {
    apiModal.classList.add("hidden");
  });
  
  document.getElementById("save-api-key").addEventListener("click", () => {
    const key = document.getElementById("gemini-api-key").value.trim();
    if (key) {
      localStorage.setItem("gemini_key", key);
      document.getElementById("toggle-api-settings").classList.add("btn-primary");
      document.getElementById("toggle-api-settings").classList.remove("btn-secondary");
      apiModal.classList.add("hidden");
      playChime(true);
    }
  });
  
  document.getElementById("clear-api-key").addEventListener("click", () => {
    localStorage.removeItem("gemini_key");
    document.getElementById("gemini-api-key").value = "";
    document.getElementById("toggle-api-settings").classList.remove("btn-primary");
    document.getElementById("toggle-api-settings").classList.add("btn-secondary");
    apiModal.classList.add("hidden");
    playChime(false);
  });
  
  // Budget Slider Sync
  const budgetSlider = document.getElementById("budget-limit");
  const budgetValue = document.getElementById("budget-value");
  
  budgetSlider.addEventListener("input", (e) => {
    currentBudgetLimit = parseInt(e.target.value, 10);
    budgetValue.textContent = `$${currentBudgetLimit}`;
    
    // If a plan is loaded, update budget logic dynamically
    if (currentMealPlan) {
      currentMealPlan.budgetLimit = currentBudgetLimit;
      evaluateBudgetAndRender();
    }
  });
  
  // Generate Button Click
  document.getElementById("btn-generate").addEventListener("click", handleGeneration);
  
  // Empty State Presets Hookup
  document.querySelectorAll(".preset-tag").forEach(tag => {
    tag.addEventListener("click", (e) => {
      const diet = e.target.getAttribute("data-diet");
      const schedule = e.target.getAttribute("data-schedule");
      const budget = e.target.getAttribute("data-budget");
      
      document.getElementById("diet-select").value = diet;
      document.querySelector(`input[name="schedule"][value="${schedule}"]`).checked = true;
      document.getElementById("budget-limit").value = budget;
      
      currentBudgetLimit = parseInt(budget, 10);
      budgetValue.textContent = `$${budget}`;
      
      handleGeneration();
    });
  });
}

// Cycle sidebar tip
function cycleTips() {
  const container = document.getElementById("dynamic-tip");
  const randomTip = COOKING_TIPS[Math.floor(Math.random() * COOKING_TIPS.length)];
  container.style.opacity = 0;
  setTimeout(() => {
    container.textContent = randomTip;
    container.style.opacity = 1;
  }, 300);
}

// --- Main Plan Generation Router ---
async function handleGeneration() {
  const btn = document.getElementById("btn-generate");
  const spinner = btn.querySelector(".spinner");
  const btnText = btn.querySelector(".btn-text");
  
  // Form values
  const diet = document.getElementById("diet-select").value;
  const vibe = document.getElementById("vibe-select").value;
  const schedule = document.querySelector('input[name="schedule"]:checked').value;
  
  // Show loading state
  btn.disabled = true;
  spinner.classList.remove("hidden");
  btnText.textContent = "Synthesizing Menu Plan...";
  
  // Check if user has Gemini Key
  const apiKey = localStorage.getItem("gemini_key");
  
  try {
    if (apiKey) {
      // Generate with actual Live LLM call
      currentMealPlan = await generateGeminiPlan(apiKey, diet, schedule, vibe, currentBudgetLimit);
    } else {
      // Fallback: Local rule-based compiler
      currentMealPlan = generateLocalPlan(diet, schedule, vibe, currentBudgetLimit);
    }
    
    // Hide empty state, render results
    document.getElementById("results-empty").classList.add("hidden");
    document.getElementById("results-loaded").classList.remove("hidden");
    
    renderMealPlan();
    renderGroceryList();
    renderSubstitutions();
    evaluateBudgetAndRender();
    
    // Smooth scroll to results on small screens
    if (window.innerWidth <= 900) {
      document.getElementById("results-loaded").scrollIntoView({ behavior: 'smooth' });
    }
    
    playChime(true);
  } catch (error) {
    console.error("Meal planning compilation failed: ", error);
    alert(`Could not compile plan. Reason: ${error.message}. Defaulting back to local compiler.`);
    
    // Hard fallback to local plan
    currentMealPlan = generateLocalPlan(diet, schedule, vibe, currentBudgetLimit);
    document.getElementById("results-empty").classList.add("hidden");
    document.getElementById("results-loaded").classList.remove("hidden");
    
    renderMealPlan();
    renderGroceryList();
    renderSubstitutions();
    evaluateBudgetAndRender();
  } finally {
    // Restore button
    btn.disabled = false;
    spinner.classList.add("hidden");
    btnText.textContent = "Generate Culinary Plan";
  }
}

// --- Local AI Generation Method ---
function generateLocalPlan(diet, schedule, vibe, budget) {
  // Grab base recipes matching profile
  const baseProfile = RECIPE_DATABASE[diet] || RECIPE_DATABASE.standard;
  const recipeSet = baseProfile[schedule];
  
  // Make fresh copies so edits to costs/substitutions don't mutate DB
  const meals = JSON.parse(JSON.stringify(recipeSet));
  
  // Adjust base grocery cost according to vibe multipliers
  let costMultiplier = 1.0;
  if (vibe === "budget-saver") costMultiplier = 0.75;
  if (vibe === "comfort") costMultiplier = 1.15;
  if (vibe === "prep-friendly") costMultiplier = 0.90;
  
  const groceryList = recipeSet.grocery.map(item => {
    const rawCost = item.cost * costMultiplier;
    return {
      id: item.id,
      name: item.name,
      category: item.category,
      cost: Math.round(rawCost * 100) / 100,
      originalCost: Math.round(rawCost * 100) / 100,
      owned: false
    };
  });
  
  const substitutions = recipeSet.subs.map((sub, idx) => {
    // Find corresponding grocery item
    const matchingItem = groceryList.find(g => g.id === sub.originalId);
    let originalCost = matchingItem ? matchingItem.cost : 5.00;
    
    // Scale replacement cost according to multiplier
    let replacementCost = Math.round(sub.replacementCost * costMultiplier * 100) / 100;
    
    return {
      subId: `sub-${idx}`,
      originalId: sub.originalId,
      originalName: sub.originalName,
      replacementName: sub.replacementName,
      replacementCost: replacementCost,
      applied: false
    };
  });
  
  return {
    meals: {
      breakfast: meals.breakfast,
      lunch: meals.lunch,
      dinner: meals.dinner
    },
    groceryList: groceryList,
    substitutions: substitutions,
    budgetLimit: budget
  };
}

// --- Live Gemini API Integration ---
async function generateGeminiPlan(apiKey, diet, schedule, vibe, budget) {
  const prompt = `Generate a daily culinary meal plan (Breakfast, Lunch, Dinner), associated grocery list with itemized realistic prices, and direct ingredient substitutions.
  
  Constraints to match:
  - Diet preference: ${diet}
  - Schedule constraints: ${schedule} (Busy means quick 10-15m prep, Normal is 30m, Free is 45-60m preparation)
  - Vibe theme: ${vibe}
  - Budget Limit: $${budget}
  
  You must output a single, raw JSON object matching the schema. No markdown wrapping.
  Required JSON schema properties:
  - meals: {
      breakfast: { name, time, desc, steps: [string] },
      lunch: { name, time, desc, steps: [string] },
      dinner: { name, time, desc, steps: [string] }
    }
  - groceryList: Array of objects with properties: { id, name, category, cost } (where category is either "Produce", "Protein", "Pantry", or "Dairy/Other", cost is number representing dollars. Ensure the total sum of costs roughly correlates with the budget limit or fits standard grocery pricing. Provide 8 to 12 items).
  - substitutions: Array of objects with properties: { originalId, originalName, replacementName, replacementCost } (where replacementCost is a cheaper number than originalCost to help cut budgets, mapping back to a groceryList item id).
  `;
  
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }
  
  const resultData = await response.json();
  const text = resultData.candidates[0].content.parts[0].text;
  
  // Clean JSON wrap in case formatting was injected
  const cleanJson = text.replace(/^```json/, "").replace(/```$/, "").trim();
  const parsed = JSON.parse(cleanJson);
  
  // Decorate response with required tracking flags
  const groceryList = parsed.groceryList.map((item, idx) => ({
    id: item.id || `g-gemini-${idx}`,
    name: item.name,
    category: item.category || "Pantry",
    cost: Number(item.cost),
    originalCost: Number(item.cost),
    owned: false
  }));
  
  const substitutions = (parsed.substitutions || []).map((sub, idx) => ({
    subId: `sub-gemini-${idx}`,
    originalId: sub.originalId || "",
    originalName: sub.originalName,
    replacementName: sub.replacementName,
    replacementCost: Number(sub.replacementCost),
    applied: false
  }));
  
  return {
    meals: parsed.meals,
    groceryList: groceryList,
    substitutions: substitutions,
    budgetLimit: budget
  };
}

// --- Render Functions ---
function renderMealPlan() {
  const m = currentMealPlan.meals;
  
  // Breakfast
  document.getElementById("breakfast-name").textContent = m.breakfast.name;
  document.getElementById("breakfast-time").textContent = m.breakfast.time;
  document.getElementById("breakfast-desc").textContent = m.breakfast.desc;
  
  const bSteps = document.getElementById("breakfast-steps");
  bSteps.innerHTML = "";
  m.breakfast.steps.forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    bSteps.appendChild(li);
  });
  
  // Lunch
  document.getElementById("lunch-name").textContent = m.lunch.name;
  document.getElementById("lunch-time").textContent = m.lunch.time;
  document.getElementById("lunch-desc").textContent = m.lunch.desc;
  
  const lSteps = document.getElementById("lunch-steps");
  lSteps.innerHTML = "";
  m.lunch.steps.forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    lSteps.appendChild(li);
  });
  
  // Dinner
  document.getElementById("dinner-name").textContent = m.dinner.name;
  document.getElementById("dinner-time").textContent = m.dinner.time;
  document.getElementById("dinner-desc").textContent = m.dinner.desc;
  
  const dSteps = document.getElementById("dinner-steps");
  dSteps.innerHTML = "";
  m.dinner.steps.forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    dSteps.appendChild(li);
  });
}

function renderGroceryList() {
  const container = document.getElementById("grocery-items-container");
  container.innerHTML = "";
  
  // Group items by category
  const categories = ["Produce", "Protein", "Pantry", "Dairy/Other"];
  const grouped = {};
  
  categories.forEach(cat => {
    grouped[cat] = currentMealPlan.groceryList.filter(item => item.category.toLowerCase() === cat.toLowerCase());
  });
  
  // Grab remaining uncategorized items
  const extra = currentMealPlan.groceryList.filter(item => 
    !categories.map(c => c.toLowerCase()).includes(item.category.toLowerCase())
  );
  if (extra.length > 0) {
    grouped["Other"] = extra;
  }
  
  Object.keys(grouped).forEach(catName => {
    const items = grouped[catName];
    if (items.length === 0) return;
    
    const catDiv = document.createElement("div");
    catDiv.className = "grocery-category";
    
    const title = document.createElement("span");
    title.className = "grocery-category-title";
    title.textContent = catName;
    catDiv.appendChild(title);
    
    items.forEach(item => {
      const row = document.createElement("div");
      row.className = `grocery-row ${item.owned ? 'owned' : ''}`;
      row.id = `row-${item.id}`;
      
      const label = document.createElement("label");
      label.className = "grocery-label-container";
      
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.className = "grocery-checkbox";
      cb.checked = item.owned;
      cb.addEventListener("change", () => toggleGroceryOwned(item.id));
      
      const text = document.createElement("span");
      text.className = "grocery-text";
      text.textContent = item.name;
      
      label.appendChild(cb);
      label.appendChild(text);
      
      const costSpan = document.createElement("span");
      costSpan.className = "grocery-cost";
      costSpan.textContent = `$${item.cost.toFixed(2)}`;
      
      row.appendChild(label);
      row.appendChild(costSpan);
      catDiv.appendChild(row);
    });
    
    container.appendChild(catDiv);
  });
}

function renderSubstitutions() {
  const container = document.getElementById("substitutions-container");
  container.innerHTML = "";
  
  if (currentMealPlan.substitutions.length === 0) {
    container.innerHTML = `<p class="section-subtitle">No smart substitutions compiled for this menu.</p>`;
    return;
  }
  
  currentMealPlan.substitutions.forEach(sub => {
    const card = document.createElement("div");
    card.className = "sub-item-card";
    
    const textSec = document.createElement("div");
    textSec.className = "sub-text-section";
    
    const orig = document.createElement("span");
    orig.className = "sub-original";
    orig.textContent = sub.originalName;
    
    const repl = document.createElement("span");
    repl.className = "sub-replacement";
    repl.textContent = sub.replacementName;
    
    textSec.appendChild(orig);
    textSec.appendChild(repl);
    
    const details = document.createElement("div");
    details.className = "sub-details";
    
    // Find corresponding item to compute savings
    const matchingItem = currentMealPlan.groceryList.find(g => g.id === sub.originalId);
    let origCost = matchingItem ? (sub.applied ? matchingItem.originalCost : matchingItem.cost) : 0;
    let diff = sub.replacementCost - origCost;
    
    const badge = document.createElement("span");
    if (diff < 0) {
      badge.className = "sub-diff-badge save";
      badge.textContent = `Save $${Math.abs(diff).toFixed(2)}`;
    } else {
      badge.className = "sub-diff-badge add";
      badge.textContent = `+$${diff.toFixed(2)}`;
    }
    
    const swapBtn = document.createElement("button");
    swapBtn.className = "btn-sub-swap";
    swapBtn.textContent = sub.applied ? "Revert" : "Swap";
    swapBtn.addEventListener("click", () => toggleSubstitution(sub.subId));
    
    details.appendChild(badge);
    details.appendChild(swapBtn);
    
    card.appendChild(textSec);
    card.appendChild(details);
    container.appendChild(card);
  });
}

// --- Grocery Interaction logic ---
function toggleGroceryOwned(itemId) {
  const item = currentMealPlan.groceryList.find(g => g.id === itemId);
  if (item) {
    item.owned = !item.owned;
    
    // Play sound synth
    playChime(item.owned);
    
    // Style toggle
    const row = document.getElementById(`row-${itemId}`);
    if (row) {
      if (item.owned) row.classList.add("owned");
      else row.classList.remove("owned");
    }
    
    evaluateBudgetAndRender();
  }
}

function toggleSubstitution(subId) {
  const sub = currentMealPlan.substitutions.find(s => s.subId === subId);
  if (!sub) return;
  
  const groceryItem = currentMealPlan.groceryList.find(g => g.id === sub.originalId);
  if (!groceryItem) return;
  
  sub.applied = !sub.applied;
  
  if (sub.applied) {
    // Perform swap
    groceryItem.name = sub.replacementName;
    groceryItem.cost = sub.replacementCost;
  } else {
    // Revert swap
    groceryItem.name = sub.originalName;
    groceryItem.cost = groceryItem.originalCost;
  }
  
  playChime(true);
  
  // Re-render sections
  renderGroceryList();
  renderSubstitutions();
  evaluateBudgetAndRender();
}

// --- Budget Feasibility Assessment ---
function evaluateBudgetAndRender() {
  const limit = currentMealPlan.budgetLimit;
  
  // Sum cost of items we DO NOT own
  let totalCost = 0;
  currentMealPlan.groceryList.forEach(item => {
    if (!item.owned) {
      totalCost += item.cost;
    }
  });
  
  // Format elements
  document.getElementById("budget-cost-total").textContent = `$${totalCost.toFixed(2)}`;
  document.getElementById("budget-cost-limit").textContent = `$${limit.toFixed(2)}`;
  
  const balance = limit - totalCost;
  const balanceEl = document.getElementById("budget-cost-balance");
  balanceEl.textContent = `$${balance.toFixed(2)}`;
  
  if (balance >= 0) {
    balanceEl.style.color = "var(--status-good)";
  } else {
    balanceEl.style.color = "var(--status-danger)";
  }
  
  // Progress Bar
  const pct = Math.min((totalCost / limit) * 100, 100);
  const progressBar = document.getElementById("budget-progress-bar");
  progressBar.style.width = `${pct}%`;
  
  // Status Badge and Progress color
  const badge = document.getElementById("budget-status");
  const adviceBox = document.getElementById("budget-advice-box");
  const advTitle = document.getElementById("budget-advice-title");
  const advDesc = document.getElementById("budget-advice-desc");
  
  // Remove classes first
  badge.className = "status-badge";
  adviceBox.className = "advice-box";
  
  if (totalCost <= limit) {
    // Safe
    badge.textContent = "Within Budget";
    badge.classList.add("status-good");
    adviceBox.classList.add("advice-neutral");
    
    advTitle.textContent = "Looking Good!";
    if (balance > 5) {
      advDesc.textContent = `You have $${balance.toFixed(2)} leftover buffer! If you want to elevate this meal, consider upgrading simple ingredients to organic options or buying fresh bakery bread.`;
    } else {
      advDesc.textContent = `Perfect planning. Your menu fits well within your daily budget with a minor safety buffer.`;
    }
  } else {
    // Over Budget
    badge.textContent = "Over Budget";
    badge.classList.add("status-danger");
    adviceBox.classList.add("advice-danger");
    
    advTitle.textContent = "Action Required:";
    
    // Find unapplied cost-saving substitutions
    const options = currentMealPlan.substitutions.filter(s => !s.applied);
    if (options.length > 0) {
      const bestSave = options.reduce((best, s) => {
        const item = currentMealPlan.groceryList.find(g => g.id === s.originalId);
        const saveAmt = item ? item.cost - s.replacementCost : 0;
        return saveAmt > best.saveAmt ? { sub: s, saveAmt } : best;
      }, { sub: null, saveAmt: 0 });
      
      if (bestSave.sub) {
        advDesc.innerHTML = `You are $${Math.abs(balance).toFixed(2)} over budget. <button class="budget-btn-suggestion" onclick="toggleSubstitution('${bestSave.sub.subId}')">Click here to swap ${bestSave.sub.originalName} with ${bestSave.sub.replacementName} and save $${bestSave.saveAmt.toFixed(2)}</button>.`;
      } else {
        advDesc.textContent = `You are $${Math.abs(balance).toFixed(2)} over budget. Tap the check boxes on ingredients you already have in your pantry to lower the shopping trip total!`;
      }
    } else {
      advDesc.textContent = `You are $${Math.abs(balance).toFixed(2)} over budget. Tap the check boxes on ingredients you already have in your pantry to lower the shopping trip total!`;
    }
  }
}
