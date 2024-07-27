import InstagramSearchUser from "@/model/searchUser";
import dbConnect from "@/utils/dbconnect";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { id, data } = req.body;
    try {
      let user = await InstagramSearchUser.findOne({ username: id });
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "User already exists", data: user });
      } else {
        user = new InstagramSearchUser(data);
        await user.save();
        return res
          .status(201)
          .json({ success: true, message: "User created", data: user });
      }
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Invalid request method" });
  }
}
