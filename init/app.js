const mongoose=require("mongoose");
const initdata=require("./data")
const Listing=require("../models/listing")

const MONGO_URL="mongodb://127.0.0.1:27017/TravelX";

main().then(()=>{
    console.log("connected to DB");
    
})

.catch((err)=>{
    console.log(err);
    
})

async function main() {
    await mongoose.connect(MONGO_URL);
    
}

const initDB=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("Data was initialized");
    
}

initDB();