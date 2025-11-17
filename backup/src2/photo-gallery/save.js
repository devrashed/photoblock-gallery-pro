import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    images = [],
    columns = 3,
    gap = 16,
    showCaptions = true,
    imageSize = 'full',
    customWidth = 0,
    customHeight = 0,
    showPagination = false,
    itemsPerPage = 12,
  } = attributes;

  // If no images, render empty div to maintain consistency
  if (images.length === 0) {
    return (
      <div {...useBlockProps.save({ className: 'wpct-gallery' })}>
        <div className="wpct_gallery__grid">
          {/* Empty state - no images */}
        </div>
      </div>
    );
  }

  const blockProps = useBlockProps.save({
    className: 'wpct-gallery',
  });

  return (
    <div {...blockProps}>
      <div
        className="wpct_gallery__grid"
        style={{ '--columns': columns, '--gap': `${gap}px` }}
        data-columns={columns}
        data-gap={gap}
        data-show-pagination={showPagination ? 'true' : 'false'}
        data-items-per-page={itemsPerPage}
        data-total-items={images.length}
      >
        {images.map((img, index) => {
          const imageUrl = imageSize === 'custom' 
            ? img.url 
            : (img.sizes && img.sizes[imageSize] && img.sizes[imageSize].url) || img.url;
          
          const imageStyles = imageSize === 'custom' && (customWidth || customHeight) 
            ? {
                width: customWidth ? `${customWidth}px` : 'auto',
                height: customHeight ? `${customHeight}px` : 'auto',
              }
            : {};

          return (
            <div 
              key={img.id || index} 
              className="wpct_gallery__item"
              data-image-id={img.id || index}
              data-index={index}
            >
              <img
                src={imageUrl}
                alt={img.alt || ''}
                style={Object.keys(imageStyles).length > 0 ? imageStyles : undefined}
              />
              {showCaptions && img.caption && (
                <figcaption dangerouslySetInnerHTML={{ __html: img.caption }} />
              )}
            </div>
          );
        })}
      </div>

      {showPagination && images.length > itemsPerPage && (
        <div className="wpct_gallery__pagination">
          <button className="wpct_gallery__pagination-prev" disabled>
            &laquo; Previous
          </button>
          <span className="wpct_gallery__pagination-info">
            Page <span className="current-page">1</span> of <span className="total-pages">{Math.ceil(images.length / itemsPerPage)}</span>
          </span>
          <button className="wpct_gallery__pagination-next">
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
}