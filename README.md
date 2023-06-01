# ccweb

User facing interface for the natural4 outputs.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deployment

```bash
docker build -t ccweb .
docker run -p 5000:5000 ccweb
```

Docker will use `nginx` to serve the static files. Expose `5000` locally to view the page.
