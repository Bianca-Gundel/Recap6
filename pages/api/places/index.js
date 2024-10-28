import dbConnect from "@/db/connect";
import Location from "@/db/models/Location";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const location = await Location.find();

    if (!location) {
      response.status(404).json({ status: "Not Found" });
      return;
    }
    response.status(200).json(location);
    return;
  }

  if (request.method === "POST") {
    const locationData = request.body;

    const newLocation = await Location.create(locationData);
    response.status(201).json(newLocation);
    return;
  }
}
