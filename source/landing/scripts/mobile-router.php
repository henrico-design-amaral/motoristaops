<?php
declare(strict_types=1);

// Both variants use the same public URL. Do not cache HTML variants together.
header('Content-Type: text/html; charset=UTF-8');
header('Vary: User-Agent');
header('Cache-Control: private, no-store, no-cache, must-revalidate');
header('Pragma: no-cache');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

$ua = substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 1024);
$isPhone = preg_match('~iPhone|iPod|Android.*Mobile|Windows Phone|BlackBerry|BB10|webOS|Opera Mini|IEMobile|Mobile.*Safari|Googlebot-Smartphone~i', $ua) === 1;
$document = $isPhone ? __DIR__ . '/index.html' : dirname(__DIR__) . '/index.html';

if (!is_file($document) || !is_readable($document)) {
    http_response_code(503);
    header('Cache-Control: no-store');
    echo 'MotoristaOPS temporarily unavailable.';
    exit;
}

readfile($document);
