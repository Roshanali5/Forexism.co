# PowerShell script to kill process on port 5001
Write-Host "🔍 Checking port 5001..." -ForegroundColor Yellow

$port = 5001
$processes = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue

if ($processes) {
    $processes | ForEach-Object {
        $pid = $_.OwningProcess
        $processName = (Get-Process -Id $pid).ProcessName
        Write-Host "Found process: $processName (PID: $pid)" -ForegroundColor Cyan
        Stop-Process -Id $pid -Force
        Write-Host "✅ Killed process $pid" -ForegroundColor Green
    }
} else {
    Write-Host "✅ Port $port is free!" -ForegroundColor Green
}

Write-Host "`n🚀 You can now start the server with: npm start" -ForegroundColor Green

