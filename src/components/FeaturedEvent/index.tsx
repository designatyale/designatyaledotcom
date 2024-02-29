/*
 * index.tsx
 * Author: Evan Kirkiles
 * Created On Wed Feb 28 2024
 * 2024 Design at Yale
 */
'use client';

import { Event } from '@/sanity/schema';
import s from './FeaturedEvent.module.scss';
import SanityImage from '@/components/SanityImage';
import { useLayoutEffect, useState } from 'react';
import { SwitchTransition } from 'transition-hook';
import { PortableText } from '@portabletext/react';
import classNames from 'classnames';

interface FeaturedEventProps {
  event: Event;
}

export default function FeaturedEvent({ event }: FeaturedEventProps) {
  const [imageI, setImageI] = useState(1);
  useLayoutEffect(() => {
    document.body.classList.add('full-bleed');
    return () => document.body.classList.remove('full-bleed');
  }, []);

  return (
    <section className={s.featuredevent}>
      <div className={s.featuredevent_header}>
        <h2>Upcoming Event</h2>
        <PortableText value={event.featureDescription || []} />
      </div>
      {event.featureImages && (
        <SwitchTransition state={imageI} mode="out-in" timeout={300}>
          {(i, stage) => {
            const image = event.featureImages![i];
            return (
              <SanityImage
                image={image}
                sizes="(max-width: 30em) 200vw, 100vw"
                priority
                loadFade
                className={classNames(
                  s.feature_image,
                  {
                    from: s.feature_image_from,
                    enter: s.feature_image_enter,
                    leave: s.feature_image_leave,
                  }[stage]
                )}
                onClick={() => setImageI((i + 1) % event.featureImages!.length)}
                style={{
                  objectPosition:
                    image.topOffset && image.topOffset >= 0
                      ? `center ${image.topOffset}%`
                      : undefined,
                }}
              />
            );
          }}
        </SwitchTransition>
      )}
    </section>
  );
}
