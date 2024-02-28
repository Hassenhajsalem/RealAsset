import { Helmet } from 'react-helmet-async';

import { SupportAndFAQ } from 'src/sections/support';

// ----------------------------------------------------------------------

export default function SupportPage() {

  return (
    <>
      <Helmet>
        <title> SupportAndFAQ </title>
      </Helmet>

      <SupportAndFAQ />
    </>
  );
}