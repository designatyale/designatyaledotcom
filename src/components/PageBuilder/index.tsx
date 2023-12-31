/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */

import { SitePage } from '@/sanity/schema';
import Copy from './Copy';
import ActionBar from '@/components/PageBuilder/ActionBar';
import ActionButton from '@/components/PageBuilder/ActionButton';
import Gallery from '@/components/PageBuilder/Gallery';
import Showcase from '@/components/PageBuilder/Showcase';
import dynamic from 'next/dynamic';
import NewsletterSignUp from '@/components/PageBuilder/NewsletterSignUp';

const TableContents = dynamic(
  () => import('@/components/PageBuilder/Table/contents'),
  { ssr: false }
);

interface PageBuilderProps {
  content: SitePage['pageBuilder'];
  isPreview?: boolean;
}

/**
 * A component which synthesizes together a configured page builder object from
 * the backend and returns a list of rendered components. You should make sure
 * that all of your components have the necessary fields, e.g. that image and
 * entity references have been expanded in your GROQ query.
 */
export default function PageBuilder({
  content,
}: PageBuilderProps): JSX.Element[] {
  return (content || []).map((pageBlock) => {
    switch (pageBlock._type) {
      case 'pe_copy':
        return <Copy key={pageBlock._key} value={pageBlock} />;
      case 'pe_action_bar':
        return <ActionBar key={pageBlock._key} value={pageBlock} />;
      case 'pe_action_button':
        return <ActionButton key={pageBlock._key} value={pageBlock} />;
      case 'pe_gallery':
        return <Gallery key={pageBlock._key} value={pageBlock} />;
      case 'pe_showcase':
        return <Showcase key={pageBlock._key} value={pageBlock} />;
      case 'pe_table':
        return <TableContents key={pageBlock._key} value={pageBlock} />;
      case 'pe_nlsignup':
        return <NewsletterSignUp key={pageBlock._key} value={pageBlock} />;
    }
  });
}
