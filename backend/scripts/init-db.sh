#!/bin/bash
set -e

# Load environment variables
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Default values
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-postpilot}
DB_USER=${DB_USER:-postgres}
DB_PASSWORD=${DB_PASSWORD:-postgres}

# Check if PostgreSQL is running
if ! pg_isready -h $DB_HOST -p $DB_PORT > /dev/null 2>&1; then
  echo "PostgreSQL is not running on $DB_HOST:$DB_PORT"
  exit 1
fi

# Create database and user if they don't exist
echo "Setting up database '$DB_NAME' and user '$DB_USER'..."

# Connect to the default postgres database to run administrative commands
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "
  DO \$\$
  BEGIN
    -- Create the database if it doesn't exist
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME') THEN
      CREATE DATABASE $DB_NAME;
      RAISE NOTICE 'Database created';
    ELSE
      RAISE NOTICE 'Database already exists';
    END IF;

    -- Create the user if it doesn't exist
    IF NOT EXISTS (SELECT FROM pg_user WHERE usename = '$DB_USER') THEN
      CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';
      RAISE NOTICE 'User created';
    ELSE
      RAISE NOTICE 'User already exists';
    END IF;

    -- Grant privileges
    GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
    RAISE NOTICE 'Privileges granted';
  END
  \$\$;
"

echo "Database setup complete!"
echo "You can now run migrations with: npm run db:migrate"
