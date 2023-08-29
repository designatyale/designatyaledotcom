/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Tue Aug 29 2023
 * 2023 Design at Yale
 */
import RegistrationMark from '@/assets/svg/RegistrationMark';
import s from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={s.container}>
      <div className={s.crop_lines} role="presentation">
        <RegistrationMark />
      </div>
    </footer>
  );
}
