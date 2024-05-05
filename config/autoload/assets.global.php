<?php
return [
    'view_helper_config' => [
        'asset' => [
            'resource_map' => json_decode(file_get_contents(__DIR__ . '/../../assets/rev-manifest.json'), true),
        ],
    ],
];
