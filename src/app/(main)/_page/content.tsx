/*
 * content.tsx
 * Author: Evan Kirkiles
 * Created On Sat Dec 09 2023
 * 2023 Design at Yale
 */

import { SiteHome } from '@/sanity/types';
import s from './HomePage.module.scss';

export interface HomePageProps {
  data: SiteHome | null;
}

export default function HomePageContent({ data }: HomePageProps) {
  return <div>HOME PAGE</div>;
}
