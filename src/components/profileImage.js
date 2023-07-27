import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

const Image = ({ className }) => (
  <StaticImage
    src='../images/profile-fullres-cropped.jpg'
    className={className}
    alt='Jan Szczekulski'
    width={100}
    height={100}
  />
);
export default Image;
