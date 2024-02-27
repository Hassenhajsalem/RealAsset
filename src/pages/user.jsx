
import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';
// import UserPage from 'src/sections/user/view/user-view';

// ----------------------------------------------------------------------

export default function UserPage() {

  return (
    <>
      <Helmet>
        <title> Profile </title>
      </Helmet>

      <UserView />
    </>
  );
}
