import InstagramUser from "@/model/userDetailSchema";
import dbConnect from "@/utils/dbconnect";

export default async function handler(req, res) {
  await dbConnect();
  const {
    query: { username },
  } = req;

  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const user = await InstagramUser.findOne({ username }).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
