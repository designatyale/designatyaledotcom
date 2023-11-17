/*
 * index.tsx
 * Author: Evan Kirkiles
 * Created On Fri Nov 17 2023
 * 2023 Design at Yale
 */

import { Sketch, db } from '@/lib/kysely';
import { useQuery } from '@tanstack/react-query';
import { ComponentView, UserViewComponent } from 'sanity/desk';
import s from './DoodleViewer.module.scss';

const DoodleViewer: UserViewComponent = ({ document, schemaType }) => {
  const { data, isLoading } = useQuery<Sketch[]>({
    queryKey: ['sketches'],
    queryFn: async () => await fetch('/api/sketches').then((r) => r.json()),
  });

  return (
    <div className={s.container}>
      <section></section>
      <h1>Favorites</h1>
      <hr />
      <section>
        <h1>All Doodles</h1>
        <hr />
        <div className={s.doodle_grid}>
          {data &&
            data.map((sketch) => (
              <article className={s.doodle} key={sketch.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sketch.image_url} alt="A sketch." />
                <h4>{sketch.name}</h4>
                <div>{sketch.email}</div>
                <div>
                  {new Date(
                    sketch.createdAt as any as string
                  ).toLocaleDateString('en-us', { dateStyle: 'long' })}
                </div>
                <div className={s.action_bar}>
                  <button>Favorite</button>
                  <button>Delete</button>
                </div>
              </article>
            ))}
        </div>
      </section>
    </div>
  );
};

export default DoodleViewer;
