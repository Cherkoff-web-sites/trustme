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
  /** Semantic heading level: only one h1 per page, use h2 for section titles */
  as?: 'h1' | 'h2';
}

export function PageTitle({ title, description, as: Heading = 'h1' }: PageTitleProps) {
  return (
    <div className={pageTitleWrapStyles}>
      <div className={pageTitleHeadingRowStyles}>
        <Heading className={pageTitleHeadingStyles}>{title}</Heading>
        <span className={pageTitleAccentStyles} />
        <span className={pageTitleAccentLineStyles} />
      </div>

      <p className={pageTitleDescriptionStyles}>{description}</p>
    </div>
  );
}
