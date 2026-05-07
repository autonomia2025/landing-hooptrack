$html = Get-Content 'hooptrack_brandbook_con_boton_pdf_colores.html' -Raw -Encoding UTF8
$match = [regex]::Match($html, '<img class="logo-raster" src="data:image/png;base64,([^"]+)"')
if ($match.Success) {
    $base64 = $match.Groups[1].Value
    $bytes = [Convert]::FromBase64String($base64)
    [IO.File]::WriteAllBytes('logo.png', $bytes)
    Write-Host 'Logo extracted successfully.'
} else {
    Write-Host 'Not found'
}
