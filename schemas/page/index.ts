/*
 * index.ts
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 *
 * As you add more PageBuilder elements in this directory, add them to the
 * below array to enable them in the SitePage document page builder type. This
 * will also automatically add them to the Sanity schema.
 */
import ActionBarType from './ActionBarType';
import ActionButtonType from './ActionButtonType';
import CopyType from './CopyType';
import GalleryType from './GalleryType';

const pageElements = [CopyType, GalleryType, ActionBarType, ActionButtonType];

export default pageElements;
