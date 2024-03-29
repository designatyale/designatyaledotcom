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
 * Design Tag
 *
 * Represents a "tag" to signify and filter by different types of design.
 */
export interface DesignTag extends SanityDocument {
  _type: "design_tag";

  /**
   * Color — `color`
   *
   * The color to signify this tag by.
   */
  color?: Color;

  /**
   * Title — `string`
   *
   * The title of this design tag.
   */
  title?: string;
}

/**
 * Event
 *
 *
 */
export interface Event extends SanityDocument {
  _type: "event";

  /**
   * Title — `string`
   *
   * The title of the event
   */
  title: string;

  /**
   * Image — `image`
   *
   * A picture to use as a promotional icon of the event—this should be square. Also note that the page this image is displayed on can have either a black or white background.
   */
  picture: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * About — `array`
   *
   * A short description of the event.
   */
  about?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Design Tags — `array`
   *
   *
   */
  design_tags?: Array<SanityKeyedReference<DesignTag>>;

  /**
   * Location — `array`
   *
   * Where will/did this event take place? (Keep this short, but add a link to Google Maps or the Zoom meeting if possible)
   */
  location?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Date & Time — `datetime`
   *
   * When will/did this event take place?
   */
  date?: string;

  /**
   * GCal Link — `url`
   *
   * A link to the Google Calendar event.
   */
  calendar_link?: string;

  /**
   * More Info Link — `url`
   *
   * A link to any additional information.
   */
  more_info?: string;

  /**
   * Featured Event Description — `array`
   *
   * A short event description to go on the homepage when this event is featured.
   */
  featureDescription?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Featured Event Images — `array`
   *
   * Images to cycle through on the homepage when this event is featured.
   */
  featureImages?: Array<
    SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;

      /**
       * Top Offset — `number`
       *
       * Percentage to offset the top by (0-100). Defaults to -1 (centers instead).
       */
      topOffset?: number;
    }>
  >;

  /**
   * Hidden from Search — `boolean`
   *
   * If true, hide this event from the DAY Directory search.
   */
  search_hidden?: boolean;

  /**
   * Last Revalidated — `datetime`
   *
   * When this page was last revalidated. Re-publish or manually revalidate to change.
   */
  last_revalidated?: string;
}

/**
 * Member
 *
 *
 */
export interface Member extends SanityDocument {
  _type: "member";

  /**
   * Name — `string`
   *
   * The name of the member
   */
  name: string;

  /**
   * Image — `image`
   *
   * A picture of the member, usually square.
   */
  picture: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Position — `string`
   *
   * (Optional) What position the member occupies in the community.
   */
  position?: string;

  /**
   * About — `array`
   *
   * A short tag line for the team member.
   */
  about?: Array<SanityKeyed<SanityBlock>>;

  /**
   * socials — `array`
   *
   *
   */
  socials?: Array<
    | SanityKeyed<SocialInstagram>
    | SanityKeyed<SocialWebsite>
    | SanityKeyed<SocialTwitter>
    | SanityKeyed<SocialEmail>
  >;

  /**
   * Design Focuses — `array`
   *
   *
   */
  design_tags?: Array<SanityKeyedReference<DesignTag>>;

  /**
   * Class Year — `number`
   *
   * (Optional) The members graduation year, for sorting purposes.
   */
  class_year?: number;

  /**
   * Start Date — `date`
   *
   * (Optional) When this member joined DAY.
   */
  start_date?: string;

  /**
   * End Date — `date`
   *
   * (Optional) When this member graduated from DAY.
   */
  end_date?: string;

  /**
   * Slug — `slug`
   *
   * (Optional) A slug for the member's page on the site.
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Page Builder — `array`
   *
   * The members page on the DAY site.
   */
  pageBuilder?: Array<
    | SanityKeyed<PeCopy>
    | SanityKeyed<PeActionBar>
    | SanityKeyed<PeActionButton>
    | SanityKeyed<PeGallery>
    | SanityKeyed<PeTable>
    | SanityKeyed<PeShowcase>
    | SanityKeyed<PeNlsignup>
  >;

