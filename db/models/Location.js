import mongoose from "mongoose";

const { Schema } = mongoose;

const LocationSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  mapURL: { type: String, required: true },
  description: { type: String, requiered: true },
});

const Location =
  mongoose.models.Location || mongoose.model("Location", LocationSchema);

export default Location;
