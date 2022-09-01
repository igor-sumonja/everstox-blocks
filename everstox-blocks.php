<?php
/**
 * Plugin Name:       Everstox blocks
 * Description:       Custom blocks for Everstox site.
 * Requires at least: 5.9
 * Requires PHP:      8.0
 * Version:           0.1.0
 * Author:            Igor Sumonja
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       everstox
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_everstox_block_init() {
	register_block_type( __DIR__ . '/build/text-media' );
	register_block_type( __DIR__ . '/build/columns' );
	register_block_type( __DIR__ . '/build/column' );
}
add_action( 'init', 'create_block_everstox_block_init' );
