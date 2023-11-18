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
            data.map((sketch) => <Doodle key={sketch.id} sketch={sketch} />)}
        </div>
      </section>
    </div>
  );
};

export default DoodleViewer;
