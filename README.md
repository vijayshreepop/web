# VIJAY SHREE POP & PVC: WhatsApp shop

A static product showroom. Customers browse, fill a cart and send the order to your WhatsApp. There is no backend, database or payment gateway.

> **The customer must press SEND in WhatsApp.** The website cannot know whether a message was sent. An order exists only when it appears in your WhatsApp.

## Before you go live

- [ ] Replace or delete the 15 **sample listings**. Their prices are made-up examples. Admin > Products > "Delete all samples".
- [ ] Add your real products and photos.
- [ ] Check the About and "Why choose us" text (Admin > Homepage). It is draft wording.
- [ ] Check the Google Maps link. It is a map **search** for your address. Replace it with your shop's own Share link.
- [ ] Add your email, Facebook and YouTube links if you have them. Empty ones are hidden.
- [ ] Send one test order and one test enquiry from a phone.

## Deploy on GitHub Pages

1. Create a GitHub account and a new repository, for example `vijay-shree-shop`. On the free GitHub plan it must be **public**.
2. Unzip the project. Upload the **contents** of the `vijay-shree-pop-pvc` folder, so that `package.json` is at the top level of the repository.
   - Easiest: use GitHub Desktop (add the folder, commit, publish). It includes hidden folders.
   - In the browser: Add file > Upload files, then drag the files and folders in.
3. Check that `.github/workflows/deploy.yml` exists in the repository. Folders starting with a dot are often hidden on your computer. If it is missing: Add file > Create new file, type `.github/workflows/deploy.yml` as the name, paste the file's contents and commit.
4. Open **Settings > Pages**. Under *Build and deployment*, set **Source** to **GitHub Actions**.
5. Open **Actions**. Select *Deploy to GitHub Pages*, then **Run workflow** (or make any commit to `main`).
6. After the green tick, the site is at `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

The repository branch must be `main`. `base: './'` in `vite.config.js` means you do not need to edit anything for your repository name or a custom domain.

If the workflow fails, open the red step. `validate` lists the exact data mistake. The live site stays as it was until a later run succeeds.

## Change products, prices and content

The editor is at `your-site-address/#/admin` (also linked in the footer).

**Edits stay in your browser. They do not change the live website.** There is no password on purpose: a password in a static website can be bypassed, and the editor cannot publish anything. Only people who can sign in to your GitHub repository can change the live site. Turn on two-factor authentication for that account.

1. Edit products, categories, homepage, contact details or gallery.
2. Press **Preview website with draft** to check it. A yellow bar shows you are in preview. Orders sent from preview are marked TEST but still go to the real number.
3. Open **Import and export** and export every file marked as changed.
4. In GitHub open `public/data/` > Add file > Upload files. Keep the exact file names. Commit.
5. Wait for the green tick under Actions, then reload the site.

Work on one computer at a time and publish before switching. A draft is lost if you clear browser data. The editor warns you if a file you are editing has also changed on the live site.

Fixed price or quote: edit a product and change **Pricing mode**.

## Product photos

1. In the editor, press **Choose photo** (or use the **Images** tab). The photo is resized to 1600px or less, compressed and downloaded. The path is filled in for you. In the Images tab, copy the path yourself.
2. In GitHub, open the folder shown, such as `public/assets/products/fluted-panels/`, and upload the downloaded file without renaming it.
3. Upload the exported JSON too. **A photo is public only after it is committed and deployed.**

Use your own photos or ones your supplier allows you to publish. Names are case-sensitive. A new category needs no folder in advance: when uploading in GitHub, create it by typing the path in Add file, or upload a folder with that name.

| Folder | Contents |
|---|---|
| `public/assets/logo/` | Your original logo, unchanged |
| `public/assets/banners/` | Homepage banners and category images |
| `public/assets/gallery/` | Project photos |
| `public/assets/products/<category>/` | Product photos |

## CSV (bulk changes)

Export the product CSV, edit it in Excel or Google Sheets, save as **CSV UTF-8**, and import it. Then export `products.json` and upload that.

- Rows match by `id`, then `code`. Importing never deletes products.
- Only the columns in your file are changed.
- `category` is the category id from `categories.json`, such as `fluted-panels`.
- `pricingMode`: `fixed` or `quote`. `availability`: `in_stock`, `limited`, `made_to_order`, `out_of_stock`.
- `unit`: Piece, Sheet, Box, Bag, Roll, Square Foot, Running Foot, Custom Unit.
- `specifications`: `Finish: Matte | Length: 10 ft`. `images`: paths separated by `|`.
- Check that your spreadsheet has not changed product codes (for example by dropping leading zeros).

## How ordering works

- The cart is saved in the customer's browser. Only product ids and quantities are stored. Prices always come from the current catalogue.
- Removed, out-of-stock or quote-only products block checkout until removed.
- `stockQuantity` limits the quantity in one order. It does **not** reduce after orders. Update stock yourself.
- Whole numbers are required except for Square Foot and Running Foot.
- **Buy now** orders one product and leaves the cart alone.
- The cart is cleared only when the customer chooses to.
- Customer details are kept in memory while the page is open. They are never saved by the website or put in repository files. WhatsApp receives them in the message link.
- **Confirm every price before taking payment.** A message is plain text that a sender can edit, and a visitor's page may be out of date.
- Totals exclude tax and delivery.
- Very large orders make very long links, which some devices may cut off. The confirmation page has a **Copy message** button.
- `wa.me` opens the WhatsApp app where available. On computers, WhatsApp's page may ask the visitor to choose the app or WhatsApp Web.

## Privacy and public files

Everything in a public repository and on the site can be read by anyone, including all prices and photos. Never put customer details, cost prices or passwords in it.

## For developers

Needs Node 22.12 or later.

```
npm install
npm run dev        # local development
npm run validate   # check the JSON data
npm test           # logic tests
npm run build      # output in dist/
```

After your first `npm install`, commit `package-lock.json` so that later deployments use the same versions.

```
.github/workflows/deploy.yml
public/data/        products.json, categories.json, settings.json, gallery.json
public/assets/      logo, banners, gallery, products
src/lib/            pricing, cart, WhatsApp, forms, search, CSV, data checks
src/components/     header, footer, cards, forms
src/pages/          shop pages
src/admin/          local editor
src/fonts/          Cardo and DM Sans, with their licences
scripts/            data check and tests
```

The data lives in `public/data/` (not a top-level `/data`) so the published site can read it, and so you can update it without touching code.

Limits: with thousands of products the whole `products.json` still downloads at once (only 24 cards are shown per page). A very large draft can exceed browser storage; the editor warns you, and you should export immediately.
