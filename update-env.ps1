# PowerShell script to update .env file with MongoDB connection string
# Usage: .\update-env.ps1

param(
    [Parameter(Mandatory=$true)]
    [string]$ClusterUrl
)

$username = "akshat111bkg_db_user"
$password = "9MMnuo5K00Kxad2S"
$dbName = "ecommerce"

$connectionString = "mongodb+srv://${username}:${password}@${ClusterUrl}/${dbName}?retryWrites=true&w=majority"

$envContent = @"
MONGODB_URI=$connectionString
PORT=5000
SEED_KEY=changeme
REACT_APP_API_URL=http://localhost:5000
"@

$envPath = "server\.env"
$envContent | Out-File -FilePath $envPath -Encoding utf8

Write-Host "✅ .env file updated successfully!" -ForegroundColor Green
Write-Host "Connection string: $connectionString" -ForegroundColor Cyan

