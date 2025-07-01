<?php
// This file is generated. Do not modify it manually.
return array(
	'photo-gallery' => array(
		'apiVersion' => 2,
		'name' => 'myplugin/photo-gallery',
		'title' => 'Photo Gallery',
		'category' => 'media',
		'icon' => 'format-gallery',
		'description' => 'A clean, responsive image grid gallery block.',
		'attributes' => array(
			'images' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'maxRows' => array(
				'type' => 'number',
				'default' => 3
			),
			'gap' => array(
				'type' => 'number',
				'default' => 16
			),
			'showCaptions' => array(
				'type' => 'boolean',
				'default' => true
			),
			'layout' => array(
				'type' => 'string',
				'default' => 'grid'
			)
		),
		'supports' => array(
			'html' => true
		),
		'editorScript' => 'file:./index.js',
		'style' => 'photo-gallery-style',
		'editorStyle' => 'photo-gallery-editor'
	)
);
