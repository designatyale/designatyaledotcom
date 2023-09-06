/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Sat Sep 02 2023
 * 2023 Design at Yale
 */

import { Member, PeGallery, SanityKeyed, SocialWebsite } from '@/sanity/schema';
import s from './Gallery.module.scss';
import { PortableText } from '@portabletext/react';
import components from '@/components/PortableText';
import unwrapReference from '@/util/unwrapReference';
import SanityImage from '@/components/SanityImage';
import classNames from 'classnames';

function GalleryMember({ member }: { member: Member }) {
  const image = unwrapReference(member.picture.asset);
  const website = member.socials?.find(
    (arg): arg is SanityKeyed<SocialWebsite> => arg._type === 'social_website'
  );
  return (
    <div className={s.member}>
      <SanityImage image={image} className={s.member_image} />
      <div>{member.name}</div>
      <div>{member.position}</div>
      {website && (
        <div>
          <a href={website.link} target="_blank" rel="noopener noreferrer">
            {new URL(website.link).hostname}
          </a>
        </div>
      )}
    </div>
  );
}

export default function Gallery({ value }: { value: PeGallery }) {
  if (!value.assets?.length) {
    return (
      <div>
        <ul className={classNames(s.temp_class)}>
          {value.title && (
            <li>
              <h3>{value.title}</h3>
            </li>
          )}
          <li>Oops, this isn&apos;t ready yet!</li>
        </ul>
      </div>
    );
  }

  return (
    <div className={s.container}>
      {value.copy && (
        <div className={s.copy}>
          <PortableText value={value.copy} components={components} />
        </div>
      )}
      <ul className={s.assets}>
        {value.assets.map((assetRef) => {
          const asset = unwrapReference(assetRef);
          switch (asset._type) {
            case 'member':
              return (
                <li key={asset._id}>
                  <GalleryMember member={asset} />
                </li>
              );
          }
        })}
      </ul>
    </div>
  );
}
