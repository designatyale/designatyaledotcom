/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Tue Sep 05 2023
 * 2023 Design at Yale
 */
import { ComponentProps, forwardRef, PropsWithChildren, ReactNode } from 'react';
import cx from 'classnames';
import s from '../FacetDropdown/FacetDropDown.module.scss';

export type PanelProps = ComponentProps<'div'> &
  PropsWithChildren<{
    header?: string | ReactNode;
    footer?: string | ReactNode;
    classNames?: Partial<PanelClassNames>;
  }>;

export type PanelClassNames = {
  root: string;
  header: string;
  body: string;
  footer: string;
};

export default forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { children, header, footer, className, classNames = {}, ...props },
  ref
) {
  return (
    <div
      {...props}
      className={cx(s['ais-Panel'], classNames.root, className)}
      ref={ref}
    >
      {header && (
        <div className={cx(s['ais-Panel-header'], classNames.header)}>
          {header}
        </div>
      )}
      <div className={cx(s['ais-Panel-body'], classNames.body)}>{children}</div>
      {footer && (
        <div className={cx(s['ais-Panel-footer'], classNames.footer)}>
          {footer}
        </div>
      )}
    </div>
  );
});
