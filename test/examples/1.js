import Loadable from 'react-loadable'

const Home = Loadable({ loader: () => import('@pages/Home/Home'), loading })
const NotFound = Loadable({ loader: () => import('@pages/NotFound/NotFound'), loading })
