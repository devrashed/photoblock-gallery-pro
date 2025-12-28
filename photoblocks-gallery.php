<?php
/**
 * Plugin Name:       Gutenberg PhotoBlocks Gallery
 * Description:       A powerful Gutenberg block for creating responsive and customizable photo galleries with grid, carousel, and lightbox layouts.
 * Version:           1.0.1
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Md.Rashed khan
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       photoblocks-gallery
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
	function wpct_create_block_photo_gallery_init() {
		/**
		 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
		 * based on the registered block metadata.
		 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
		 *
		 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
		 */
		if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
			wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
			return;
		}

		/**
		 * Registers the block(s) metadata from the `blocks-manifest.php` file.
		 * Added to WordPress 6.7 to improve the performance of block type registration.
		 *
		 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
		 */
		if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
			wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
		}
		/**
		 * Registers the block type(s) in the `blocks-manifest.php` file.
		 *
		 * @see https://developer.wordpress.org/reference/functions/register_block_type/
		 */
		$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
		foreach ( array_keys( $manifest_data ) as $block_type ) {
			register_block_type( __DIR__ . "/build/{$block_type}" );
		}
	}

	add_action( 'init', 'wpct_create_block_photo_gallery_init' );

	function wpct_photo_gallery_block_register_assets() {
		
		wp_register_style(
			'photo-gallery-style-frontend',
			plugins_url( 'src/photo-gallery/style.css', __FILE__ ), // Correct relative URL
			array(),
			filemtime( plugin_dir_path( __FILE__ ) . 'src/photo-gallery/style.css' )
		);

		wp_register_style(
			'photo-gallery-editor',
			plugins_url( 'src/photo-gallery/editor.css', __FILE__ ), // Correct relative URL
			array( 'wp-edit-blocks' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'src/photo-gallery/editor.css' )
		);

		// Grid Frontend JavaScript (only on frontend)
		if (!is_admin()) {
			wp_enqueue_script(
				'photo-gallery-block-frontend',
				plugins_url('src/photo-gallery/frontend.js', __FILE__),
				array(),
				filemtime(plugin_dir_path(__FILE__) . 'src/photo-gallery/frontend.js'),
				true
			);
		
		  // lightbox Frontend JavaScript (only on frontend)
			wp_enqueue_script(
				'photo-gallery-block-lightbox',
				plugins_url('src/photo-gallery/lightbox-frontned.js', __FILE__),
				array(),
				filemtime(plugin_dir_path(__FILE__) . 'src/photo-gallery/lightbox-frontned.js'),
				true
			);
		
			// imageviewr Frontend JavaScript (only on frontend)

			wp_enqueue_script(
				'imageviewr-gallery-layout',
				plugins_url('src/photo-gallery/imageviewr-frontend.js', __FILE__),
				array(),
				filemtime(plugin_dir_path(__FILE__) . 'src/photo-gallery/imageviewr-frontend.js'),
				true
			);


			// masonry Frontend JavaScript (only on frontend)

			wp_enqueue_script(
				'mosonary-gallery-layout',
				plugins_url('src/photo-gallery/masonary-frontend.js', __FILE__),
				array(),
				filemtime(plugin_dir_path(__FILE__) . 'src/photo-gallery/masonary-frontend.js'),
				true
			);
		
			// swiper Frontend JavaScript (only on frontend)
		
			wp_enqueue_style(
			'swiper-gallery-style-frontend',
			'https://cdnjs.cloudflare.com/ajax/libs/Swiper/6.8.4/swiper-bundle.min.css',
			array(),
			null
			);
		
			// Swiper JS (must load BEFORE your swiper file)
			wp_enqueue_script(
				'swiper-bundle-js',
				'https://cdnjs.cloudflare.com/ajax/libs/Swiper/6.8.4/swiper-bundle.min.js',
				array(),
				null,
				true
			);
			// Swiper JS (must load BEFORE your swiper file)
			wp_enqueue_script(
				'swiper-gallery-layout',
				plugins_url('src/photo-gallery/swiper-frontend.js', __FILE__),
				array('swiper-bundle-js'), // <-- IMPORTANT
				filemtime(plugin_dir_path(__FILE__) . 'src/photo-gallery/swiper-frontend.js'),
				true
			);

			// Custom Masonary pagination
			wp_enqueue_script(
				'masonry-layout',
				plugins_url('src/photo-gallery/custom-masonary-frontend.js', __FILE__),
				array(), // <-- IMPORTANT
				filemtime(plugin_dir_path(__FILE__) . 'src/photo-gallery/custom-masonary-frontend.js'),
				true
			);

			// FancyBox pagination

			wp_enqueue_script(
				'fancybox-layout',
				plugins_url('src/photo-gallery/fancybox.js', __FILE__),
				array(), // <-- IMPORTANT
				filemtime(plugin_dir_path(__FILE__) . 'src/photo-gallery/fancybox.js'),
				true
			);

			// fancybox
			wp_enqueue_style(
				'fancybox-css',
				'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css',
				[],
				'3.5.7'
			);

			wp_enqueue_script(
				'fancybox-js',
				'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js',
				['jquery'],
				'3.5.7',
				true
			);	
		}	
	}

	
	add_action( 'init', 'wpct_photo_gallery_block_register_assets', 9 );

	function wpc_fancybox_init_script() {
    if ( ! is_admin() ) {
        ?>
        <script>
			jQuery(document).ready(function ($) {
			jQuery('.wpc_container a[data-fancybox="gallery"]').fancybox({
				loop: true,
				 buttons: [
                        "slideShow",
                        "thumbs",
                        "zoom",
                        "fullScreen",
                        "share",
                        "close"
                    ],
				});
			});
		</script>
        <?php
    }
}
add_action('wp_footer', 'wpc_fancybox_init_script', 100);
