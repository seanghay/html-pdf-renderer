import axios from "axios";
import fs from "fs/promises";

const html = await fs.readFile("file.html", "utf-8");

const response = await axios.post(
  "https://html-renderer.floo.app/render-html-pdf",
  { html: "hello" },
  { responseType: "arraybuffer" }
);
const buffer = Buffer.from(response.data);
await fs.writeFile("file.pdf", buffer);
