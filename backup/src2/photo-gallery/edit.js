import {useBlockProps, MediaUpload, MediaUploadCheck,InspectorControls} from '@wordpress/block-editor';

import { Button, PanelBody, RangeControl, ToggleControl, SelectControl,} from '@wordpress/components';

import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
  const { images = [], columns = 3, gap = 16, showCaptions = true, imageSize = 'full', customWidth = 0, customHeight = 0,
    layoutType = 'grid', showPagination = false, itemsPerPage = 12, currentPage = 1, } = attributes;

  const onSelect = (newImages) => {
    setAttributes({
      images: newImages.map((img) => ({
        id: img.id,
        url: img.url,
        alt: img.alt,
        caption: img.caption,
        sizes: img.sizes || {},
      })),
      currentPage: 1, // Reset to first page when images change
    });
  };

  // Pagination image slice
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const imagesToDisplay = showPagination
    ? images.slice(startIndex, endIndex)
    : images;

  // Calculate total pages for pagination
  const totalPages = Math.ceil(images.length / itemsPerPage);

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__('Gallery Settings')} initialOpen={true}>
          <RangeControl
            label={__('Images Per Row')} value={columns}
            onChange={(value) => setAttributes({ columns: value })}
            min={1}
            max={6}
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
            label={__('Image Size')}
            value={imageSize}
            options={[
              { label: 'Full Size', value: 'full' },
              { label: 'Large', value: 'large' },
              { label: 'Medium', value: 'medium' },
              { label: 'Thumbnail', value: 'thumbnail' },
              { label: 'Custom', value: 'custom' },
            ]}
            onChange={(value) => setAttributes({ imageSize: value })}
          />

          {imageSize === 'custom' && (
            <>
              <RangeControl
                label={__('Custom Width (px)')}
                value={customWidth}
                onChange={(value) => setAttributes({ customWidth: value })}
                min={50}
                max={1200}
              />
              <RangeControl
                label={__('Custom Height (px)')}
                value={customHeight}
                onChange={(value) => setAttributes({ customHeight: value })}
                min={50}
                max={1200}
              />
            </>
          )}

          <SelectControl
            label={__('Gallery Layout')}
            value={layoutType}
            options={[
              { label: 'Grid Layout', value: 'grid' },
              { label: 'Carousel Layout Pro', value: 'carousel' },
              { label: 'Lightbox Layout Pro', value: 'lightbox' },
            ]}
            onChange={(value) => setAttributes({ layoutType: value })}
          />

          {layoutType === 'grid' && (
            <>
              <ToggleControl
                label={__('Pagination Show')}
                checked={showPagination}
                onChange={(value) => setAttributes({ showPagination: value, currentPage: 1 })}
              />

              {showPagination && (
                <SelectControl
                  label={__('Items Per Page')}
                  value={itemsPerPage}
                  options={[
                    { label: '4', value: 4 },
                    { label: '12', value: 12 },
                    { label: '16', value: 16 },
                    { label: '20', value: 20 },
                  ]}
                  onChange={(value) =>
                    setAttributes({ itemsPerPage: parseInt(value, 10), currentPage: 1 })
                  }
                />
              )}
            </>
          )}
        </PanelBody>
      </InspectorControls>

      
      {/* === Gallery Preview === */}

      <div {...useBlockProps({ className: 'my-gallery' })}>
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
            <div
              className="wpct_gallery__grid"
              style={{ '--columns': columns, '--gap': `${gap}px` }}
            >
              {imagesToDisplay.map((img) => (
                <div key={img.id} className="wpct_gallery__item">
                  <img
                    src={
                      imageSize === 'custom'
                        ? img.url
                        : img.sizes?.[imageSize]?.url || img.url
                    }
                    alt={img.alt}
                    style={
                      imageSize === 'custom'
                        ? {
                            width: customWidth ? `${customWidth}px` : 'auto',
                            height: customHeight ? `${customHeight}px` : 'auto',
                          }
                        : undefined
                    }
                  />
                  {showCaptions && img.caption && (
                    <figcaption>{img.caption}</figcaption>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination Button */}

            {showPagination && totalPages > 1 && (
              <div
                className="wpct_gallery__pagination"
                style={{ marginTop: '1em', textAlign: 'center' }}
              >
                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'primary' : 'secondary'}
                      onClick={() => setAttributes({ currentPage: page })}
                      style={{ margin: '0 4px', minWidth: '32px' }}
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>
            )}
            <MediaUploadCheck>
              <MediaUpload onSelect={onSelect} allowedTypes={['image']} multiple gallery value={images.map((img) => img.id)}
                render={({ open }) => (
                  <Button onClick={open} variant="secondary" style={{ marginTop: '1em' }} >
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