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
import Doodle from '@/sanity/desk/components/DoodleViewer/DoodlePane';

const DoodleViewer: UserViewComponent = ({
  document,
  documentId,
  schemaType,
}) => {
  const { data: favorites, isLoading: favsLoading } = useQuery<Sketch[]>({
    queryKey: ['sketches:favorited', `prompt:${documentId}`],
    queryFn: async () =>
      await fetch(`/api/sketches?prompt_id=${documentId}&favorited=true`).then(
        (r) => r.json()
      ),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const { data: unfavorites, isLoading: unfavsLoading } = useQuery<Sketch[]>({
    queryKey: ['sketches:unfavorited', `prompt:${documentId}`],
    queryFn: async () =>
      await fetch(`/api/sketches?prompt_id=${documentId}&favorited=false`).then(
        (r) => r.json()
      ),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <div className={s.container}>
      <div>
        <h1>Prompt: {(document.displayed as any).name}</h1>
        ID: <code>{documentId}</code>
      </div>
      <section>
        <h2>Favorites</h2>
        <hr />
        <div className={s.doodle_grid}>
          {favorites &&
            favorites.map((sketch) => (
              <Doodle key={sketch.id} sketch={sketch} />
            ))}
        </div>
      </section>
      <section>
        <h2>Remaining</h2>
        <hr />
        <div className={s.doodle_grid}>
          {unfavorites &&
            unfavorites.map((sketch) => (
              <Doodle key={sketch.id} sketch={sketch} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default DoodleViewer;
