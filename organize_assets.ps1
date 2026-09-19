$ErrorActionPreference = "SilentlyContinue"

# 1. Buat subfolder
New-Item -ItemType Directory -Force -Path "assets/css", "assets/images", "assets/docs" | Out-Null

# 2. Pindahkan CSS
if (Test-Path "style.css") { Move-Item -Force "style.css" "assets/css/" }

# 3. Pindahkan Gambar
@("favicon.png", "LZ.png", "saya.jpeg", "LUXS.jpeg", "luki.jpeg") | ForEach-Object {
    if (Test-Path $_) { Move-Item -Force $_ "assets/images/" }
}

# 4. Pindahkan Dokumen
@("cv-lucky-yan-zuhara.pdf", "CCNA.pdf", "CV LUCKY.jpeg") | ForEach-Object {
    if (Test-Path $_) { Move-Item -Force $_ "assets/docs/" }
}
if (Test-Path "assets/CV LUCKY.jpeg") { Move-Item -Force "assets/CV LUCKY.jpeg" "assets/docs/" }

if (Test-Path "CCNA-_Switching.pdf") {
    Copy-Item -Force "CCNA-_Switching.pdf" "assets/docs/CCNA_Switching.pdf"
    Move-Item -Force "CCNA-_Switching.pdf" "assets/docs/CCNA-_Switching.pdf"
} elseif (Test-Path "CCNA_Switching.pdf") {
    Move-Item -Force "CCNA_Switching.pdf" "assets/docs/"
}

Write-Host "Berhasil memindahkan semua aset ke subfolder assets/" -ForegroundColor Green
