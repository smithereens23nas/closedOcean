const express = require("express");
const router = express.Router();
const { Author } = require("../Models");

router.get("/", async (req, res) => {
  try {
    const author = await Author.find({});
    const context = { author };
    // console.log("=======================================================");
    // // console.log(context);

    // console.log("=======================================================");
    res.render("authorPage.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

router.get("/:author", async (req, res, next) => {
  // console.log("HELLO WORLD")
  try {
    const nftAuthor = req.params.author;
    const author = await Author.findById(nftAuthor);
    const context = { author };
    console.log("=======================================================");
    console.log(context);

    console.log("=======================================================");
    res.render("authorShowPage.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});


// router.post('/', (req, res) => {
  Author.deleteMany({}, (error, deletedAuthor) => {
    if (error) console.log(error);
    Author.insertMany(
      [
        {
          name: "8-Bit_Evolutions",
          image:"https://wallpapercave.com/wp/wp4363074.jpg",
          description:
          "This is the best class because they named themselves the blue devils!",
        },
        {
          name: "Tmarra122333",
          image:
          "https://lh3.googleusercontent.com/jiW30Y2n596jNb1_TshoKldwuZm_mdCVQL195roQmQ4rLiOIDhbJA6zzT93-wfIhK4KrxVV6PE7pxZUoUPslkI6SYt4_Q0rKU_Yf=w289",
          description: "Another description!",
        },
        {
          name: "MagykCarp",        
          image: "https://hips.hearstapps.com/countryliving.cdnds.net/17/47/1511194376-cavachon-puppy-christmas.jpg",
          description: "We love coding!",
        },
      ],
      function (error, createdAuthor) {
        if (error) {
          return console.log(error);
        }
        console.log("=== Seed Complete ===");
        console.log(createdAuthor);
      }
      );
      console.log(deletedAuthor);
    });
    
    // Start by console logging things out here for the req, then req.body
    // })
    router.post("/", (req, res) => {
      Author.create(req.body, (error, createdAuthor) => {
        if (error) console.log(error);
        console.log(createdAuthor);
        
        res.redirect("/author");
      });
    });

//     router.get('/:authorId', async (req, res, next) => {
//     try {
//         const foundAuthor = await Author.findById(req.params.productId)

//         console.log(foundAuthor);
//         const context = { author: foundAuthor }
//         res.render('authorShowPage.ejs', context)
//     } catch (error) {
//         console.log(error);
//         req.error = error;
//         return next();
//     }
// });
    
    module.exports = router;
    