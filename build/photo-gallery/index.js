/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/photo-gallery/edit.js":
/*!***********************************!*\
  !*** ./src/photo-gallery/edit.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





function Edit({
  attributes,
  setAttributes
}) {
  const {
    images = [],
    columns = 3,
    gap = 16,
    showCaptions = true,
    captionStyle = '1',
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
    masonryBackgroundColor = '#000000',
    masonryCaptionColor = '#ffffff',
    // Infinite Carousel attributes
    alignx = 'center',
    imagepadding = 2,
    animationSpeed = 25,
    // swiper Carousel attributes
    swiperautoplay = true,
    autoplayDelay = 500
  } = attributes;
  const onSelect = newImages => {
    setAttributes({
      images: newImages.map(img => ({
        id: img.id,
        url: img.url,
        alt: img.alt,
        caption: img.caption,
        sizes: img.sizes || {}
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
  const handleBrowserImageChange = imageIndex => {
    setAttributes({
      browserCurrentImage: imageIndex
    });
  };
  const nextBrowserImage = () => {
    const nextIndex = (browserCurrentImage + 1) % images.length;
    setAttributes({
      browserCurrentImage: nextIndex
    });
  };
  const prevBrowserImage = () => {
    const prevIndex = browserCurrentImage === 0 ? images.length - 1 : browserCurrentImage - 1;
    setAttributes({
      browserCurrentImage: prevIndex
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.BlockControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToolbarGroup, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToolbarButton, {
          icon: "grid-view",
          isPressed: layoutType === 'grid',
          onClick: () => setAttributes({
            layoutType: 'grid'
          }),
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Grid', 'photoblocks-gallery')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToolbarButton, {
          icon: "search",
          isPressed: layoutType === 'lightbox',
          onClick: () => setAttributes({
            layoutType: 'lightbox'
          }),
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Lightbox', 'photoblocks-gallery')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToolbarButton, {
          icon: "layout",
          isPressed: layoutType === 'custom_masonry',
          onClick: () => setAttributes({
            layoutType: 'custom_masonry'
          }),
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Masonry', 'photoblocks-gallery')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToolbarButton, {
          icon: "images-alt2",
          isPressed: layoutType === 'imagebrowser',
          onClick: () => setAttributes({
            layoutType: 'imagebrowser'
          }),
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Image Browser', 'photoblocks-gallery')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToolbarButton, {
          icon: "controls-repeat",
          isPressed: layoutType === 'infinite',
          onClick: () => setAttributes({
            layoutType: 'infinite'
          }),
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Infinite Carousel', 'photoblocks-gallery')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToolbarButton, {
          icon: "slides",
          isPressed: layoutType === 'swiper',
          onClick: () => setAttributes({
            layoutType: 'swiper'
          }),
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Swiper Gallery', 'photoblocks-gallery')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToolbarButton, {
          icon: "admin-page",
          isPressed: layoutType === 'fancybox',
          onClick: () => setAttributes({
            layoutType: 'fancybox'
          }),
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Fancy Box', 'photoblocks-gallery')
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "tab-content-settings",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Layout & Display'),
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "photoblocks-layout-selector",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
              className: "components-base-control__label",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Gallery Layout', 'photoblocks-gallery')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "layout-options-grid",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("button", {
                className: `layout-option ${layoutType === 'grid' ? 'is-active' : ''}`,
                onClick: () => setAttributes({
                  layoutType: 'grid'
                }),
                type: "button",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "dashicons dashicons-grid-view"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "layout-label",
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Grid', 'photoblocks-gallery')
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("button", {
                className: `layout-option ${layoutType === 'lightbox' ? 'is-active' : ''}`,
                onClick: () => setAttributes({
                  layoutType: 'lightbox'
                }),
                type: "button",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "dashicons dashicons-search"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "layout-label",
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Lightbox', 'photoblocks-gallery')
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("button", {
                className: `layout-option ${layoutType === 'imagebrowser' ? 'is-active' : ''}`,
                onClick: () => setAttributes({
                  layoutType: 'imagebrowser'
                }),
                type: "button",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "dashicons dashicons-images-alt2"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "layout-label",
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Image Browser', 'photoblocks-gallery')
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("button", {
                className: `layout-option ${layoutType === 'custom_masonry' ? 'is-active' : ''}`,
                onClick: () => setAttributes({
                  layoutType: 'custom_masonry'
                }),
                type: "button",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "dashicons dashicons-layout"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "layout-label",
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Masonry', 'photoblocks-gallery')
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("button", {
                className: `layout-option ${layoutType === 'infinite' ? 'is-active' : ''}`,
                onClick: () => setAttributes({
                  layoutType: 'infinite'
                }),
                type: "button",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "dashicons dashicons-controls-repeat"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "layout-label",
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Infinite Carousel', 'photoblocks-gallery')
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("button", {
                className: `layout-option ${layoutType === 'swiper' ? 'is-active' : ''}`,
                onClick: () => setAttributes({
                  layoutType: 'swiper'
                }),
                type: "button",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "dashicons dashicons-slides"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "layout-label",
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Swiper Gallery', 'photoblocks-gallery')
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("button", {
                className: `layout-option ${layoutType === 'fancybox' ? 'is-active' : ''}`,
                onClick: () => setAttributes({
                  layoutType: 'fancybox'
                }),
                type: "button",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "dashicons dashicons-admin-page"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "layout-label",
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Fancy Box', 'photoblocks-gallery')
                })]
              })]
            })]
          }), layoutType !== 'infinite' && layoutType !== 'imagebrowser' && layoutType !== 'swiper' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Images Per Row'),
            value: columns,
            onChange: value => setAttributes({
              columns: value
            }),
            min: 1,
            max: 6
          }), layoutType !== 'imagebrowser' && layoutType !== 'infinite' && layoutType !== 'swiper' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Space Between Images'),
            value: gap,
            onChange: value => setAttributes({
              gap: value
            }),
            min: 8,
            max: 100
          }), layoutType == 'infinite' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Padding Between Images'),
            value: imagepadding,
            onChange: value => setAttributes({
              imagepadding: value
            }),
            min: 2,
            max: 20
          }), layoutType == 'infinite' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Animation Speed'),
            value: animationSpeed,
            onChange: value => setAttributes({
              animationSpeed: value
            }),
            min: 1,
            max: 20
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Captions'),
            checked: showCaptions,
            onChange: value => setAttributes({
              showCaptions: value
            })
          }), showCaptions && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Caption Style'),
            value: captionStyle,
            options: [{
              label: 'Slide from Bottom',
              value: '1'
            }, {
              label: 'Centered Fade',
              value: '2'
            }, {
              label: 'Slide from top',
              value: '3'
            }, {
              label: 'Fade Overlay',
              value: '4'
            }, {
              label: 'Side Slide',
              value: '5'
            }, {
              label: 'Circle Reveal',
              value: '6'
            }, {
              label: 'Split Screen',
              value: '7'
            }, {
              label: 'Double Border',
              value: '8'
            }, {
              label: '3D Flip Card',
              value: '9'
            }],
            onChange: value => setAttributes({
              captionStyle: value
            })
          }), layoutType == 'swiper' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Autoplay'),
            checked: swiperautoplay,
            onChange: value => setAttributes({
              swiperautoplay: value
            })
          }), layoutType == 'swiper' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Autoplay Delay (ms)'),
            value: autoplayDelay,
            options: [{
              label: '500 ms',
              value: 500
            }, {
              label: '1,000 ms',
              value: 1000
            }, {
              label: '1,500 ms',
              value: 1500
            }, {
              label: '2,000 ms',
              value: 2000
            }, {
              label: '2,500 ms',
              value: 2500
            }, {
              label: '3,000 ms',
              value: 3000
            }, {
              label: '30000 ms',
              value: 30000
            }],
            onChange: value => setAttributes({
              autoplayDelay: Number(value)
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Image Size'),
            value: imageSize,
            options: [{
              label: 'Full Size',
              value: 'full'
            }, {
              label: 'Large',
              value: 'large'
            }, {
              label: 'Medium',
              value: 'medium'
            }, {
              label: 'Thumbnail',
              value: 'thumbnail'
            }, {
              label: 'Custom',
              value: 'custom'
            }],
            onChange: value => setAttributes({
              imageSize: value
            })
          }), imageSize === 'custom' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom Width (px)'),
              value: customWidth,
              onChange: value => setAttributes({
                customWidth: value
              }),
              min: 50,
              max: 1200
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom Height (px)'),
              value: customHeight,
              onChange: value => setAttributes({
                customHeight: value
              }),
              min: 50,
              max: 1200
            })]
          }), (layoutType === 'grid' || layoutType === 'lightbox' || layoutType === 'custom_masonry' || layoutType === 'fancybox') && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Pagination Show'),
              checked: showPagination,
              onChange: value => setAttributes({
                showPagination: value,
                currentPage: 1
              })
            }), showPagination && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Items Per Page'),
              value: itemsPerPage,
              options: [{
                label: '4',
                value: 4
              }, {
                label: '8',
                value: 8
              }, {
                label: '12',
                value: 12
              }, {
                label: '16',
                value: 16
              }, {
                label: '20',
                value: 20
              }],
              onChange: value => setAttributes({
                itemsPerPage: parseInt(value, 10),
                currentPage: 1
              })
            })]
          })]
        }), layoutType === 'imagebrowser' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Image Browser Settings'),
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Thumbnails'),
            checked: browserShowThumbnails,
            onChange: value => setAttributes({
              browserShowThumbnails: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Navigation Arrows'),
            checked: browserShowNavigation,
            onChange: value => setAttributes({
              browserShowNavigation: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Image Counter'),
            checked: browserShowCounter,
            onChange: value => setAttributes({
              browserShowCounter: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Zoom & Pan'),
            checked: browserZoomEnabled,
            onChange: value => setAttributes({
              browserZoomEnabled: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Auto Fullscreen Mode'),
            checked: browserAutoFullscreen,
            onChange: value => setAttributes({
              browserAutoFullscreen: value
            })
          })]
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
      group: "styles",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "tab-content-styles",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Appearance'),
          initialOpen: true,
          children: [layoutType === 'grid' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              style: {
                marginBottom: '16px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                style: {
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '11px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Background Color')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                type: "color",
                value: gridBackgroundColor,
                onChange: e => setAttributes({
                  gridBackgroundColor: e.target.value
                }),
                style: {
                  width: '100%',
                  height: '32px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              style: {
                marginBottom: '16px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                style: {
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '11px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Text Color')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                type: "color",
                value: grindCaptionColor,
                onChange: e => setAttributes({
                  grindCaptionColor: e.target.value
                }),
                style: {
                  width: '100%',
                  height: '32px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              style: {
                marginBottom: '16px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                style: {
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '11px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('padding')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Top Bottom Padding (px)'),
                value: GtBgap,
                onChange: value => setAttributes({
                  GtBgap: value
                }),
                min: 0,
                max: 100
              })]
            })]
          }), layoutType === 'lightbox' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              style: {
                marginBottom: '16px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                style: {
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '11px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Background Color')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                type: "color",
                value: LightBackgroundColor,
                onChange: e => setAttributes({
                  LightBackgroundColor: e.target.value
                }),
                style: {
                  width: '100%',
                  height: '32px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              style: {
                marginBottom: '16px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                style: {
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '11px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Text Color')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                type: "color",
                value: LightCaptionColor,
                onChange: e => setAttributes({
                  LightCaptionColor: e.target.value
                }),
                style: {
                  width: '100%',
                  height: '32px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              style: {
                marginBottom: '16px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                style: {
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '11px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('padding')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Top Bottom Padding (px)'),
                value: LighttBgap,
                onChange: value => setAttributes({
                  LighttBgap: value
                }),
                min: 0,
                max: 100
              })]
            })]
          }), layoutType === 'custom_masonry' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              style: {
                marginBottom: '16px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                style: {
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '11px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Background Color')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                type: "color",
                value: masonryBackgroundColor,
                onChange: e => setAttributes({
                  masonryBackgroundColor: e.target.value
                }),
                style: {
                  width: '100%',
                  height: '32px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              style: {
                marginBottom: '16px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                style: {
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '11px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Caption Color')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                type: "color",
                value: masonryCaptionColor,
                onChange: e => setAttributes({
                  masonryCaptionColor: e.target.value
                }),
                style: {
                  width: '100%',
                  height: '32px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }
              })]
            }), masonryImageBorder > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Border Style'),
                value: masonryImageBorderStyle,
                options: [{
                  label: 'Solid',
                  value: 'solid'
                }, {
                  label: 'Dashed',
                  value: 'dashed'
                }, {
                  label: 'Dotted',
                  value: 'dotted'
                }, {
                  label: 'Double',
                  value: 'double'
                }],
                onChange: value => setAttributes({
                  masonryImageBorderStyle: value
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                style: {
                  marginBottom: '16px'
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                  style: {
                    display: 'block',
                    marginBottom: '4px',
                    fontSize: '11px',
                    fontWeight: '500',
                    textTransform: 'uppercase'
                  },
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Border Color')
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                  type: "color",
                  value: masonryImageBorderColor,
                  onChange: e => setAttributes({
                    masonryImageBorderColor: e.target.value
                  }),
                  style: {
                    width: '100%',
                    height: '32px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }
                })]
              })]
            })]
          }), layoutType === 'imagebrowser' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              style: {
                marginBottom: '16px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                style: {
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '11px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Background Color')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                type: "color",
                value: ImgbackgroundColor,
                onChange: e => setAttributes({
                  ImgbackgroundColor: e.target.value
                }),
                style: {
                  width: '100%',
                  height: '32px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              style: {
                marginBottom: '16px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                style: {
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '11px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Caption Color')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                type: "color",
                value: ImgCaptionColor,
                onChange: e => setAttributes({
                  ImgCaptionColor: e.target.value
                }),
                style: {
                  width: '100%',
                  height: '32px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }
              })]
            })]
          }), (layoutType === 'infinite' || layoutType === 'swiper') && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              style: {
                marginBottom: '16px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                style: {
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '11px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Background Color')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                type: "color",
                value: ImgbackgroundColor,
                onChange: e => setAttributes({
                  ImgbackgroundColor: e.target.value
                }),
                style: {
                  width: '100%',
                  height: '32px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              style: {
                marginBottom: '16px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                style: {
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '11px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Caption Color')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                type: "color",
                value: ImgCaptionColor,
                onChange: e => setAttributes({
                  ImgCaptionColor: e.target.value
                }),
                style: {
                  width: '100%',
                  height: '32px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              style: {
                marginBottom: '16px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                style: {
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '11px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Caption Center')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("select", {
                value: attributes.alignx,
                onChange: e => setAttributes({
                  alignx: e.target.value
                }),
                style: {
                  width: '100%',
                  height: '32px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  cursor: 'pointer'
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("option", {
                  value: "left",
                  children: "Left"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("option", {
                  value: "center",
                  children: "Center"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("option", {
                  value: "right",
                  children: "Right"
                })]
              })]
            })]
          })]
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)({
        className: 'my-gallery'
      }),
      children: images.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaUploadCheck, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaUpload, {
          onSelect: onSelect,
          allowedTypes: ['image'],
          multiple: true,
          gallery: true,
          render: ({
            open
          }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            variant: "primary",
            onClick: open,
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add to Gallery')
          })
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
        children: [layoutType === 'grid' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "wpct_gallery__grid",
          style: {
            '--columns': columns,
            '--gap': `${gap}px`
          },
          children: imagesToDisplay.map(img =>
          /*#__PURE__*/
          //captionStyle
          (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("figure", {
            className: `style-${captionStyle} wpct_gallery__item`,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
              src: imageSize === 'custom' ? img.url : img.sizes?.[imageSize]?.url || img.url,
              alt: img.alt,
              style: imageSize === 'custom' ? {
                width: customWidth ? `${customWidth}px` : 'auto',
                height: customHeight ? `${customHeight}px` : 'auto'
              } : undefined
            }), showCaptions && img.caption && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("figcaption", {
              style: {
                backgroundColor: gridBackgroundColor,
                color: grindCaptionColor,
                paddingTop: GtBgap,
                paddingBottom: GtBgap
              },
              children: img.caption
            })]
          }, img.id))
        }), layoutType === 'lightbox' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "wpct_gallery__lightbox-grid",
          style: {
            '--columns': columns,
            '--gap': `${gap}px`,
            '--lightbox-overlay': lightboxOverlayColor,
            '--lightbox-icon-color': lightboxIconColor,
            '--lightbox-hover-scale': lightboxHoverScale
          },
          children: imagesToDisplay.map(img => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "wpct_gallery__lightbox-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "wpct_gallery__lightbox-thumb",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                src: imageSize === 'custom' ? img.url : img.sizes?.[imageSize]?.url || img.url,
                alt: img.alt,
                style: imageSize === 'custom' ? {
                  width: customWidth ? `${customWidth}px` : 'auto',
                  height: customHeight ? `${customHeight}px` : 'auto'
                } : undefined
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                className: "wpct_gallery__lightbox-overlay",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "wpct_gallery__lightbox-icon",
                  children: "\uD83D\uDD0D"
                })
              })]
            }), showCaptions && img.caption && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("figcaption", {
              style: {
                backgroundColor: LightBackgroundColor,
                color: LightCaptionColor,
                paddingTop: LighttBgap,
                paddingBottom: LighttBgap
              },
              children: img.caption
            })]
          }, img.id))
        }), layoutType === 'imagebrowser' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "wpct_gallery__imagebrowser",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "wpct_gallery__imagebrowser-main",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "wpct_gallery__imagebrowser-viewer",
              children: images.map((img, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: `wpct_gallery__browser-image ${index === browserCurrentImage ? 'active' : ''}`,
                style: {
                  display: index === browserCurrentImage ? 'block' : 'none'
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                  src: imageSize === 'custom' ? img.url : img.sizes?.[imageSize]?.url || img.url,
                  alt: img.alt,
                  style: imageSize === 'custom' ? {
                    width: customWidth ? `${customWidth}px` : 'auto',
                    height: customHeight ? `${customHeight}px` : 'auto'
                  } : undefined
                }), showCaptions && img.caption && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  className: "wpct_gallery__imagebrowser-caption",
                  style: {
                    backgroundColor: ImgbackgroundColor,
                    color: ImgCaptionColor
                  },
                  children: img.caption
                })]
              }, img.id))
            }), browserShowNavigation && images.length > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                className: "wpct_gallery__imagebrowser-prev",
                onClick: prevBrowserImage,
                variant: "secondary",
                children: "\u276E"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                className: "wpct_gallery__imagebrowser-next",
                onClick: nextBrowserImage,
                variant: "secondary",
                children: "\u276F"
              })]
            }), browserShowCounter && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "wpct_gallery__imagebrowser-counter",
              children: [browserCurrentImage + 1, " of ", images.length]
            }), browserZoomEnabled && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "wpct_gallery__imagebrowser-zoom-controls",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                variant: "secondary",
                className: "wpct_gallery__imagebrowser-zoom-in",
                children: "\uD83D\uDD0D+"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                variant: "secondary",
                className: "wpct_gallery__imagebrowser-zoom-out",
                children: "\uD83D\uDD0D-"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                variant: "secondary",
                className: "wpct_gallery__imagebrowser-zoom-reset",
                children: "\u27F2"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "wpct_gallery__imagebrowser-fullscreen-control",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                variant: "secondary",
                className: "wpct_gallery__imagebrowser-fullscreen",
                children: "\u26F6"
              })
            })]
          }), browserShowThumbnails && images.length > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "wpct_gallery__imagebrowser-thumbnails",
            children: images.map((img, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: `wpct_gallery__imagebrowser-thumb ${index === browserCurrentImage ? 'active' : ''}`,
              onClick: () => handleBrowserImageChange(index),
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                src: img.sizes?.thumbnail?.url || img.url,
                alt: img.alt
              })
            }, img.id))
          })]
        }), layoutType === 'infinite' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "wpg-section",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("article", {
            className: "wpg-article",
            style: {
              '--animation-speed': `${animationSpeed}s`
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "wpg-div",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("ul", {
                className: "wpg-ul",
                children: images.map(img => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
                  className: "wpg-li",
                  style: {
                    '--padding': `${imagepadding !== null && imagepadding !== void 0 ? imagepadding : 0}px`
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("figure", {
                    className: `wpg-figure size-${imageSize}`,
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                      src: imageSize === 'custom' ? img.url : img.sizes?.[imageSize]?.url || img.url,
                      alt: img.alt,
                      style: imageSize === 'custom' ? {
                        width: customWidth ? `${customWidth}px` : 'auto',
                        height: customHeight ? `${customHeight}px` : 'auto'
                      } : undefined
                    })
                  })
                }, img.id))
              })
            })
          })
        }), layoutType === 'swiper' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "swiper spg-swiper",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "swiper-wrapper",
            children: images.map((img, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "swiper-slide",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                src: imageSize === 'custom' ? img.url : img.sizes?.[imageSize]?.url || img.url,
                alt: img.alt,
                style: imageSize === 'custom' ? {
                  width: customWidth ? `${customWidth}px` : 'auto',
                  height: customHeight ? `${customHeight}px` : 'auto'
                } : undefined
              }), showCaptions && img.caption && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("figcaption", {
                className: "caption",
                style: {
                  backgroundColor: ImgbackgroundColor,
                  color: ImgCaptionColor,
                  textAlign: alignx,
                  padding: '6px 10px'
                },
                children: img.caption
              })]
            }, i))
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "swiper-button-next"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "swiper-button-prev"
          })]
        }), layoutType === 'custom_masonry' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "masonary_img_gallery",
          style: {
            '--columns': columns,
            '--gap': `${gap}px`,
            '--border-radius': `${masonryBorderRadius}px`,
            '--border-width': `${masonryImageBorder}px`,
            '--border-color': masonryImageBorderColor,
            '--border-style': masonryImageBorderStyle,
            '--masonry-hover-effect': masonryHoverEffect,
            '--masonry-opacity': masonryImageOpacity
          },
          children: imagesToDisplay.map((img, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("figure", {
            className: "wpct_masonry_item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
              src: imageSize === 'custom' ? img?.url : img?.sizes?.[imageSize]?.url || img?.url,
              alt: img?.alt || '',
              style: imageSize === 'custom' ? {
                width: customWidth ? `${customWidth}px` : 'auto',
                height: customHeight ? `${customHeight}px` : 'auto'
              } : undefined
            }), showCaptions && img?.caption && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("figcaption", {
              className: "wpct_gallery__masonry-caption",
              style: {
                backgroundColor: masonryBackgroundColor,
                color: masonryCaptionColor,
                padding: '15px 10px',
                textAlign: 'center'
              },
              children: img.caption
            })]
          }, i))
        }), " ", layoutType === 'fancybox' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "wpc_container",
          style: {
            "--columns": columns,
            "--gap": `${gap}px`
          },
          children: imagesToDisplay.map((img, i) => {
            const imageUrl = imageSize === "custom" ? img?.url : img?.sizes?.[imageSize]?.url || img?.url;
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "wpc_card",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                className: "wpc_card-image",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
                  href: imageUrl,
                  "data-fancybox": "gallery",
                  ...(showCaptions && img?.caption ? {
                    "data-caption": img.caption
                  } : {}),
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                    src: imageUrl,
                    alt: img?.alt || "",
                    style: imageSize === "custom" ? {
                      width: customWidth ? `${customWidth}px` : "auto",
                      height: customHeight ? `${customHeight}px` : "auto"
                    } : undefined
                  })
                })
              })
            }, i);
          })
        }), (layoutType === 'grid' || layoutType === 'lightbox' || layoutType === 'masonry' || layoutType === 'custom_masonry' || layoutType === 'fancybox') && showPagination && totalPages > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "wpct_gallery__pagination",
          style: {
            marginTop: '1em',
            textAlign: 'center'
          },
          children: Array.from({
            length: totalPages
          }).map((_, i) => {
            const page = i + 1;
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              variant: currentPage === page ? 'primary' : 'secondary',
              onClick: () => setAttributes({
                currentPage: page
              }),
              style: {
                margin: '0 4px',
                minWidth: '32px'
              },
              children: page
            }, page);
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaUploadCheck, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaUpload, {
            onSelect: onSelect,
            allowedTypes: ['image'],
            multiple: true,
            gallery: true,
            value: images.map(img => img.id),
            render: ({
              open
            }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              onClick: open,
              variant: "secondary",
              style: {
                marginTop: '1em'
              },
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Edit Gallery')
            })
          })
        })]
      })
    })]
  });
}

