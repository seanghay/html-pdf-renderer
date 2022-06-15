import puppeteer from "puppeteer";

/**
 * @type {import('puppeteer').Browser | null}
 */
let browser = null;

export async function renderAsPDFStream(html = "", pdfOptions) {
  
  let args = {};

  // remove path from pdfOptions
  if (pdfOptions && pdfOptions.path) {
    delete pdfOptions.path;
  }

  // inside docker container
  if (process.env.NODE_ENV === "production") {
    args = {
      executablePath: "/usr/bin/google-chrome",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    };
  }

  if (browser == null || browser.process() == null) {
    console.log('[chromium] create process')
    browser = await puppeteer.launch(args);
  } else {
    console.log('[chromium] use existing process')
  }
  
  const page = await browser.newPage();
  await page.setContent(html);
  const pdfStream = await page.createPDFStream(pdfOptions);

  return {
    stream: pdfStream,
    recycle: async () => {
      await page.close();
    },
  };
}
