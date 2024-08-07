# 3D-Models-Hub

Hub for sharing 3D models.

## Tech Stack

**Client:** React, Material-UI, Vite

**Server:** SoftUni practice server

## Requirements

- Node LTS
- npm 9+
- Supabase Storage

## Run Locally

Clone the project

```bash
  git clone https://github.com/Krum-Kadiyski/3D-models-hub.git
```

Go to the project directory

```bash
  cd ./3D-models-hub
```

Go to the server directory

```bash
  cd ./server
```

Start the server

```bash
  node ./server
```

Go to the client directory

```bash
  cd ../client
```

Install dependencies

```bash
  npm install
```

Update the environment variables (described in the next section)

Start the client

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_SUPABASE_PROJECT_URL` - The project url in Supabase.

`VITE_SUPABASE_API_KEY` - The API key for Supabase.

`VITE_S3_BUCKET_NAME` - The bucket name in Supabase Storage.

`VITE_S3_ACCESS_KEY` - The Access Key for Supabase Storage.

`VITE_S3_SECRET` - The Secret for Supabase Storage.

## Authors

- [@Krum-Kadiyski](https://github.com/Krum-Kadiyski)
