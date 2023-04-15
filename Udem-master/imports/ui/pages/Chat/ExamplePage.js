import React from 'react';
import Page from '../Page/Page';

const content = `
### This is my Markdown page
I can type **any** Markdown I want into this file and it will ultimately be parsed into HTML by the &lt;Page /&gt; component in the source of this page.
`;

const ProfilePage = () => (
  <div className="ProfilePage">
    <Page
      title="Profile Page"
      subtitle="Where people can view and edit their information."
      content={content}
    />
  </div>
);

export default ProfilePage;
