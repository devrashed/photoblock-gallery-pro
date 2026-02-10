<?php
// This file is generated. Do not modify it manually.
return array(
	'photo-gallery' => array(
		'apiVersion' => 2,
		'name' => 'photogallery/photo-gallery',
		'title' => 'PhotoBlocks Gallery',
		'version' => '1.0.0',
		'textdomain' => 'photoblocks-gallery',
		'category' => 'media',
		'icon' => 'format-gallery',
		'description' => 'A powerful Gutenberg block for creating responsive',
		'attributes' => array(
			'images' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'columns' => array(
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
			'captionStyle' => array(
				'type' => 'string',
				'default' => '1'
			),
			'imageSize' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'customWidth' => array(
				'type' => 'number',
				'default' => 0
			),
			'customHeight' => array(
				'type' => 'number',
				'default' => 0
			),
			'layoutType' => array(
				'type' => 'string',
				'default' => 'grid'
			),
			'showPagination' => array(
				'type' => 'boolean',
				'default' => false
			),
			'itemsPerPage' => array(
				'type' => 'number',
				'default' => 12
			),
			'currentPage' => array(
				'type' => 'number',
				'default' => 1
			),
			'align' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'imagepadding' => array(
				'type' => 'number',
				'default' => 2
			),
			'animationSpeed' => array(
				'type' => 'string',
				'default' => 25
			),
			'swiperautoplay' => array(
				'type' => 'boolean',
				'default' => true
			),
			'autoplayDelay' => array(
				'type' => 'number',
				'default' => 1500
			)
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'left',
				'right',
				'full',
				'wide'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'photo-gallery-editor',
		'style' => 'photo-gallery-style-frontend'
	)
);
