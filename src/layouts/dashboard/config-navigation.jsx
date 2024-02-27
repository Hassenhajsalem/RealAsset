import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
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
    title: 'add property',
    path: '/blog',
    icon: icon('ic_blog'),
  },

];

export default navConfig;
