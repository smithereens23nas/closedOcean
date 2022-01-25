const express = require("express");
const router = express.Router();
const { Author } = require("../Models");

router.get("/", (req, res) => {
  Author.find({}, (error, foundAuthor) => {
    if (error) return console.log(error);

    console.log(foundAuthor);
    context = {
      authors: foundAuthor,
    };
    res.render("authorPage.ejs", context);
  });
});

router.post('/', (req, res) => {
    Author.deleteMany({}, (error, deletedAuthor) => {
        if(error) console.log(error);
        Author.insertMany(
            [
                {
                    name: "Eric and Troy's Awesome class",
                    price: 100,
                    image: "https://i.pinimg.com/originals/81/6b/83/816b83a23a6f4b0405bd6699b854a6bd.jpg",
                    description: "This is the best class because they named themselves the blue devils!",
                },
                {
                    name: "Some other thing",
                    price: 200,
                    image: "https://www.rd.com/wp-content/uploads/2021/03/GettyImages-1133605325-scaled-e1617227898456.jpg",
                    description: "Another description!",
                },
                {
                    name: "Coders Unite",
                    price: 500,
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
        )
        console.log(deletedAuthor)
    }
    )
    
    // Start by console logging things out here for the req, then req.body
    Author.create(req.body, (error, createdProduct) => {
        if(error) console.log(error);
        console.log(createdProduct);


        res.redirect("/author");
    })
})

router.get("")

module.exports = router;