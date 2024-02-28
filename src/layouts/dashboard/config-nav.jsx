import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfigure = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'profile',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'properties',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Kyc',
    path: '/kyc',
    icon: icon('ic_cart'),
  },
  {
    title: 'support&FAQ',
    path: '/support',
    icon: icon('ic_cart'),
  },


];

export default navConfigure;
