# Portfolio Deployment Guide

The portfolio is a static frontend hosted on Netlify. The `/email` page submits directly to Netlify Forms, so no separate email server or API environment variables are required.

## Deploy to Netlify

1. Push the repository to your Git provider.
2. In [Netlify](https://www.netlify.com/), select **Add new site** → **Import an existing project**.
3. Select the repository and configure:
   - Base directory: leave blank
   - Build command: `npm run build --prefix website`
   - Publish directory: `website/dist`
4. Deploy the site.

Alternatively, set the base directory to `website`, then use `npm run build` as the build command and `dist` as the publish directory.

Netlify detects the hidden `contact` form in `website/public/__forms.html` during deployment. The React page submits the fields `name`, `email`, `subject`, and `message` to that form and includes the `bot-field` honeypot.

## Configure Form Notifications

1. Open the deployed site in the Netlify dashboard.
2. Go to **Forms** and confirm that the `contact` form appears after the first deployment.
3. Go to **Project configuration** → **Notifications** → **Emails and webhooks**.
4. Add an email notification for new `contact` form submissions.
5. Submit a test message from `/email` and verify it appears under **Forms**.

No frontend environment variable is needed for contact form submissions.

## Custom Domain

1. Open **Domain management** in Netlify.
2. Select **Add a domain** and enter your domain.
3. Follow Netlify's DNS instructions.
4. Wait for DNS propagation and confirm HTTPS is active.

## Update the Site

```bash
cd website
npm run lint
npm run build
```

Commit and push the changes. Netlify will build and deploy the new version automatically.

## Deployment Checklist

- [ ] Netlify deployment completes successfully
- [ ] The site and `/email` route load
- [ ] Netlify lists the `contact` form
- [ ] A test submission appears in the Forms dashboard
- [ ] Form email notifications arrive
- [ ] The honeypot field is present in the deployed form
- [ ] The custom domain resolves and HTTPS is active

## Troubleshooting

### Netlify does not detect the form

- Confirm `website/public/__forms.html` is present in the deployed output.
- Trigger a fresh deployment after clearing the Netlify build cache.
- Confirm the hidden form is named `contact` and includes `data-netlify="true"`.

### A submission fails

- Check the browser network panel for the POST request to `/__forms.html`.
- Confirm the request content type is `application/x-www-form-urlencoded`.
- Confirm the submitted form name is `contact`.
- Review the site's form submissions and spam entries in Netlify.

### A route returns 404

- Confirm `website/public/_redirects` is included in the deployed output.
- Confirm the publish directory points to the generated `dist` directory.
