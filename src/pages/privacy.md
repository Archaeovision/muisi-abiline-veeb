---
layout: ../layouts/MdPage.astro
title: Privacy Policy
---

*Effective from: 23.09.2026*

*[Loe seda lehte eesti keeles](/privaatsus)*

## 1. Who we are

The developer and data controller of the MuISi abiline Chrome extension
("Extension") is **Archaeovision** (registry code 12705772), at Kaarli pst 5,
Tallinn, Estonia ("we", "us"). For questions, contact:
[support@archaeovision.eu](mailto:support@archaeovision.eu).

## 2. What data we collect

| Data | Source | Where it goes |
|---|---|---|
| MuIS user ID and institution (museum) ID | Derived from MuIS's own login token, read from the MuIS page open in the browser | Our server (EU-based) |
| Item record data and representative image (only when using the AI description feature) | MuIS's own database, already shown to the user in MuIS | The AI provider the user selected (Google Gemini or Anthropic Claude), using the user's own API key |
| Printer settings (IP address, label templates) | Entered by the user | Nowhere — stored only in the user's own browser; we never see it |

We do not collect or store browsing history, passwords, or any MuIS login
credentials beyond the IDs described above.

## 3. Why we collect it

- **License validity check** — we verify that the institution has a valid MuISi abiline license.
- **Seat management** — the license limits how many users can use the Extension concurrently under the same institution; the user ID and last-activity timestamp are needed for this.
- **Add-on service status** — we check, per institution, which optional features (e.g. AI description) are enabled.

Data is not used for advertising, profiling, or marketing purposes.

## 4. Who we share data with

- **Our own server** — for session and license data.
- **AI provider** (Google Gemini or Anthropic Claude) — only if the user has
  enabled the AI description feature and entered their own API key. Data goes
  directly from the user's browser to the selected provider; our server never
  sees that traffic. The relevant provider's own privacy policy applies:
  [Google](https://policies.google.com/privacy) ·
  [Anthropic](https://www.anthropic.com/legal/privacy).

We do not sell or share user data with any third party for advertising or any
purpose not described above.

## 5. How long we keep data

Session data (user ID, institution ID, last-activity timestamp) is updated on
each use and retained for as long as it is needed for the purposes described
in section 3. Users may request deletion of their data (see section 7).

## 6. Security

All data is transmitted over an encrypted connection (HTTPS).

## 7. User rights

Under the EU General Data Protection Regulation (GDPR), users have the right
to:

- find out what data is processed about them;
- request correction of inaccurate data;
- request deletion of their data;
- file a complaint with a data protection authority.

To submit a request, contact:
[support@archaeovision.eu](mailto:support@archaeovision.eu).

## 8. Changes

We may update this policy from time to time and will note the new effective
date at the top of the page. Material changes will also be announced within
the Extension's own interface.
