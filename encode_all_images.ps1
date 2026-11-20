$images = @(
    'C:\Users\A2DIGI\Downloads\teonox-website-main\teonox-website-main\public\images\marketing-uncovered-hero.webp',
    'C:\Users\A2DIGI\Downloads\teonox-website-main\teonox-website-main\public\fonts\Amit-Teonox.webp',
    'C:\Users\A2DIGI\Downloads\teonox-website-main\teonox-website-main\public\icons.svg',
    'C:\Users\A2DIGI\Downloads\teonox-website-main\teonox-website-main\public\images\teonox-logo.svg'
)

$imageMap = @{}
foreach ($img in $images) {
    $data = [System.IO.File]::ReadAllBytes($img)
    $b64 = [Convert]::ToBase64String($data)
    $name = [System.IO.Path]::GetFileNameWithoutExtension($img)
    $ext = [System.IO.Path]::GetExtension($img).TrimStart('.')
    $mime = if ($ext -eq 'webp') { 'image/webp' } elseif ($ext -eq 'svg') { 'image/svg+xml' } elseif ($ext -eq 'png') { 'image/png' } else { 'application/octet-stream' }
    $uri = "data:$mime;base64,$b64"
    $imageMap[$name] = $uri
    Write-Output "$name`t$uri"
}

# Also add the career-unlocked logos
$careerUnlockedImages = @(
    'C:\Users\A2DIGI\Downloads\teonox-website-main\teonox-website-main\public\career-unlocked\media\logo-on-light.webp',
    'C:\Users\A2DIGI\Downloads\teonox-website-main\teonox-website-main\public\career-unlocked\media\logo-on-dark.webp'
)

foreach ($img in $careerUnlockedImages) {
    $data = [System.IO.File]::ReadAllBytes($img)
    $b64 = [Convert]::ToBase64String($data)
    $name = [System.IO.Path]::GetFileNameWithoutExtension($img)
    $ext = [System.IO.Path]::GetExtension($img).TrimStart('.')
    $mime = if ($ext -eq 'webp') { 'image/webp' } else { 'application/octet-stream' }
    $uri = "data:$mime;base64,$b64"
    $imageMap[$name] = $uri
    Write-Output "$name`t$uri"
}