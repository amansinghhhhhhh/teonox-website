<?php
/**
 * Plugin Name: TEONOX CORS Fix
 * Description: Adds CORS headers for teonox.com to access cms.teonox.com REST API
 * Version: 1.0
 */

add_action('rest_api_init', function () {
    header('Access-Control-Allow-Origin: https://teonox.com');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
});

add_action('init', function () {
    header('Access-Control-Allow-Origin: https://teonox.com');
});
