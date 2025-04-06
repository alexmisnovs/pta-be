import type { Schema, Struct } from '@strapi/strapi';

export interface PtaDonateButton extends Struct.ComponentSchema {
  collectionName: 'components_pta_donate_buttons';
  info: {
    displayName: 'Donate Button';
  };
  attributes: {
    featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    link: Schema.Attribute.String;
  };
}

export interface PtaEventComments extends Struct.ComponentSchema {
  collectionName: 'components_pta_event_comments';
  info: {
    description: '';
    displayName: 'Event Comments';
  };
  attributes: {
    amountRaised: Schema.Attribute.Decimal;
    content: Schema.Attribute.RichText;
    heading: Schema.Attribute.Text;
  };
}

export interface PtaFeaturedProject extends Struct.ComponentSchema {
  collectionName: 'components_pta_featured_projects';
  info: {
    displayName: 'Featured project';
  };
  attributes: {
    currentDonations: Schema.Attribute.Decimal;
    description: Schema.Attribute.Text;
    goalDonations: Schema.Attribute.Decimal;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    projectLink: Schema.Attribute.Component<'shared.button-link', false>;
  };
}

export interface PtaHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_pta_hero_sections';
  info: {
    description: '';
    displayName: 'Hero section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    callToAction: Schema.Attribute.Component<'pta.donate-button', false>;
    content: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface PtaHomePageAbout extends Struct.ComponentSchema {
  collectionName: 'components_pta_home_page_abouts';
  info: {
    displayName: 'Home Page About';
  };
  attributes: {
    description: Schema.Attribute.Text;
    donateButtonLink: Schema.Attribute.Component<'pta.donate-button', false>;
    featuredImages: Schema.Attribute.Media<'images', true>;
    heading: Schema.Attribute.String;
  };
}

export interface PtaHomePageSlider extends Struct.ComponentSchema {
  collectionName: 'components_pta_home_page_sliders';
  info: {
    displayName: 'Home Page Slider';
    icon: 'picture';
  };
  attributes: {
    buttonLink: Schema.Attribute.Component<'shared.button-link', false>;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    slides: Schema.Attribute.Media<'images', true>;
  };
}

export interface PtaHomePageVolunteerBlock extends Struct.ComponentSchema {
  collectionName: 'components_pta_home_page_volunteer_blocks';
  info: {
    description: '';
    displayName: 'Home Page Volunteer Block';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface PtaRichTextMarkdown extends Struct.ComponentSchema {
  collectionName: 'components_pta_rich_text_markdowns';
  info: {
    displayName: 'Rich Text Markdown';
  };
  attributes: {
    content: Schema.Attribute.RichText;
  };
}

export interface PtaTextWithImage extends Struct.ComponentSchema {
  collectionName: 'components_pta_text_with_images';
  info: {
    description: '';
    displayName: 'Text With Image';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    file: Schema.Attribute.Media<'images'>;
    heading: Schema.Attribute.String;
    imageSide: Schema.Attribute.Enumeration<['right', 'left']>;
  };
}

export interface PtaTotalDonations extends Struct.ComponentSchema {
  collectionName: 'components_pta_total_donations';
  info: {
    description: '';
    displayName: 'Total Donations';
  };
  attributes: {
    donationLink: Schema.Attribute.Component<'shared.button-link', false>;
    text: Schema.Attribute.String;
    total: Schema.Attribute.Decimal;
  };
}

export interface SharedButtonLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_button_links';
  info: {
    description: '';
    displayName: 'Button Link';
    icon: 'code';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    link: Schema.Attribute.Text;
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

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'pta.donate-button': PtaDonateButton;
      'pta.event-comments': PtaEventComments;
      'pta.featured-project': PtaFeaturedProject;
      'pta.hero-section': PtaHeroSection;
      'pta.home-page-about': PtaHomePageAbout;
      'pta.home-page-slider': PtaHomePageSlider;
      'pta.home-page-volunteer-block': PtaHomePageVolunteerBlock;
      'pta.rich-text-markdown': PtaRichTextMarkdown;
      'pta.text-with-image': PtaTextWithImage;
      'pta.total-donations': PtaTotalDonations;
      'shared.button-link': SharedButtonLink;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
