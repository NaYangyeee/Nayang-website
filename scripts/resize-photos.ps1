# Batch-processes raw photos into web-sized JPEGs.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/resize-photos.ps1 `
#     -Src F:\badminton -Dst public\assets\badminton -MaxEdge 1600 -Quality 82
#
# WeChat photos arrive at 4000x6000 and several megabytes — on a gallery page
# that is bandwidth spent on pixels no phone can show. One version per photo,
# longest edge capped, high-quality bicubic, JPEG ~82. Keeps the gallery under
# ~4 MB total with all fifteen images, and lazy loading handles the rest.

param(
  [string]$Src = 'F:\badminton',
  [string]$Dst = 'public\assets\badminton',
  [int]$MaxEdge = 1600,
  [int]$Quality = 82
)

Add-Type -AssemblyName System.Drawing

$dstFull = Join-Path (Get-Location) $Dst
New-Item -ItemType Directory -Force -Path $dstFull | Out-Null

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

$i = 0
Get-ChildItem $Src -Filter *.jpg | Sort-Object Name | ForEach-Object {
  $i++
  $img = [System.Drawing.Image]::FromFile($_.FullName)
  $scale = [Math]::Min(1.0, $MaxEdge / [Math]::Max($img.Width, $img.Height))
  $w = [int]($img.Width * $scale)
  $h = [int]($img.Height * $scale)

  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, 0, 0, $w, $h)

  $out = Join-Path $dstFull ('badminton-{0:d2}.jpg' -f $i)
  $bmp.Save($out, $codec, $params)

  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  Write-Output ('{0}  {1}x{2}  {3:N0} KB' -f (Split-Path $out -Leaf), $w, $h,
    ((Get-Item $out).Length / 1KB))
}
Write-Output ("done — $i photos -> " + $dstFull)
