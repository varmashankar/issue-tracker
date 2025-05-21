const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected successfully");

  // Optional: Automatically create DB/collection by inserting dummy data
  const dummySchema = new mongoose.Schema({ initialized: String }, { collection: "init_collection" });

  const InitModel = mongoose.model("InitModel", dummySchema);

  InitModel.findOne().then(doc => {
    if (!doc) {
      // Insert dummy document only if collection is empty
      return InitModel.create({ initialized: "initialized" });
    }
  }).then(() => {
    console.log("✅ Dummy collection initialized (if needed)");
  }).catch(err => {
    console.error("❌ Error creating dummy document:", err.message);
  });

})
.catch(err => {
  console.error("❌ MongoDB connection error:", err.message);
});

module.exports = mongoose;
