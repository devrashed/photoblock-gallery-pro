import { useBlockProps, BlockControls, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';

import { ToolbarGroup, RadioControl, ToolbarButton, Button, PanelBody, RangeControl, ToggleControl, SelectControl, TabPanel } from '@wordpress/components';

import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {

  const {
    images = [],
    columns = 3,
    gap = 16,
    showCaptions = true,
    imageSize = 'full',
    customWidth = 0,
    customHeight = 0,
    layoutType = 'grid',
    showPagination = false,
    itemsPerPage = 12,
    currentPage = 1,
    // Image Browser specific attributes
    browserCurrentImage = 0,
    browserShowThumbnails = true,
    browserShowNavigation = true,
    browserShowCounter = true,
    browserAutoFullscreen = false,
    browserZoomEnabled = true,
    ImgbackgroundColor = '#000000',
    ImgCaptionColor = '#ffffff',

    // Masonry specific attributes
    masonryBorderRadius = 8,
    masonryImageBorder = 0,
    masonryImageBorderColor = '#e0e0e0',
    masonryImageBorderStyle = 'solid',

    // NEW STYLE ATTRIBUTES
    // Grid Style attributes
    gridBackgroundColor = '#000000',
    grindCaptionColor = '#ffffff',
    GtBgap = 0,

    // Lightbox Style attributes
    lightboxOverlayColor = 'rgba(0, 0, 0, 0.8)',
    lightboxIconColor = '#ffffff',
    lightboxHoverScale = 1.05,

    LightBackgroundColor = '#000000',
    LightCaptionColor = '#ffffff',
    LighttBgap = 0,

    // Masonry Style attributes (additional to existing)
    masonryHoverEffect = 'lift',
    masonryImageOpacity = 1,

    // Infinite Carousel attributes
    alignx='center',

  } = attributes;

  const onSelect = (newImages) => {
    setAttributes({
      images: newImages.map((img) => ({
        id: img.id,
        url: img.url,
        alt: img.alt,
        caption: img.caption,
        sizes: img.sizes || {},
      })),
      currentPage: 1,
      currentSlide: 0,
      browserCurrentImage: 0
    });
  };

  // Pagination image slice
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const imagesToDisplay = showPagination ? images.slice(startIndex, endIndex) : images;

  // Calculate total pages for pagination
  const totalPages = Math.ceil(images.length / itemsPerPage);

  // Handle image browser navigation
  const handleBrowserImageChange = (imageIndex) => {
    setAttributes({ browserCurrentImage: imageIndex });
  };

  const nextBrowserImage = () => {
    const nextIndex = (browserCurrentImage + 1) % images.length;
    setAttributes({ browserCurrentImage: nextIndex });
  };

  const prevBrowserImage = () => {
    const prevIndex = browserCurrentImage === 0 ? images.length - 1 : browserCurrentImage - 1;
    setAttributes({ browserCurrentImage: prevIndex });
  };

  return (
    <Fragment>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon="grid-view"
            isPressed={layoutType === 'grid'}
            onClick={() => setAttributes({ layoutType: 'grid' })}
          >
            {__('Grid', 'photoblocks-gallery')}
          </ToolbarButton>

          <ToolbarButton
            icon="format-gallery"
            isPressed={layoutType === 'lightbox'}
            onClick={() => setAttributes({ layoutType: 'lightbox' })}
          >
            {__('Lightbox', 'photoblocks-gallery')}
          </ToolbarButton>

          <ToolbarButton
            icon="schedule"
            isPressed={layoutType === 'masonry'}
            onClick={() => setAttributes({ layoutType: 'masonry' })}
          >
            {__('Masonry', 'photoblocks-gallery')}
          </ToolbarButton>

          <ToolbarButton
            icon="cover-image"
            isPressed={layoutType === 'imagebrowser'}
            onClick={() => setAttributes({ layoutType: 'imagebrowser' })}
          >
            {__('Image Browser', 'photoblocks-gallery')}
          </ToolbarButton>

          <ToolbarButton
            icon="cover-image"
            isPressed={layoutType === 'infinite'}
            onClick={() => setAttributes({ layoutType: 'infinite' })}
          >
            {__('Infinite Carousel', 'photoblocks-gallery')}
          
          </ToolbarButton>


          <ToolbarButton
            icon="cover-image"
            disabled={true}
          >
            {__('Wave Gallery', 'photoblocks-gallery')}
            <span className="pro-badge">PRO</span>
          </ToolbarButton>

          <ToolbarButton
            icon="cover-image"
            disabled={true}
          >
            {__('Image Center', 'photoblocks-gallery')}
            <span className="pro-badge">PRO</span>
          </ToolbarButton>

        </ToolbarGroup>
      </BlockControls>


      <InspectorControls>

        <div className="tab-content-settings">
          <PanelBody title={__('Layout & Display')} initialOpen={true}>
            <SelectControl
              label={__('Gallery Layout')}
              value={layoutType}
              options={[
                { label: 'Grid Layout', value: 'grid' },
                { label: 'Lightbox Layout', value: 'lightbox' },
                { label: 'Image browser Layout', value: 'imagebrowser' },
                { label: 'Masonry Layout', value: 'masonry' },
                { label: 'Infinite Carousel', value : 'infinite'},
                { label: 'Wave Gallery (PRO 🔒)', value: 'wave', disabled: true },
                { label: 'Image Center (PRO 🔒)', value: 'center', disabled: true },
              ]}
              onChange={(value) => setAttributes({ layoutType: value })}
            />

            {layoutType !== 'infinite' && layoutType !== 'imagebrowser' && (
              <RangeControl
                label={__('Images Per Row')}
                value={columns}
                onChange={(value) => setAttributes({ columns: value })}
                min={1}
                max={6}
              />
            )}

            {layoutType !== 'imagebrowser' && (
              <RangeControl
                label={__('Space Between Images')}
                value={gap}
                onChange={(value) => setAttributes({ gap: value })}
                min={8}
                max={100}
              />
            )}

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

            {(layoutType === 'grid' || layoutType === 'lightbox' || layoutType === 'masonry') && (
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
                      { label: '8', value: 8 },
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

          {layoutType === 'imagebrowser' && (
            <PanelBody title={__('Image Browser Settings')} initialOpen={true}>
              <ToggleControl
                label={__('Show Thumbnails')}
                checked={browserShowThumbnails}
                onChange={(value) => setAttributes({ browserShowThumbnails: value })}
              />

              <ToggleControl
                label={__('Show Navigation Arrows')}
                checked={browserShowNavigation}
                onChange={(value) => setAttributes({ browserShowNavigation: value })}
              />

              <ToggleControl
                label={__('Show Image Counter')}
                checked={browserShowCounter}
                onChange={(value) => setAttributes({ browserShowCounter: value })}
              />

              <ToggleControl
                label={__('Enable Zoom & Pan')}
                checked={browserZoomEnabled}
                onChange={(value) => setAttributes({ browserZoomEnabled: value })}
              />

              <ToggleControl
                label={__('Auto Fullscreen Mode')}
                checked={browserAutoFullscreen}
                onChange={(value) => setAttributes({ browserAutoFullscreen: value })}
              />
            </PanelBody>
          )}
        </div>

      </InspectorControls>


      <InspectorControls group='styles'>

        <div className="tab-content-styles">
          <PanelBody title={__('Appearance')} initialOpen={true}>
            {/* Grid Layout Styles */}
            {layoutType === 'grid' && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' }}>
                    {__('Background Color')}
                  </label>
                  <input
                    type="color"
                    value={gridBackgroundColor}
                    onChange={(e) => setAttributes({ gridBackgroundColor: e.target.value })}
                    style={{ width: '100%', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' }}>
                    {__('Text Color')}
                  </label>
                  <input
                    type="color"
                    value={grindCaptionColor}
                    onChange={(e) => setAttributes({ grindCaptionColor: e.target.value })}
                    style={{ width: '100%', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' }}>
                    {__('padding')}
                  </label>
                  <RangeControl
                    label={__('Top Bottom Padding (px)')}
                    value={GtBgap}
                    onChange={(value) => setAttributes({ GtBgap: value })}
                    min={0}
                    max={100}
                  />
                </div>
              </>
            )}

            {/* Lightbox Layout Styles */}
            {layoutType === 'lightbox' && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' }}>
                    {__('Background Color')}
                  </label>
                  <input
                    type="color"
                    value={LightBackgroundColor}
                    onChange={(e) => setAttributes({ LightBackgroundColor: e.target.value })}
                    style={{ width: '100%', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' }}>
                    {__('Text Color')}
                  </label>
                  <input
                    type="color"
                    value={LightCaptionColor}
                    onChange={(e) => setAttributes({ LightCaptionColor: e.target.value })}
                    style={{ width: '100%', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' }}>
                    {__('padding')}
                  </label>
                  <RangeControl
                    label={__('Top Bottom Padding (px)')}
                    value={LighttBgap}
                    onChange={(value) => setAttributes({ LighttBgap: value })}
                    min={0}
                    max={100}
                  />
                </div>
              </>
            )}

            {/* Masonry Layout Styles */}
            {layoutType === 'masonry' && (
              <>
                <RangeControl
                  label={__('Border Radius (px)')}
                  value={masonryBorderRadius}
                  onChange={(value) => setAttributes({ masonryBorderRadius: value })}
                  min={0}
                  max={50}
                />

                <RangeControl
                  label={__('Image Border Width (px)')}
                  value={masonryImageBorder}
                  onChange={(value) => setAttributes({ masonryImageBorder: value })}
                  min={0}
                  max={20}
                />

                {masonryImageBorder > 0 && (
                  <>
                    <SelectControl
                      label={__('Border Style')}
                      value={masonryImageBorderStyle}
                      options={[
                        { label: 'Solid', value: 'solid' },
                        { label: 'Dashed', value: 'dashed' },
                        { label: 'Dotted', value: 'dotted' },
                        { label: 'Double', value: 'double' },
                      ]}
                      onChange={(value) => setAttributes({ masonryImageBorderStyle: value })}
                    />
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' }}>
                        {__('Border Color')}
                      </label>
                      <input
                        type="color"
                        value={masonryImageBorderColor}
                        onChange={(e) => setAttributes({ masonryImageBorderColor: e.target.value })}
                        style={{ width: '100%', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      />
                    </div>
                  </>
                )}


              </>
            )}

            {/* Image Browser Layout Styles */}
            {layoutType === 'imagebrowser' && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' }}>
                    {__('Background Color')}
                  </label>
                  <input
                    type="color"
                    value={ImgbackgroundColor}
                    onChange={(e) => setAttributes({ ImgbackgroundColor: e.target.value })}
                    style={{ width: '100%', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' }}>
                    {__('Caption Color')}
                  </label>
                  <input
                    type="color"
                    value={ImgCaptionColor}
                    onChange={(e) => setAttributes({ ImgCaptionColor: e.target.value })}
                    style={{ width: '100%', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  />
                </div>
              </>
            )}

            {layoutType === 'infinite' && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' }}>
                    {__('Background Color')}
                  </label>
                  <input
                    type="color"
                    value={ImgbackgroundColor}
                    onChange={(e) => setAttributes({ ImgbackgroundColor: e.target.value })}
                    style={{ width: '100%', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' }}>
                    {__('Caption Color')}
                  </label>
                  <input
                    type="color"
                    value={ImgCaptionColor}
                    onChange={(e) => setAttributes({ ImgCaptionColor: e.target.value })}
                    style={{ width: '100%', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  />
                </div>

              <div style={{ marginBottom: '16px' }}>  
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' }}>
                    {__('Caption Center')}
                  </label>             
               <select value={attributes.alignx}
                  onChange={(e) => setAttributes({ alignx: e.target.value })}
                  style={{
                    width: '100%',
                    height: '32px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                  }}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>     
              </>
            )}

          </PanelBody>
        </div>
      </InspectorControls>


      {/* 
       =========== Gallery Preview ========== 
       =========== Gallery Preview ============ 
      */}

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

            {layoutType === 'grid' && (
              <div
                className="wpct_gallery__grid"
                style={{ '--columns': columns, '--gap': `${gap}px` }}
              >
                {imagesToDisplay.map((img) => (
                  <div key={img.id} className="wpct_gallery__item">
                    <img
                      src={imageSize === 'custom' ? img.url : img.sizes?.[imageSize]?.url || img.url} alt={img.alt}
                      style={imageSize === 'custom' ? {
                        width: customWidth ? `${customWidth}px` : 'auto',
                        height: customHeight ? `${customHeight}px` : 'auto',
                      } : undefined
                      }
                    />
                    {showCaptions && img.caption && (
                      <figcaption style={{
                        backgroundColor: gridBackgroundColor,
                        color: grindCaptionColor,
                        paddingTop: GtBgap,
                        paddingBottom: GtBgap
                      }}> {img.caption}</figcaption>
                    )}
                  </div>
                ))}
              </div>
            )}

            {layoutType === 'lightbox' && (
              <div
                className="wpct_gallery__lightbox-grid"
                style={{
                  '--columns': columns,
                  '--gap': `${gap}px`,
                  '--lightbox-overlay': lightboxOverlayColor,
                  '--lightbox-icon-color': lightboxIconColor,
                  '--lightbox-hover-scale': lightboxHoverScale
                }}
              >
                {imagesToDisplay.map((img) => (
                  <div key={img.id} className="wpct_gallery__lightbox-item">
                    <div className="wpct_gallery__lightbox-thumb">
                      <img
                        src={imageSize === 'custom' ? img.url : img.sizes?.[imageSize]?.url || img.url} alt={img.alt}
                        style={imageSize === 'custom' ? {
                          width: customWidth ? `${customWidth}px` : 'auto',
                          height: customHeight ? `${customHeight}px` : 'auto',
                        } : undefined
                        }
                      />
                      <div className="wpct_gallery__lightbox-overlay">
                        <span className="wpct_gallery__lightbox-icon">🔍</span>
                      </div>
                    </div>
                    {showCaptions && img.caption && (
                      <figcaption style={{
                        backgroundColor: LightBackgroundColor,
                        color: LightCaptionColor,
                        paddingTop: LighttBgap,
                        paddingBottom: LighttBgap
                      }}>{img.caption}</figcaption>
                    )}
                  </div>
                ))}
              </div>
            )}

            {layoutType === 'masonry' && (
              <div
                className="wpct_gallery__masonry"
                style={{
                  '--columns': columns,
                  '--gap': `${gap}px`,
                  '--border-radius': `${masonryBorderRadius}px`,
                  '--border-width': `${masonryImageBorder}px`,
                  '--border-color': masonryImageBorderColor,
                  '--border-style': masonryImageBorderStyle,
                  '--masonry-hover-effect': masonryHoverEffect,
                  '--masonry-opacity': masonryImageOpacity
                }}
              >
                {imagesToDisplay.map((img) => (
                  <div key={img.id} className="wpct_gallery__masonry-item">
                    <img
                      src={imageSize === 'custom' ? img.url : img.sizes?.[imageSize]?.url || img.url}
                      alt={img.alt}
                      style={imageSize === 'custom' ? {
                        width: customWidth ? `${customWidth}px` : 'auto',
                        height: customHeight ? `${customHeight}px` : 'auto',
                      } : undefined}
                    />
                    {showCaptions && img.caption && (
                      <figcaption className="wpct_gallery__masonry-caption">{img.caption}</figcaption>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {layoutType === 'imagebrowser' && (
              <div className="wpct_gallery__imagebrowser">
                {/* Image Browser Main Container */}
                <div className="wpct_gallery__imagebrowser-main">
                  <div className="wpct_gallery__imagebrowser-viewer">
                    {images.map((img, index) => (
                      <div
                        key={img.id}
                        className={`wpct_gallery__browser-image ${index === browserCurrentImage ? 'active' : ''}`}
                        style={{ display: index === browserCurrentImage ? 'block' : 'none' }}
                      >
                        <img
                          src={imageSize === 'custom' ? img.url : img.sizes?.[imageSize]?.url || img.url}
                          alt={img.alt}
                          style={imageSize === 'custom' ? {
                            width: customWidth ? `${customWidth}px` : 'auto',
                            height: customHeight ? `${customHeight}px` : 'auto',
                          } : undefined}
                        />
                        {showCaptions && img.caption && (
                          <div className="wpct_gallery__imagebrowser-caption"
                            style={{
                              backgroundColor: ImgbackgroundColor,
                              color: ImgCaptionColor
                            }}>
                            {img.caption}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Navigation Controls */}
                  {browserShowNavigation && images.length > 1 && (
                    <>
                      <Button
                        className="wpct_gallery__imagebrowser-prev"
                        onClick={prevBrowserImage}
                        variant="secondary"
                      >
                        ❮
                      </Button>
                      <Button
                        className="wpct_gallery__imagebrowser-next"
                        onClick={nextBrowserImage}
                        variant="secondary"
                      >
                        ❯
                      </Button>
                    </>
                  )}

                  {/* Image Counter */}
                  {browserShowCounter && (
                    <div className="wpct_gallery__imagebrowser-counter">
                      {browserCurrentImage + 1} of {images.length}
                    </div>
                  )}

                  {/* Zoom Controls */}
                  {browserZoomEnabled && (
                    <div className="wpct_gallery__imagebrowser-zoom-controls">
                      <Button variant="secondary" className="wpct_gallery__imagebrowser-zoom-in">
                        🔍+
                      </Button>
                      <Button variant="secondary" className="wpct_gallery__imagebrowser-zoom-out">
                        🔍-
                      </Button>
                      <Button variant="secondary" className="wpct_gallery__imagebrowser-zoom-reset">
                        ⟲
                      </Button>
                    </div>
                  )}

                  {/* Fullscreen Control */}
                  <div className="wpct_gallery__imagebrowser-fullscreen-control">
                    <Button variant="secondary" className="wpct_gallery__imagebrowser-fullscreen">
                      ⛶
                    </Button>
                  </div>
                </div>

                {/* Thumbnails */}
                {browserShowThumbnails && images.length > 1 && (
                  <div className="wpct_gallery__imagebrowser-thumbnails">
                    {images.map((img, index) => (
                      <div
                        key={img.id}
                        className={`wpct_gallery__imagebrowser-thumb ${index === browserCurrentImage ? 'active' : ''}`}
                        onClick={() => handleBrowserImageChange(index)}
                      >
                        <img
                          src={img.sizes?.thumbnail?.url || img.url}
                          alt={img.alt}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {layoutType === 'infinite' && (
              <div className="wpg-section">
                <article className="wpg-article">
                  <div className="wpg-div">
                    <ul className="wpg-ul">
                        {imagesToDisplay.map((img) => (
                          <li className="wpg-li" key={img.id} style={{ '--gap': `${gap}px` }}>
                            <figure className="wpg-figure">
                              <img src={imageSize === 'custom' ? img.url : img.sizes?.[imageSize]?.url || img.url} alt={img.alt}
                                  style={imageSize === 'custom' ? {
                                    width: customWidth ? `${customWidth}px` : 'auto',
                                    height: customHeight ? `${customHeight}px` : 'auto',
                                  } : undefined
                                  }
                              />
                               {showCaptions && img.caption && (
                                <figcaption className="wpg-caption" 
                                 style={{
                                    backgroundColor: ImgbackgroundColor,
                                    color: ImgCaptionColor,
                                    textAlign: alignx,
                                    padding: '6px 10px',
                                  }} 
                                >{img.caption}</figcaption>
                              )}
                            </figure>
                          </li>
                        ))}
                      </ul>
                  </div>
                </article>
              </div>
            )}

            {/* Pagination Button */}
            {(layoutType === 'grid' || layoutType === 'lightbox' || layoutType === 'masonry') && showPagination && totalPages > 1 && (
              <div className="wpct_gallery__pagination" style={{ marginTop: '1em', textAlign: 'center' }} >
                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <Button key={page} variant={currentPage === page ? 'primary' : 'secondary'}
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