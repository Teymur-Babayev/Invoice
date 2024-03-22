import axios from "axios";
import { User } from "../fb.user";

const UserCtrl = new User();
export class Mail {
  async SendMails(uid, Slug, type,title) {
    const UsersData = await UserCtrl.getUsersWithOutRole();
    const emails = UsersData.map((user) => user.email);
    const correosString = emails.join(",");
    const { Username } = await UserCtrl.getMe(uid);

    const correoData = {
      to: correosString,
      title: title,
      author: Username,
      url: `https://www.easysat.com.mx/blog/${Slug}`,
      type: type,
    };

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_MAILS,
        correoData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error enviando el correo:", error);
    }

    console.log(correoData);
  }
}