/***/ }),

/***/ "./src/photo-gallery/save.js":
/*!***********************************!*\
  !*** ./src/photo-gallery/save.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function save({
  attributes
}) {
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
    //Grid layout 
    gridBackgroundColor = '#000000',
    grindCaptionColor = '#ffffff',
    GtBgap = 0,
    // Lightbox specific attributes
    LightBackgroundColor = '#000000',
    LightCaptionColor = '#ffffff',
    LighttBgap = 0,
    // Image Browser attributes
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
    masonryBackgroundColor = '#000000',
    masonryCaptionColor = '#ffffff',
    // Infinite Carousel attributes
    alignx = 'center',
    imagepadding = 2,
    animationSpeed = 25,
    // swiper Carousel attributes
    swiperautoplay = true,
    autoplayDelay = 500
  } = attributes;

  // If no images, render empty div to maintain consistency
  if (images.length === 0) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save({
        className: 'my-gallery'
      }),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "my-gallery__empty"
      })
    });
  }
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save({
    className: 'my-gallery'
  });
  if (layoutType === 'grid') {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "wpct_gallery__grid",
        style: {
          '--columns': columns,
          '--gap': `${gap}px`,
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`
        },
        "data-columns": columns,
        "data-gap": gap,
        "data-show-pagination": showPagination ? 'true' : 'false',
        "data-items-per-page": itemsPerPage,
        children: images.map((img, index) => {
          const imageUrl = imageSize === 'custom' ? img.url : img.sizes && img.sizes[imageSize] && img.sizes[imageSize].url || img.url;
          const imageStyles = imageSize === 'custom' && (customWidth || customHeight) ? {
            width: customWidth ? `${customWidth}px` : 'auto',
            height: customHeight ? `${customHeight}px` : 'auto'
          } : {};
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("figure", {
            className: "wpct_gallery__item",
            "data-image-id": img.id || index,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
              src: imageUrl,
              alt: img.alt || '',
              style: Object.keys(imageStyles).length > 0 ? imageStyles : undefined
            }), showCaptions && img.caption && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("figcaption", {
              style: {
                backgroundColor: gridBackgroundColor,
                color: grindCaptionColor
              },
              dangerouslySetInnerHTML: {
                __html: img.caption
              }
            })]
          }, img.id || index);
        })
      }), showPagination && images.length > itemsPerPage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "my-gallery__pagination",
        "data-total-items": images.length,
        "data-items-per-page": itemsPerPage
      })]
    });
  } else if (layoutType === 'lightbox') {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "my-gallery__lightbox-grid",
        style: {
          '--columns': columns,
          '--gap': `${gap}px`,
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`
        },
        "data-layout": "lightbox",
        "data-columns": columns,
        "data-gap": gap,
        "data-show-captions": showCaptions ? 'true' : 'false',
        "data-show-pagination": showPagination ? 'true' : 'false',
        "data-items-per-page": itemsPerPage,
        "data-total-items": images.length,
        children: images.map((img, index) => {
          const imageUrl = imageSize === 'custom' ? img.url : img.sizes && img.sizes[imageSize] && img.sizes[imageSize].url || img.url;
          const fullImageUrl = img.sizes && img.sizes['full'] && img.sizes['full'].url ? img.sizes['full'].url : img.url;
          const imageStyles = imageSize === 'custom' && (customWidth || customHeight) ? {
            width: customWidth ? `${customWidth}px` : 'auto',
            height: customHeight ? `${customHeight}px` : 'auto'
          } : {};
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("figure", {
            className: "my-gallery__lightbox-item",
            "data-image-id": img.id || index,
            "data-image-index": index,
            "data-full-image": fullImageUrl,
            "data-caption": img.caption || '',
            "data-alt": img.alt || '',
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "my-gallery__lightbox-thumb",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
                src: imageUrl,
                alt: img.alt || '',
                style: Object.keys(imageStyles).length > 0 ? imageStyles : undefined
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                className: "my-gallery__lightbox-overlay",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                  className: "my-gallery__lightbox-icon",
                  children: "\uD83D\uDD0D"
                })
              })]
            }), showCaptions && img.caption && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("figcaption", {
              style: {
                backgroundColor: LightBackgroundColor,
                color: LightCaptionColor,
                paddingTop: LighttBgap,
                paddingBottom: LighttBgap
              },
              children: [" ", img.caption, " "]
            })]
          }, img.id || index);
        })
      }), showPagination && images.length > itemsPerPage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "my-gallery__pagination",
        "data-total-items": images.length,
        "data-items-per-page": itemsPerPage
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "my-gallery__lightbox-modal",
        style: {
          display: 'none'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "my-gallery__lightbox-backdrop"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "my-gallery__lightbox-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
            className: "my-gallery__lightbox-close",
            "aria-label": "Close lightbox",
            children: "\xD7"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
            className: "my-gallery__lightbox-prev",
            "aria-label": "Previous image",
            children: "\u276E"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
            className: "my-gallery__lightbox-next",
            "aria-label": "Next image",
            children: "\u276F"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "my-gallery__lightbox-content",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
              className: "my-gallery__lightbox-image",
              src: "",
              alt: ""
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              className: "my-gallery__lightbox-caption",
              style: {
                backgroundColor: LightBackgroundColor,
                color: LightCaptionColor
              }
            })]
          })]
        })]
      })]
    });
  } else if (layoutType === 'imagebrowser') {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "my-gallery__imagebrowser",
        "data-layout": "imagebrowser",
        "data-bg-color": ImgbackgroundColor,
        "data-caption-color": ImgCaptionColor,
        "data-show-thumbnails": browserShowThumbnails ? 'true' : 'false',
        "data-show-navigation": browserShowNavigation ? 'true' : 'false',
        "data-show-counter": browserShowCounter ? 'true' : 'false',
        "data-auto-fullscreen": browserAutoFullscreen ? 'true' : 'false',
        "data-zoom-enabled": browserZoomEnabled ? 'true' : 'false',
        "data-show-captions": showCaptions ? 'true' : 'false',
        "data-total-images": images.length,
        "data-transition-effect": "fade",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "my-gallery__imagebrowser-main",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            className: "my-gallery__imagebrowser-viewer",
            children: images.map((img, index) => {
              const imageUrl = imageSize === 'custom' ? img.url : img.sizes && img.sizes[imageSize] && img.sizes[imageSize].url || img.url;
              const fullImageUrl = img.sizes && img.sizes['full'] && img.sizes['full'].url ? img.sizes['full'].url : img.url;
              const imageStyles = imageSize === 'custom' && (customWidth || customHeight) ? {
                width: customWidth ? `${customWidth}px` : 'auto',
                height: customHeight ? `${customHeight}px` : 'auto'
              } : {};
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                className: `my-gallery__browser-image ${index === 0 ? 'active' : ''}`,
                "data-image-index": index,
                "data-image-id": img.id || index,
                "data-full-image": fullImageUrl,
                "data-alt": img.alt || '',
                "data-caption": img.caption || '',
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
                  src: imageUrl,
                  alt: img.alt || '',
                  style: Object.keys(imageStyles).length > 0 ? imageStyles : undefined,
                  "data-zoom": "1",
                  "data-pan-x": "0",
                  "data-pan-y": "0"
                }), showCaptions && img.caption && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                  className: "my-gallery__imagebrowser-caption",
                  style: {
                    color: ImgCaptionColor,
                    backgroundColor: ImgbackgroundColor
                  },
                  dangerouslySetInnerHTML: {
                    __html: img.caption
                  }
                })]
              }, img.id || index);
            })
          }), browserShowNavigation && images.length > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
              className: "my-gallery__imagebrowser-prev",
              "aria-label": "Previous image",
              type: "button",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                children: "\u2039"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
              className: "my-gallery__imagebrowser-next",
              "aria-label": "Next image",
              type: "button",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                children: "\u203A"
              })
            })]
          }), browserShowCounter && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "my-gallery__imagebrowser-counter",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
              className: "current",
              children: "1"
            }), " of ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
              className: "total",
              children: images.length
            })]
          }), browserZoomEnabled && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "my-gallery__imagebrowser-zoom-controls",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
              className: "my-gallery__imagebrowser-zoom-in",
              "aria-label": "Zoom in",
              type: "button",
              title: "Zoom In",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                children: "+"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
              className: "my-gallery__imagebrowser-zoom-out",
              "aria-label": "Zoom out",
              type: "button",
              title: "Zoom Out",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                children: "\u2212"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
              className: "my-gallery__imagebrowser-zoom-reset",
              "aria-label": "Reset zoom",
              type: "button",
              title: "Reset Zoom",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                children: "\u27F2"
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            className: "my-gallery__imagebrowser-fullscreen-control",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("button", {
              className: "my-gallery__imagebrowser-fullscreen",
              "aria-label": "Toggle fullscreen",
              type: "button",
              title: "Fullscreen",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                className: "fullscreen-enter",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("i", {
                  className: "fas fa-expand"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                className: "fullscreen-exit",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("i", {
                  className: "fas fa-times"
                })
              })]
            })
          })]
        }), browserShowThumbnails && images.length > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "my-gallery__imagebrowser-thumbnails",
          children: images.map((img, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            className: `my-gallery__imagebrowser-thumb ${index === 0 ? 'active' : ''}`,
            "data-image-index": index,
            "data-image-id": img.id || index,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
              src: img.sizes?.thumbnail?.url || img.url,
              alt: img.alt || ''
            })
          }, img.id || index))
        })]
      })
    });
  } else if (layoutType === 'infinite') {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "wpg-section",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("article", {
          className: "wpg-article",
          style: {
            '--animation-speed': `${animationSpeed}s`
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            className: "wpg-div",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("ul", {
              className: "wpg-ul",
              children: images.map(img => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li", {
                className: "wpg-li",
                style: {
                  '--padding': `${imagepadding !== null && imagepadding !== void 0 ? imagepadding : 0}px`
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("figure", {
                  className: "wpg-figure",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
                    src: imageSize === 'custom' ? img.url : img.sizes?.[imageSize]?.url || img.url,
                    alt: img.alt,
                    style: imageSize === 'custom' ? {
                      width: customWidth ? `${customWidth}px` : 'auto',
                      height: customHeight ? `${customHeight}px` : 'auto'
                    } : undefined
                  }), showCaptions && img.caption && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("figcaption", {
                    className: "wpg-caption",
                    style: {
                      backgroundColor: ImgbackgroundColor,
                      color: ImgCaptionColor,
                      textAlign: alignx,
                      padding: '6px 10px'
                    },
                    children: img.caption
                  })]
                })
              }, img.id))
            })
          })
        })
      })
    });
  } else if (layoutType === 'swiper') {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "swiper spg-swiper",
        "data-autoplay": swiperautoplay,
        "data-swiperdelay": autoplayDelay,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "swiper-wrapper",
          children: images.map((img, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "swiper-slide",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
              src: imageSize === 'custom' ? img.url : img.sizes?.[imageSize]?.url || img.url,
              alt: img.alt,
              style: imageSize === 'custom' ? {
                width: customWidth ? `${customWidth}px` : 'auto',
                height: customHeight ? `${customHeight}px` : 'auto'
              } : undefined
            }), showCaptions && img.caption && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("figcaption", {
              className: "caption",
              style: {
                backgroundColor: ImgbackgroundColor,
                color: ImgCaptionColor,
                textAlign: alignx,
                padding: '6px 10px'
              },
              children: img.caption
            })]
          }, i))
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "swiper-button-next"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "swiper-button-prev"
        })]
      })
    });
  } else if (layoutType === 'custom_masonry') {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "masonry_img_gallery",
        style: {
          columnCount: columns,
          columnGap: `${gap}px`
        },
        children: images.map((img, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "wpct_masonry_item",
          style: {
            marginBottom: `${gap}px`,
            display: showPagination && i >= itemsPerPage ? 'none' : 'block' // Hide items beyond first page initially
          },
          "data-index": i,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
            src: imageSize === 'custom' ? img?.url : img?.sizes?.[imageSize]?.url || img?.url,
            alt: img?.alt || '',
            style: imageSize === 'custom' ? {
              width: customWidth ? `${customWidth}px` : 'auto'
            } : undefined
          }), showCaptions && img?.caption && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("figcaption", {
            className: "wpct_gallery__masonry-caption",
            style: {
              backgroundColor: masonryBackgroundColor,
              color: masonryCaptionColor
            },
            children: img.caption
          })]
        }, img?.id || i))
      }), showPagination && images.length > itemsPerPage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "my-gallery__pagination",
        "data-total-items": images.length,
        "data-items-per-page": itemsPerPage
      })]
    });
  } else if (layoutType === 'fancybox') {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "wpc_container",
        style: {
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`
        },
        children: images.map((img, i) => {
          const imageUrl = imageSize === 'custom' ? img.url : img.sizes?.[imageSize]?.url || img.url;
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            className: "wpc_card",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              className: "wpc_card-image",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
                href: imageUrl,
                "data-fancybox": "gallery",
                ...(showCaptions && img?.caption ? {
                  'data-caption': img.caption
                } : {}),
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
                  src: imageUrl,
                  alt: img.alt || '',
                  loading: "lazy",
                  style: imageSize === 'custom' ? {
                    width: customWidth ? `${customWidth}px` : undefined,
                    height: customHeight ? `${customHeight}px` : undefined
                  } : undefined
                })
              })
            })
          }, i);
        })
      }), showPagination && images.length > itemsPerPage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "my-gallery__pagination",
        "data-total-items": images.length,
        "data-items-per-page": itemsPerPage
      })]
    });
  }
  // Default fallback (should not reach here)
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ...blockProps
  });
}

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./src/photo-gallery/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/photo-gallery/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./save */ "./src/photo-gallery/save.js");



(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('photogallery/photo-gallery', {
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_2__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map