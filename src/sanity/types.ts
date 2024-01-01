import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Site Page
 *
 *
 */
export interface SitePage extends SanityDocument {
  _type: "site_page";

  /**
   * Title — `string`
   *
   * The title of the page.
   */
  title: string;

  /**
   * Slug — `slug`
   *
   * The path to the page on the site
   */
  slug: { _type: "slug"; current: string };

  /**
   * Page Builder — `array`
   *
   * Assemble your page using configurable modules.
   */
  pageBuilder?: Array<SanityKeyed<PeBlocks>>;

  /**
   * SEO Title — `string`
   *
   * An SEO title (appears in the tab bar). If unset, uses the page's title.
   */
  seo_title?: string;

  /**
   * SEO Description — `string`
   *
   * An SEO description. If unset, uses text from the page's content.
   */
  seo_description?: string;

  /**
   * SEO Keywords — `string`
   *
   * SEO keywords.
   */
  seo_keywords?: string;

  /**
   * Last Revalidated — `datetime`
   *
   * When this page was last revalidated. Re-publish or manually revalidate to change.
   */
  last_revalidated?: string;
}

/**
 * Site Home
 *
 *
 */
export interface SiteHome extends SanityDocument {
  _type: "site_home";

  /**
   * Title — `string`
   *
   * The title of the home page, used for SEO.
   */
  title?: string;

  /**
   * Overview — `array`
   *
   * A description of the website, used for SEO.
   */
  overview?: Array<SanityKeyed<SanityBlock>>;
}

/**
 * Site Settings
 *
 *
 */
export interface SiteSettings extends SanityDocument {
  _type: "site_settings";

  /**
   * Navigator Links — `array`
   *
   * Links displayed on the navigator.
   */
  menuItems?: Array<SanityKeyedReference<SitePage>>;

  /**
   * socials — `array`
   *
   *
   */
  socials?: Array<
    | SanityKeyed<SocialInstagram>
    | SanityKeyed<SocialFacebook>
    | SanityKeyed<SocialTwitter>
    | SanityKeyed<SocialEmail>
    | SanityKeyed<SocialWebsite>
  >;

  /**
   * Footer Pane 1 — `array`
   *
   * A block of text that will be displayed at the bottom of the page.
   */
  footer_pane1?: Array<
    | SanityKeyed<{
        _type: "image";
        asset: SanityReference<SanityImageAsset>;
        crop?: SanityImageCrop;
        hotspot?: SanityImageHotspot;
      }>
    | SanityKeyed<SanityBlock>
  >;

  /**
   * Footer Links — `array`
   *
   * Links displayed in the footer.
   */
  footer_items?: Array<SanityKeyedReference<SitePage>>;

  /**
   * Site Description — `string`
   *
   *
   */
  description?: string;
}

export type SocialInstagram = {
  _type: "social_instagram";
  /**
   * Username — `string`
   *
   *
   */
  username: string;
};

export type SocialFacebook = {
  _type: "social_facebook";
  /**
   * Link — `url`
   *
   *
   */
  link: string;
};

export type SocialTwitter = {
  _type: "social_twitter";
  /**
   * Username — `string`
   *
   *
   */
  username: string;
};

export type SocialEmail = {
  _type: "social_email";
  /**
   * Email — `email`
   *
   *
   */
  email: Email;
};

export type SocialWebsite = {
  _type: "social_website";
  /**
   * Link — `url`
   *
   *
   */
  link: string;
};

export type PeBlocks = {
  _type: "pe_blocks";
  /**
   * content — `array`
   *
   *
   */
  content?: Array<
    | SanityKeyed<{
        _type: "image";
        asset: SanityReference<SanityImageAsset>;
        crop?: SanityImageCrop;
        hotspot?: SanityImageHotspot;
      }>
    | SanityKeyed<SanityBlock>
  >;
};

export type Documents = SitePage | SiteHome | SiteSettings;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Email = any;
