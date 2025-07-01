import {
  useBlockProps,
  MediaUpload,
  MediaUploadCheck,
  InspectorControls,
} from '@wordpress/block-editor';


import { Button, PanelBody, RangeControl, ToggleControl, SelectControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
  const { images = [], maxRows = 3, gap = 16, showCaptions = true, layout = 'grid'} = attributes;
  const blockProps = useBlockProps();

  const onSelect = (newImages) => {
    setAttributes({
      images: newImages.map((img) => ({
        id: img.id,
        url: img.url,
        alt: img.alt,
        caption: img.caption,
      })),
    });
  };

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__('Gallery Settings')} initialOpen={true}>
          <RangeControl
            label={__('Max Rows')}
            value={maxRows}
            onChange={(value) => setAttributes({ maxRows: value })}
            min={1}
            max={5}
          />
         <RangeControl
            label={__('Space Between Images')}
            value={gap}
            onChange={(value) => setAttributes({ gap: value })}
            min={8}
            max={100}
          />
          <ToggleControl
            label={__('Show Captions')}
            checked={showCaptions}
            onChange={(value) => setAttributes({ showCaptions: value })}
          />
          <SelectControl
            label={__('Gallery Layout')}
            value={layout}
            options={[
              { label: __('Grid'), value: 'grid' },
              { label: __('Masonry'), value: 'masonry' },
            ]}
            onChange={(value) => setAttributes({ layout: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...useBlockProps({className:"my-gallery"})} >
        {images.length === 0 ? (
          <MediaUploadCheck>
            <MediaUpload
              onSelect={onSelect}
              allowedTypes={['image']}
              multiple
              gallery
              render={({ open }) => (
                <Button variant="primary" onClick={open}>
                  {__('Add to Gallery')}
                </Button>
              )}
            />
          </MediaUploadCheck>
        ) : (
          <Fragment>
           <div className={`my-gallery__grid layout-${layout}`}  style={{ '--columns': maxRows, '--gap': `${gap}px` }}>
            {images.slice(0, maxRows).map((img) => (
              <figure key={img.id} className="my-gallery__item">
                <img src={img.url} alt={img.alt} />
                {showCaptions && img.caption && <figcaption>{img.caption}</figcaption>}
              </figure>
            ))}
          </div>

            <MediaUploadCheck>
              <MediaUpload
                onSelect={onSelect}
                allowedTypes={['image']}
                multiple
                gallery 
                value={images.map((img) => img.id)}
                render={({ open }) => (
                  <Button
                    onClick={open}
                    variant="secondary"
                    style={{ marginTop: '1em' }}
                  >
                    {__('Edit Gallery')}
                  </Button>
                )}
              />
            </MediaUploadCheck>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}
