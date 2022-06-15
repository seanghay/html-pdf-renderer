import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { renderAsPDFStream } from "./renderer.js";

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cors());
app.use(morgan("combined"));
app.use(helmet());

app.post("/render-html-pdf", async (req, res) => {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Transfer-Encoding", "chunked");
  const { html, pdfOptions } = req.body;
  const { stream, recycle } = await renderAsPDFStream(html, pdfOptions);
  stream.pipe(res);
  stream.on("error", async () => {
    res.end();
    await recycle();
  });
  stream.addListener("end", async () => await recycle());
});


app.listen(port, () => console.log(`[http] listening on http://127.0.0.1:${port}`));
