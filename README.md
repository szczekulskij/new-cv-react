# Jan Szczekulski - Personal Website

Personal website built with Next.js 14, Tailwind CSS, and hosted on AWS (S3 + CloudFront via CDK).

## How It Works

This site uses **Next.js static export** (`output: 'export'` in next.config.js). At build time, Next.js compiles all pages into plain HTML, CSS, and JS files in an `out/` directory. **No server is needed at runtime** - the output is just static files that get uploaded to S3 and served through CloudFront's CDN.

The flow:
1. `npm run build` → generates static HTML/CSS/JS into `out/`
2. CDK deploys those files to an S3 bucket
3. CloudFront serves them globally with HTTPS and caching

This means the site is fast, cheap to host (pennies/month), and infinitely scalable.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Writing Blog Posts

1. Create a new `.md` file in `content/blog/`:
   ```bash
   cp content/blog/_template.md content/blog/my-new-post.md
   ```

2. Edit the frontmatter and write your content:
   ```markdown
   ---
   title: My New Post
   description: What this post is about
   date: 2024-06-15
   tags: ["topic1", "topic2"]
   GHlink: https://github.com/your-repo
   ---

   Your markdown content here...
   ```

3. Commit and push. Rebuild and redeploy.

No CMS, no database, no config changes needed. Just a markdown file.

## Project Structure

```
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.tsx          # Homepage
│   │   ├── blog/             # Blog listing + individual posts
│   │   ├── globals.css       # Global styles + Tailwind
│   │   └── layout.tsx        # Root layout (header, footer)
│   ├── components/           # React components
│   └── lib/
│       └── blog.ts           # Blog utilities (reads/parses markdown)
├── content/
│   └── blog/                 # Blog posts (Markdown files go here)
├── infra/                    # AWS CDK infrastructure
│   ├── lib/website-stack.ts  # S3 + CloudFront stack
│   └── bin/app.ts            # CDK app entry point
├── public/                   # Static assets (images, resume, etc.)
├── next.config.js            # Next.js config (static export)
├── tailwind.config.ts        # Tailwind theme/colors
└── tsconfig.json             # TypeScript config
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server (hot reload) |
| `npm run build` | Build static site to `out/` |
| `npm run start` | Serve the built site locally |
| `npm run lint` | Run ESLint |

## Deploying to AWS

### Prerequisites

- AWS CLI configured (`aws configure`)
- CDK CLI installed (`npm install -g aws-cdk`)
- CDK bootstrapped in your account (`cdk bootstrap aws://ACCOUNT/REGION`)

### Deploy

```bash
# 1. Build the static site
npm run build

# 2. Deploy infrastructure + upload files
cd infra
npm install
npx cdk deploy
```

The deploy output will show your CloudFront URL.

### With Custom Domain

If you have a domain and an ACM certificate (must be in us-east-1 for CloudFront):

```bash
npx cdk deploy \
  --context domainName=jan-cs.com \
  --context certificateArn=arn:aws:acm:us-east-1:ACCOUNT:certificate/CERT-ID
```

Then point your domain's DNS (CNAME or alias) to the CloudFront distribution domain name.

## Tech Stack

- **Framework**: Next.js 14 (App Router, static export)
- **Styling**: Tailwind CSS
- **Blog**: Markdown files parsed with gray-matter
- **Hosting**: AWS S3 + CloudFront (provisioned via CDK)
- **Language**: TypeScript