  /**
   * Hidden from Search — `boolean`
   *
   * If true, hide this member from the DAY Directory search.
   */
  search_hidden?: boolean;

  /**
   * Last Revalidated — `datetime`
   *
   * When this page was last revalidated. Re-publish or manually revalidate to change.
   */
  last_revalidated?: string;
}

/**
 * Project
 *
 *
 */
export interface Project extends SanityDocument {
  _type: "project";

  /**
   * Name — `string`
   *
   * The name of the project
   */
  name: string;

  /**
   * Hero Image — `image`
   *
   * A hero picture of the project.
   */
  picture: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Additional Images — `array`
   *
   * Additional pictures of the project
   */
  pictures?: Array<
    SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  >;

  /**
   * About — `array`
   *
   * A short tag line for the project.
   */
  about?: Array<SanityKeyed<SanityBlock>>;

  /**
   * socials — `array`
   *
   *
   */
  socials?: Array<
    | SanityKeyed<SocialInstagram>
    | SanityKeyed<SocialWebsite>
    | SanityKeyed<SocialTwitter>
    | SanityKeyed<SocialEmail>
  >;

  /**
   * Design Focuses — `array`
   *
   *
   */
  design_tags?: Array<SanityKeyedReference<DesignTag>>;

  /**
   * Date — `string`
   *
   * When did this project take place?
   */
  date?: string;

  /**
   * Slug — `slug`
   *
   * (Optional) A slug for the project's page on the site.
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Page Builder — `array`
   *
   * The project's page on the DAY site.
   */
  pageBuilder?: Array<
    | SanityKeyed<PeCopy>
    | SanityKeyed<PeActionBar>
    | SanityKeyed<PeActionButton>
    | SanityKeyed<PeGallery>
    | SanityKeyed<PeTable>
    | SanityKeyed<PeShowcase>
    | SanityKeyed<PeNlsignup>
  >;

  /**
   * Last Revalidated — `datetime`
   *
   * When this page was last revalidated. Re-publish or manually revalidate to change.
   */
  last_revalidated?: string;
}

/**
 * Doodle Prompt
 *
 * Represents a prompt that people can draw on the website for!
 */
export interface Doodle extends SanityDocument {
  _type: "doodle";

  /**
   * Prompt — `string`
   *
   * The prompt.
   */
  name: string;

  /**
   * Link — `url`
   *
   * An optional link for the prompt to provide more context.
   */
  link?: string;
}

/**
 * Site Settings
 *
 *
 */
export interface SiteSettings extends SanityDocument {
  _type: "site_settings";

  /**
   * Site Title — `string`
   *
   * The name of the site (what shows in tab bar). Should be under 66 characters.
   */
  title?: string;

  /**
   * Site Description — `string`
   *
   * A short description of the site for SEO purposes. Should be under 160 characters.
   */
  description?: string;

  /**
   * Featured Event — `reference`
   *
   * An event to feature on the homepage—this should have all of the corresponding feature fields filled out (full bleed image, featured title, etc.)
   */
  featuredEvent?: SanityReference<Event>;
}

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
  pageBuilder: Array<
    | SanityKeyed<PeCopy>
    | SanityKeyed<PeActionBar>
    | SanityKeyed<PeActionButton>
    | SanityKeyed<PeGallery>
    | SanityKeyed<PeTable>
    | SanityKeyed<PeShowcase>
    | SanityKeyed<PeNlsignup>
  >;

  /**
   * Subpages — `array`
   *
   * Order of subpages (excluding the base subpage) in the nav bar.
   */
  subpageOrder?: Array<SanityKeyedReference<SitePage>>;

  /**
   * Root Subpage Title — `string`
   *
   * If there are existing subroutes, use this as the initial title to display in the subroute nav.
   */
  rootSubPageTitle?: string;

  /**
   * Base Subpage — `array`
   *
   * If there are existing subroutes, use this as the initial view to display in the subroute mechanism.
   */
  rootSubPageBuilder?: Array<
    | SanityKeyed<PeCopy>
    | SanityKeyed<PeActionBar>
    | SanityKeyed<PeActionButton>
    | SanityKeyed<PeGallery>
    | SanityKeyed<PeTable>
    | SanityKeyed<PeShowcase>
    | SanityKeyed<PeNlsignup>
  >;

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

