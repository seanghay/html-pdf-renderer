import puppeteer from "puppeteer";

let browser = null;

export async function renderAsPDFStream(html = "") {

  let args = {};

  if (process.env.NODE_ENV === "production") {
    args = {
      executablePath: "/usr/bin/google-chrome",
      args: ["--no-sandbox"],
    };
  }

  if (browser == null) {
    browser = await puppeteer.launch(args);
  }

  const page = await browser.newPage();
  await page.setContent(html);

  const pdfStream = await page.createPDFStream();
  return {
    stream: pdfStream,
    recycle: async () => {
      await page.close();
    },
  };
}
