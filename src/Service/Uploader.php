<?php

namespace App\Service;

class Uploader {

public function upload(string $base64): string {

    $filename = uniqid() . '.jpg';

    $exploded = explode(',', $base64, 2);

    if(isset($exploded[1])) {

        $encoded = $exploded[1];

        $decoded = base64_decode($encoded);

        $img = \imagecreatefromstring($decoded);

        if(!$img) {

            throw new \Exception('Invalid image data');

        }

        if(!is_dir('uploads')) {

            mkdir('uploads');

        }

        $filepath = 'uploads/' . $filename;

        imagejpeg($img, $filepath);

        imagedestroy($img);

        return $filepath;

    } else {

        throw new \Exception('Invalid base64 string');

    }

}
}