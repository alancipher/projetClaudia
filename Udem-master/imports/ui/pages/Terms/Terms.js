import Page from '../Page/Page';
import React from 'react';

// TODO

const content = `
#### Terms
#### Use License
#### Disclaimer
#### Limitations
#### Accuracy of materials
#### Links
#### Modifications
#### Governing Law
`;

const Terms = () => (
  <div className="Terms">
    <Page
      title="Terms of Service"
      subtitle="Last updated May 29th, 2017"
      content={content}
    />
  </div>
);

export default Terms;
