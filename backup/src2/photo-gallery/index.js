import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';

registerBlockType('rk-wpcraft/photo-gallery', {
  edit: Edit,
  save: Save,
}); 