const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const { NFT } = require('../models')

router.get('/', (req,res) => {
    NFT.find({}, (error, foundNFT) => {
        res.render("explorePage.ejs", {nft: foundNFT})

    })
})

router.post('/', (req,res) => {
    
    NFT.deleteMany({}, (error, deletedNFT) => {
        if(error) console.log(error);
        NFT.insertMany(
            [
                {
                    name: "NFT #1 Singularity of Humanity",
                    price: 1200,
                    image: "https://doorofperception.com/wp-content/uploads/Alex_Grey-The_Kiss.jpg",
                    description: "Where man meets machine to create a new species : RoboSapiens",
                },
                {
                    name: "NFT #2 Big Bang of Machine meets Man",
                    price: 6000,
                    image: "https://www.pbs.org/wgbh/nova/media/original_images/hs-2015-29-a-xlarge_web_fSzrnrb.jpg",
                    description: "The birthplace of Man and Machine",
                },
                {
                    name: "NFT #3 Robo-Pets enter Singularity",
                    price: 500,
                    image: "https://www.artmajeur.com/medias/standard/l/e/lea-roche/artwork/12785927_cat-jewel-70x60.jpg",
                    description: "The first ever 1/2 Kitten and 1/2 Machine created by man",
                },
            ],
              function (error, createdNFT) {
                if (error) {
                  return console.log(error);
                }
                console.log("=== Seed Complete ===");
                console.log(createdNFT);
              }
        )
        console.log(deletedNFT)
    }
    )
})




router.post('/', (req, res) => {
    // Start by console logging things out here for the req, then req.body
    NFT.create(req.body, (error, createdNFT) => {
        if(error) console.log(error);
        console.log(createdNFT);
        
        
        res.redirect("/explore");
    })
})

router.get('/showpage', (req,res) =>
res.render("showPage.ejs"));


//This is bringing me to the Show page for the designated picture!!!!!!!!! Grabbing item by id.
router.get('/:nftId', (req, res) => {
    NFT.findById(req.params.guitarId, (error, foundNFT) => {
        if (error) {
           console.log(error);
           res.status(404).render('404.ejs', {error: error});
        };
        return res.render('show.ejs', {nft: foundNFT});
    });
 });

 
 
 
 
 router.delete('/:nftId', (req, res) => {
    NFT.findByIdAndDelete(req.params.guitarId, (error, deleteNFT) => {
        if(error) {
            console.log(error);
            res.send(error);
        }

        console.log(deleteNFT);
        res.redirect('/explore')
    })
})
 
router.get('/:nftId/edit', (req, res)=>{
    NFT.findById(req.params.guitarId, (error, updatednft)=>{
        if(error){
            console.log(error);
            res.status(404).render('404.ejs', {error: error});
        }
        return res.render('edit.ejs', {nft: updatednft});
    });
  });


  router.put('/:nftId', (req, res) => {
   
    NFT.findByIdAndUpdate(req.params.guitarId, req.body,(error, updatedNFT) => {
        if (error) {
            console.log(error);
            res.status(404).render('404.ejs', {error: error});
        } 

        console.log(updatedNFT);

        return res.redirect(`/explore`);
    });
});


module.exports = router
