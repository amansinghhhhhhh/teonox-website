$images = @(
    'C:\Users\A2DIGI\Downloads\teonox-website-main\teonox-website-main\public\images\marketing-uncovered-hero.webp',
    'C:\Users\A2DIGI\Downloads\teonox-website-main\teonox-website-main\public\fonts\Amit-Teonox.webp',
    'C:\Users\A2DIGI\Downloads\teonox-website-main\teonox-website-main\public\icons.svg'
)

foreach ($img in $images) {
    $data = [System.IO.File]::ReadAllBytes($img)
    $b64 = [Convert]::ToBase64String($data)
    $name = [System.IO.Path]::GetFileNameWithoutExtension($img)
    $ext = [System.IO.Path]::GetExtension($img).TrimStart('.')
    $mime = if ($ext -eq 'webp') { 'image/webp' } elseif ($ext -eq 'svg') { 'image/svg+xml' } elseif ($ext -eq 'png') { 'image/png' } else { 'application/octet-stream' }
    $uri = "data:$mime;base64,$b64"
    $output = "$name`t$uri"
    Write-Output $output
}