# Teras Farm Landing - Production Deployment

## Prerequisites

1. **Node.js** 18+ installed
2. **PM2** installed globally: `npm install -g pm2`
3. **MySQL** database configured

## Environment Setup

Copy the environment template and configure:

```bash
cp .env.example .env
```

Required variables in `.env`:
```env
DATABASE_URL="mysql://user:password@localhost:3306/teras_farm"
ADMIN_PASSWORD="your-secure-admin-password"
ADMIN_SESSION_SECRET="your-random-secret-key"
NODE_ENV="production"
```

## Deployment Steps

### 1. Install Dependencies
```bash
npm install
# or
bun install
```

### 2. Generate Prisma Client
```bash
npm run db:generate
```

### 3. Push Database Schema
```bash
npm run db:push
```

### 4. Seed Database (Optional)
```bash
npm run db:seed
```

### 5. Build for Production
```bash
npm run build
```

### 6. Start with PM2
```bash
npm run pm2:start
```

Or use the combined command:
```bash
npm run deploy
```

## PM2 Commands

| Command | Description |
|---------|-------------|
| `npm run pm2:start` | Start the application |
| `npm run pm2:stop` | Stop the application |
| `npm run pm2:restart` | Restart the application |
| `npm run pm2:delete` | Remove from PM2 |
| `npm run pm2:logs` | View application logs |
| `npm run pm2:monit` | Open PM2 monitoring |

## Auto-start on System Boot

To make PM2 start automatically on system boot:

```bash
pm2 startup
pm2 save
```

## Updating the Application

```bash
git pull
npm install
npm run build
npm run pm2:restart
```

## Logs

Application logs are stored in:
- `./logs/out.log` - Standard output
- `./logs/error.log` - Error logs

View logs with:
```bash
npm run pm2:logs
# or
tail -f logs/out.log
```

## Health Check

The application runs on port 3000 by default. Check if it's running:

```bash
curl http://localhost:3000
```

## Troubleshooting

### Application won't start
1. Check logs: `npm run pm2:logs`
2. Verify `.env` file exists with correct values
3. Ensure database is accessible

### Database connection errors
1. Verify `DATABASE_URL` is correct
2. Check MySQL is running: `systemctl status mysql`
3. Test connection: `mysql -u user -p -h localhost teras_farm`
