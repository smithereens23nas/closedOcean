const express = require("express");
const router = express.Router();
const { Nft } = require("../Models");

router.get("/home", function (req, res) {
  res.render("homePage.ejs");
});

router.get("/explore", async (req, res) => {
  try {
    const nft = await Nft.find({});
    const context = { nft };
    console.log("=======================================================");
    console.log(context);

    console.log("=======================================================");
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
          "https://www.pbs.org/wgbh/nova/media/original_images/hs-2015-29-a-xlarge_web_fSzrnrb.jpg",
        description: "The birthplace of Man and Machine",
      },
      {
        name: "NFT #3 Robo-Pets enter Singularity",
        author: "MagykCarp",
        price: 500,
        image:
          "https://www.artmajeur.com/medias/standard/l/e/lea-roche/artwork/12785927_cat-jewel-70x60.jpg",
        description: "The first ever 1/2 Kitten and 1/2 Machine created by man",
      },
      {
        name: "NFT #4 Spineless Intelligence",
        author: "Jim Jelly",
        price: 45600,
        image:
          "https://wallpaperaccess.com/full/664881.jpg",
        description: "I dont have a brain but will still sting you in the metaverse",
      },
    ],
    function (error, createdNFT) {
      if (error) {
        return console.log(error);
      }
      console.log("=== Seed Complete ===");
      console.log(createdNFT);
    }
  );
  console.log(deletedNFT);
});
// })






router.post("/create", (req, res) => {
      // Start by console logging things out here for the req, then req.body
      Nft.create(req.body, (error, createdNFT) => {
            if (error) console.log(error);
            console.log(createdNFT);
        
            res.redirect("/explore");
          });
        });
        
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

        router.delete('/:nftId', async (req, res, next) => {
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
        
        router.get('/:nftId/edit', async (req, res, next) => {
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
        
        router.put('/:nftId', async (req, res, next) => {
        
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
