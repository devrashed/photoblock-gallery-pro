import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { images = [], maxRows = 3 } = attributes;
  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps} className="my-gallery">
      <div className="my-gallery__grid" style={{ '--columns': maxRows }}>
        {images.map((img) => (
          <figure key={img.id} className="my-gallery__item">
            <img src={img.url} alt={img.alt} />
            {img.caption && <figcaption>{img.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
}
