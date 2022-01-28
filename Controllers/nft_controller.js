const express = require("express");
const router = express.Router();
const { Nft } = require("../Models");



router.get("/home", function (req, res) {
  res.render("homePage.ejs");
});



router.get("/explore/stats", function(req, res) {
    res.render("statPage.ejs")
});

router.get("/explore", async (req, res) => {
  try {
    const nft = await Nft.find({});
    const context = { nft };
    // console.log("=======================================================");
    // console.log(context);

    // console.log("=======================================================");
    res.render("explorePage.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// router.post('/', (req,res) => {

Nft.deleteMany({}, (error, deletedNFT) => {
  if (error) console.log(error);
  Nft.insertMany(
    [
      {
        name: "NFT #1 Singularity of Humanity",
        author: "8-Bit_Evolutions",
        price: 1200,
        image:
          "https://doorofperception.com/wp-content/uploads/Alex_Grey-The_Kiss.jpg",
        description:
          "Where man meets machine to create a new species : RoboSapiens",
      },
      {
        name: "NFT #2 Big Bang of Machine meets Man",
        author: "Tmarra122333",

        price: 6000,
        image:
          "https://lh3.googleusercontent.com/z10a_2APyJWcG9FcRuLjLUASNw-HarqEip1fDVrzmBH8lHt9fZnHWRD2TyGQ_b18vnL2VJaVI3v-cPK-KgMrjK-lxqlQ8JKxBqWHKLg=w600",
        description: "The birthplace of Man and Machine",
      },
      {
        name: "NFT #3 Angry-Bit",
        author: "8-Bit_Evolutions",
        price: 500,
        image:
          "https://lh3.googleusercontent.com/csJyir8aDza9lPed9kRNYaTydGE0qN3EHMCNi1UkrM--qxP4cvtlQCtqHb0emYl1e2tAIONqrFNgsvPnMoInxvZ6ne-rnXfz1bgfJ8Q=w600",
        description: "Hold your head high, and your 8-bit finger higher",
      },
      {
        name: "NFT #4 Spineless Intelligence",
        author: "Jim Jelly",
        price: 15630,
        image:
          "https://wallpaperaccess.com/full/664881.jpg",
        description: "I dont have a brain but will still sting you in the metaverse",
      },
      {
        name: "NFT #5 Classic 1986 all time Favorite: Mario",
        author: "MagykCarp",
        price: 1600,
        image:
          "https://lh3.googleusercontent.com/0PoAgQtIDaAxDcWPqn3Lm5BcUennRT1iu4r45UXcNYzkNAO3U8fXUc4kaWp5c4YAcFfGFPSxJncgln4LHq1lg49Zd5fzzRwe6l-ls9U=w600",
        description: "Choose your own destiny",
      },
      {
        name: "NFT #6 Bit-Man ",
        author: "8-Bit_Evolutions",
        price: 45600,
        image:
          "https://lh3.googleusercontent.com/jjuTlMckBHMPOodZ4_Nbzi7OgEkc4Dt1vO2Mpo5fwsSDHe0B4Sr1hUqgbVmBJM_R0RnKTe2XpvkJFzxhxKq9Hi3hYWtU-y75Mqa7=w600",
        description: "I'm whatever Gotham needs me to be",
      },
      {
        name: "NFT #7 Goofy Paws",
        author: "Larry Lyon",
        price: 45600,
        image:
          "https://lh3.googleusercontent.com/jiW30Y2n596jNb1_TshoKldwuZm_mdCVQL195roQmQ4rLiOIDhbJA6zzT93-wfIhK4KrxVV6PE7pxZUoUPslkI6SYt4_Q0rKU_Yf=w289",
        description: "Im Hungry...",
      },
      {
        name: "NFT #8 Whomp",
        author: "Ariel",
        price: 32600,
        image:
          "https://64.media.tumblr.com/56b0d606e4b7ddd2a1e7d4f78e262ab5/tumblr_n0l3cwBAJa1rrftcdo1_500.gifv",
        description: "remember me?",
      },
      {
        name: "NFT #9 Crypto Punk",
        author: "Craig P.",
        price: 4600,
        image:
          "https://terranft.io/wp-content/uploads/2021/11/LunaPunk_-19-300x300.png",
        description: "I dont have a brain but will still sting you in the metaverse",
      },
    ],
    function (error, createdNFT) {
      if (error) {
        return console.log(error);
      }
    //   console.log("=== Seed Complete ===");
    //   console.log(createdNFT);
    }
  );
//   console.log(deletedNFT);
});
// })





router.get("/explore/create", function(req, res) {
    console.log("im here")
    res.render("createPage.ejs")
});

// router.post("/explore/create", (req, res) => {
//       // Start by console logging things out here for the req, then req.body
//       Nft.create(req.body, (error, createdNFT) => {
//             if (error) console.log(error);
//             console.log(createdNFT);
        
//             res.redirect("/explore");
//         });
//     });
    

router.post('/explore', async (req, res, next) => {
    console.log("im here")
    try {
        const createdNft = await Nft.create(req.body)
        console.log("====================SUCCESS==============================")
        console.log(createdNft);
        console.log("==================================================")

        res.redirect("/explore");

    } catch(error) {
        console.log("======================ERROR============================")
        console.log(error);
        console.log("==================================================")
        req.error = error;
        return next();
    }
})

    //This is bringing me to the Show page for the designated picture!!!!!!!!! Grabbing item by id.
        
       

        router.get('/explore/:nftId', async (req, res, next) => {
            try {
                const foundNft = await Nft.findById(req.params.nftId)
        
                console.log(foundNft);
                const context = { nft: foundNft }
                res.render('showPage.ejs', context)
            } catch (error) {
                console.log(error);
                req.error = error;
                return next();
            }
        });

        router.delete('/explore/:nftId', async (req, res, next) => {
            try {
                const deletedNft = await Nft.findByIdAndDelete(req.params.nftId);
        
                console.log(deletedNft);
                res.redirect('/explore');
            } catch(error) {
                console.log(error);
                req.error = error;
                return next();
            }
        })
        
        router.get('/explore/:nftId/edit', async (req, res, next) => {
            try {
                const updatedNft = await Nft.findById(req.params.nftId);
        
                console.log(updatedNft);
                return res.render('editPage.ejs', { nft: updatedNft })
            } catch (error) {
                console.log(error);
                req.error = error;
                return next();
            }
        })
        
        router.put('/explore/:nftId', async (req, res, next) => {
        
            try {
                const updatedNft = await Nft.findByIdAndUpdate(req.params.nftId, req.body);
        
                console.log(updatedNft);
                return res.redirect('/explore');
            } catch (error) {
                console.log(error);
                req.error = error;
                return next();
            }
        });





// router.delete("/:nftId", (req, res) => {
//   Nft.findByIdAndDelete(req.params.guitarId, (error, deleteNFT) => {
//     if (error) {
//       console.log(error);
//       res.send(error);
//     }

//     console.log(deleteNFT);
//     res.redirect("/explore");
//   });
// });

// router.get("/:nftId/edit", (req, res) => {
//   Nft.findById(req.params.guitarId, (error, updatednft) => {
//     if (error) {
//       console.log(error);
//       res.status(404).render("404.ejs", { error: error });
//     }
//     return res.render("createPage.ejs", { nft: updatednft });
//   });
// });

// router.put("/:nftId", (req, res) => {
//   Nft.findByIdAndUpdate(req.params.guitarId, req.body, (error, updatedNFT) => {
//     if (error) {
//       console.log(error);
//       res.status(404).render("404.ejs", { error: error });
//     }

//     console.log(updatedNFT);

//     return res.redirect(`/explore`);
//   });
// });

module.exports = router;
