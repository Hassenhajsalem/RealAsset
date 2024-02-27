import { Helmet } from 'react-helmet-async';

import { KYCForm } from 'src/sections/kyc';
// import UserPage from 'src/sections/user/view/user-view';

// ----------------------------------------------------------------------

export default function UserPage() {

  return (
    <>
      <Helmet>
        <title> KYC </title>
      </Helmet>

      <KYCForm />
    </>
  );
}