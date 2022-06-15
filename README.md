# HTML to PDF Renderer


## Prerequisites

Make sure you have Google Chrome installed on your machine.

## Running


### Clone the project

```
git clone --depth=1 https://github.com/seanghay/html-pdf-renderer.git .
```


### docker-compose

```
docker-compose up -d
```

### Node.js

```
npm install && npm start
```


## Render as PDF

```sh
curl --request POST \
  --url http://localhost:8080/render-html-pdf \
  --header 'Content-Type: application/json' \
  --data '{
	  "html": "<h2 style=\"color: red;font-family: sans-serif\">hello, world</h2>"
  }'
```

The response will be a PDF stream.

### PDF Options

See: [docs](https://pptr.dev/#?product=Puppeteer&version=v14.4.0&show=api-pagecreatepdfstreamoptions)

```jsonc
{
  "html": "...",
  "pdfOptions": {
    "format": "A1"
  }
}
```
