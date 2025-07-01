import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';

registerBlockType('myplugin/photo-gallery', {
  edit: Edit,
  save: Save,
});