export type PeCopy = {
  _type: "pe_copy";
  /**
   * content — `array`
   *
   *
   */
  content?: Array<SanityKeyed<SanityBlock>>;

  /**
   * columns — `number`
   *
   * How many evenly-spaced columns to break the text into. Default 1.
   */
  columns: number;
};

export type PeActionBar = {
  _type: "pe_action_bar";
  /**
   * Title — `string`
   *
   * An internal title for the action bar.
   */
  title?: string;

  /**
   * Items — `array`
   *
   * Action items in the bar.
   */
  items: Array<SanityKeyed<PeActionButton>>;

  /**
   * Layout Direction — `string`
   *
   * The layout flow of the action buttons
   */
  flex_dir: "row" | "column";

  /**
   * Justification — `string`
   *
   * How the buttons are justified.
   */
  justification:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-evenly"
    | "space-between"
    | "space-around";

  /**
   * Alignment — `string`
   *
   * How the buttons are aligned.
   */
  alignment: "flex-start" | "flex-end" | "center";
};

export type PeActionButton = {
  _type: "pe_action_button";
  /**
   * Items — `string`
   *
   * The display text of the button, or an accessible name if using an SVG.
   */
  content: string;

  /**
   * Icon — `image`
   *
   * An optional (preferably SVG) icon to use in place of the standard button.
   */
  icon?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * URL — `url`
   *
   * The URL this button will point to.
   */
  href: string;
};

export type PeGallery = {
  _type: "pe_gallery";
  /**
   * Title — `string`
   *
   * The title of the gallery to show above it.
   */
  title?: string;

  /**
   * Assets — `array`
   *
   * Assets to display in the gallery.
   */
  assets?: Array<SanityKeyedReference<Member>>;

  /**
   * Copy — `array`
   *
   * (Optional) Copy to display next to or above the gallery.)
   */
  copy?: Array<SanityKeyed<SanityBlock>>;
};

export type PeTable = {
  _type: "pe_table";
  /**
   * Algolia Index Name — `string`
   *
   * The name of the Algolia index to pull results from.
   */
  asset_type: "member" | "event";

  /**
   * Date Filter — `string`
   *
   * How to filter the events displayed in this table, based on the current date.
   */
  date_filter: "all" | "upcoming" | "past";

  /**
   * Compact? — `boolean`
   *
   * If true, show all rows as "compact" initially.
   */
  is_compact: boolean;

  /**
   * Searchable? — `boolean`
   *
   * If true, allow searching for elements based on their textual information.
   */
  is_searchable: boolean;

  /**
   * Search Placeholder — `string`
   *
   * A placeholder string for the table's search bar.
   */
  search_placeholder?: string;

  /**
   * Filterable? — `boolean`
   *
   * If true, allow filtering for elements based on Algolia-defined facets.
   */
  is_filterable: boolean;
};

export type PeShowcase = {
  _type: "pe_showcase";
  /**
   * Assets — `array`
   *
   * Assets to display in the gallery.
   */
  assets?: Array<SanityKeyedReference<Project>>;

  /**
   * Show legend? — `boolean`
   *
   * If true, displays a list of items to jump to next to the portfolio.
   */
  show_legend: boolean;

  /**
   * Copy — `array`
   *
   * (Optional) Copy to display above the gallery legend.)
   */
  copy?: Array<SanityKeyed<SanityBlock>>;
};

export type PeNlsignup = {
  _type: "pe_nlsignup";
  /**
   * Copy — `string`
   *
   * Text to display above the newsletter signup form. (Optional)
   */
  copy?: string;

  /**
   * Placeholder — `string`
   *
   * Placeholder text for the email input field.
   */
  placeholder?: string;
};

export type SocialInstagram = {
  _type: "social_instagram";
  /**
   * Username — `string`
   *
   *
   */
  username: string;
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

export type Documents =
  | DesignTag
  | Event
  | Member
  | Project
  | Doodle
  | SiteSettings
  | SitePage;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Color = any;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Email = any;
