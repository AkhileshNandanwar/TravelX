const express=require('express');
const mongoose = require('mongoose');
const app=express();
const Listing=require("./models/listing")
const path=require("path")
const MONGO_URL="mongodb://127.0.0.1:27017/TravelX";
const methodOverride=require("method-override")
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
 
main().then(()=>{
    console.log("connected to DB");
    
})

.catch((err)=>{
    console.log(err);
    
})

async function main() {
    await mongoose.connect(MONGO_URL);
    
}
app.get("/",(req,res)=>{
    res.send("Hi ");
})

//Index route
app.get("/listings",async (req,res)=>{
   const allListings=await Listing.find({});
       res.render("listings/index",{allListings});
        
    });

//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new")
})

//Show Route
app.get("/listings/:id" ,async(req,res)=>{
    let {id}=req.params; //This extracts the id parameter from the URL. For instance, if the route is /listings/123, this line extracts id = 123.
    const listing=await Listing.findById(id);
    res.render("listings/show",{listing});
})

//Create Route
app.post("/listings",async(req,res)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})


//edit Route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit",{listing});
})

//Update Route
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
})

//Delete Route
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedListing =await Listing.findByIdAndDelete(id);
    res.redirect("/listings");

})

/*Sample
app.get("/testListing",async (req,res)=>{
let sampleListing=new Listing({
    title:"My new Villa",
    description:"By the Beach",
    price:1200,
    location:"Goa",
    Country:"India",
});
await sampleListing.save();
console.log("sample was saved");
res.send("Succesful Listing")

})
*/

app.listen(8080,()=>{
    console.log("listening");
    
})

