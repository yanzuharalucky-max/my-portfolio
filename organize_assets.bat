@echo off
echo ==========================================
echo Mengorganisir aset ke subfolder assets...
echo ==========================================

if not exist "assets\css" mkdir "assets\css"
if not exist "assets\images" mkdir "assets\images"
if not exist "assets\docs" mkdir "assets\docs"

if exist "style.css" move /Y "style.css" "assets\css\"

if exist "favicon.png" move /Y "favicon.png" "assets\images\"
if exist "LZ.png" move /Y "LZ.png" "assets\images\"
if exist "saya.jpeg" move /Y "saya.jpeg" "assets\images\"
if exist "LUXS.jpeg" move /Y "LUXS.jpeg" "assets\images\"
if exist "luki.jpeg" move /Y "luki.jpeg" "assets\images\"

if exist "cv-lucky-yan-zuhara.pdf" move /Y "cv-lucky-yan-zuhara.pdf" "assets\docs\"
if exist "CCNA.pdf" move /Y "CCNA.pdf" "assets\docs\"
if exist "CV LUCKY.jpeg" move /Y "CV LUCKY.jpeg" "assets\docs\"
if exist "assets\CV LUCKY.jpeg" move /Y "assets\CV LUCKY.jpeg" "assets\docs\"
if exist "CCNA_Switching.pdf" move /Y "CCNA_Switching.pdf" "assets\docs\"
if exist "CCNA-_Switching.pdf" (
    copy /Y "CCNA-_Switching.pdf" "assets\docs\CCNA_Switching.pdf"
    move /Y "CCNA-_Switching.pdf" "assets\docs\CCNA-_Switching.pdf"
)

echo.
echo ==========================================
echo Selesai! Semua aset berhasil dipindahkan.
echo ==========================================
