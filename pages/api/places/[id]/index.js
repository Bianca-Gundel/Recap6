import dbConnect from "@/db/connect";
import Location from "@/db/models/Location";

export default async function handler(request, response) {
  console.log("async handler [id]");
  await dbConnect();
  const { id } = request.query;
  console.log(request.query);

  if (!id) {
    response
      .status(400)
      .json({ status: "Bad Request", message: "ID is required" });
    return;
  }

  if (request.method === "GET") {
    const location = await Location.findById(id);

    if (!location) {
      response.status(404).json({ status: "Not Found" });
      return;
    }
    response.status(200).json(location);
    return;
  }

  if (request.method === "PATCH") {
    const updates = request.body;

    try {
      const updatedLocation = await Location.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });

      if (!updatedLocation) {
        response.status(404).json({ status: "Not Found" });
        return;
      }

      response.status(200).json(updatedLocation);
      return;
    } catch (error) {
      console.error("Error updating location:", error);
      response
        .status(400)
        .json({ status: "Bad Request", message: "Somehting went wrong" });
      return;
    }
  }

  if (request.method === "DELETE") {
    await Location.findByIdAndDelete(id);

    response
      .status(200)
      .json({ status: `Location ${id} successfully deleted` });
    return;
  }
  response.status(405).json({ status: "Method not allowed" });
  return;
}
