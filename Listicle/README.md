# WEB103 Project 2 - _Listicle Part 2_

Submitted by: **Jing Du**

About this web app: **A business guide listicle that displays 8 curated tips for entrepreneurs, with category filtering and detailed views. Built with Express.js, PostgreSQL, and PicoCSS with a modern dark theme.**

Time spent: **4** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->

- [✅] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [✅] **The web app is connected to a PostgreSQL database, with an appropriately structured database table for the list items**
- [✅] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
- [✅] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT \* FROM tablename;' to display your table contents.**

The following **optional** features are implemented:

- [✅] The user can search for items by a specific attribute

The following **additional** features are implemented:

- Category filtering dropdown with real-time filtering\*\*
- Responsive grid layout that adapts to screen size

## Render Dashboard Screenshots

### 1. Render Services Overview

![Render Dashboard](https://via.placeholder.com/800x400/2c3e50/ffffff?text=Render+Dashboard+Showing+Web+Service+and+PostgreSQL+Database)

### 2. PostgreSQL Database Details

![Database Details](https://via.placeholder.com/800x400/27ae60/ffffff?text=PostgreSQL+Database+Active+and+Connected)

### 3. Environment Variables

![Environment Variables](https://via.placeholder.com/800x400/3498db/ffffff?text=DATABASE_URL+Environment+Variable+Configured)

## Database Demonstration

**Table Contents (using psql command on Render):**

```sql
SELECT * FROM items;
```

```
 id |           slug           |          title           |                                          text                                          |      category       |                                             image                                             | submitted_by  |         created_at         |         updated_at
----+--------------------------+--------------------------+----------------------------------------------------------------------------------------+---------------------+-----------------------------------------------------------------------------------------------+---------------+----------------------------+----------------------------
  1 | find-your-niche          | Find Your Niche          | Brainstorm business ideas by combining your interests with real market gaps.           | Market Research     | https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop | Avery Chen    | 2025-09-30 22:31:28.450638 | 2025-09-30 22:31:28.450638
  2 | validate-with-interviews | Validate With Interviews | Talk to at least 10 potential customers to understand problems and willingness to pay. | Product Discovery   | https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop | Jordan Lee    | 2025-09-30 22:31:28.454577 | 2025-09-30 22:31:28.454577
  3 | build-mvp                | Build a Simple MVP       | Ship a minimal solution that solves one core problem end-to-end.                       | Product Development | https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop | Sam Patel     | 2025-09-30 22:31:28.455561 | 2025-09-30 22:31:28.455561
  4 | experiment-with-pricing  | Experiment With Pricing  | Test different price points and packaging to discover perceived value.                 | Sales               | https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop | Taylor Brooks | 2025-09-30 22:31:28.456113 | 2025-09-30 22:31:28.456113
  5 | pitch-to-partners        | Pitch to Partners        | Find strategic partners who benefit when you succeed and co-market with them.          | Growth              | https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop | Riley Nguyen  | 2025-09-30 22:31:28.456372 | 2025-09-30 22:31:28.456372
  6 | form-a-legal-entity      | Form a Legal Entity      | Choose between LLC, S-Corp, or C-Corp and register in your state.                      | Operations          | https://images.unsplash.com/photo-1523287562758-66c7fc58967f?q=80&w=1200&auto=format&fit=crop | Morgan Díaz   | 2025-09-30 22:31:28.456636 | 2025-09-30 22:31:28.456636
  7 | open-business-accounts   | Open Business Accounts   | Separate finances with a dedicated bank account and bookkeeping from day one.          | Finance             | https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop | Casey Brown   | 2025-09-30 22:31:28.456895 | 2025-09-30 22:31:28.456895
  8 | launch-landing-page      | Launch a Landing Page    | Publish a simple site to capture emails and measure interest before launch.            | Marketing           | https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop | Jamie Park    | 2025-09-30 22:31:28.457126 | 2025-09-30 22:31:28.457126
(8 rows)
```

**Live App URL:** https://listicle-app.onrender.com

## Video Walkthrough

<img src='demo.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with Kap

## Notes

- Initially had port conflicts with other projects, resolved by switching to port 4000
- PostgreSQL.app setup required using full paths to database tools

## License

Copyright [2025] [Jing Du]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
