import type { Struct, Schema } from '@strapi/strapi';

export interface SharedTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonials';
  info: {
    displayName: 'testimonial';
    icon: 'attachment';
  };
  attributes: {
    authorName: Schema.Attribute.String;
    quote: Schema.Attribute.Text;
    photo: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface SharedSpoiler extends Struct.ComponentSchema {
  collectionName: 'components_shared_spoilers';
  info: {
    displayName: 'spoiler';
    icon: 'chartPie';
  };
  attributes: {
    clickableText: Schema.Attribute.String;
    actualSpoiler: Schema.Attribute.Text;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    displayName: 'Slider';
    icon: 'address-book';
    description: '';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    name: 'Seo';
    icon: 'allergies';
    displayName: 'Seo';
    description: '';
  };
  attributes: {
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedRitcherText extends Struct.ComponentSchema {
  collectionName: 'components_shared_ritcher_texts';
  info: {
    displayName: 'Ritcher Text';
    icon: 'check';
  };
  attributes: {
    content: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'Rich Text';
    icon: 'align-justify';
    description: '';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    title: Schema.Attribute.String;
    body: Schema.Attribute.Text;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedCkeditor extends Struct.ComponentSchema {
  collectionName: 'components_shared_ckeditors';
  info: {
    displayName: 'ckeditor';
    icon: 'file';
  };
  attributes: {
    editor: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'rich';
        }
      >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.testimonial': SharedTestimonial;
      'shared.spoiler': SharedSpoiler;
      'shared.slider': SharedSlider;
      'shared.seo': SharedSeo;
      'shared.ritcher-text': SharedRitcherText;
      'shared.rich-text': SharedRichText;
      'shared.quote': SharedQuote;
      'shared.media': SharedMedia;
      'shared.ckeditor': SharedCkeditor;
    }
  }
}
