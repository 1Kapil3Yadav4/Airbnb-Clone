const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const  listingController = require("../controllers/listing.js"); 
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });
  

// INDEX ROUTE
router.get("/",wrapAsync(listingController.index));


//NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);





// CREATE ROUTE
router.post("/", 
isLoggedIn,
upload.single('listing[image.url]'),
wrapAsync(listingController.createListing)
);



// SHOW ROUTE
router.get("/:id" ,wrapAsync(listingController.showListings)
);



//EDIT ROUTE
router.get("/:id/edit", 
isLoggedIn,
isOwner,
wrapAsync(listingController.renderEditForm)
);

//UPDATE ROUTE
router.put("/:id",
 isLoggedIn,
 isOwner,
 upload.single('listing[image.url]'),
wrapAsync(listingController.updateListing)
);


//DELETE ROUTE
router.delete("/:id", 
isLoggedIn,
isOwner,
wrapAsync(listingController.destroyListing)
);


module.exports = router;