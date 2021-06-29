import { AuthGuard, ResolveGuard } from './guards'
const Landing = () => import('../components/layout/Landing')
const Login = () => import('../components/auth/Login')
const Register = () => import('../components/auth/Register')
const Dashboard = () => import('../components/page/Dashboard')
const Profiles = () => import('../components/page/Profiles')
const Profile = () => import('../components/page/Profile')
const ProfileForm = () => import('../components/page/ProfileForm')
const SubProfileForm = () => import('../components/page/SubProfileForm')
const PostLayout = () => import('../components/page/PostLayout')

export const routes = [
  {
    path: '',
    name: 'Landing',
    component: Landing,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/profiles',
    name: 'Profiles',
    component: Profiles,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: '/profiles/:userId',
    name: 'Profile',
    component: Profile,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: '/profile/create',
    name: 'ProfileCreate',
    component: ProfileForm,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: '/profile/edit',
    name: 'ProfileEdit',
    component: ProfileForm,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: '/profile/experience',
    name: 'Experience',
    component: SubProfileForm,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: '/profile/education',
    name: 'Education',
    component: SubProfileForm,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: '/posts',
    name: 'Posts',
    component: PostLayout,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: '/posts/:postId',
    name: 'PostDetail',
    component: PostLayout,
    beforeEnter: ResolveGuard([AuthGuard])
  }
]
