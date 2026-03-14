import {
  pageTitleAccentLineStyles,
  pageTitleAccentStyles,
  pageTitleDescriptionStyles,
  pageTitleHeadingRowStyles,
  pageTitleHeadingStyles,
  pageTitleWrapStyles,
} from './PageTitle.styles';

export interface PageTitleProps {
  title: string;
  description: string;
}

export function PageTitle({ title, description }: PageTitleProps) {
  return (
    <div className={pageTitleWrapStyles}>
      <div className={pageTitleHeadingRowStyles}>
        <h1 className={pageTitleHeadingStyles}>{title}</h1>
        <span className={pageTitleAccentStyles} />
        <span className={pageTitleAccentLineStyles} />
      </div>

      <p className={pageTitleDescriptionStyles}>{description}</p>
    </div>
  );
}
