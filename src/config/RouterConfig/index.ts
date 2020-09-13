import Home from '@/page/Home';
import About from '@/page/About';
import Comment from '@/page/Comment';
import Note from '@/page/Note';

export interface IBaseConfigProps {
    path: string,
    exact : boolean,
    component: React.ComponentType<any>
}

const RouterConfig: IBaseConfigProps[] = [
    { 
        path: '/', 
        exact: true, 
        component: Home
    },
    {
        path: '/about',
        exact: true,
        component: About
    },
    {
        path: '/comment',
        exact: true,
        component: Comment
    },
    {
        path: '/note',
        exact: false,
        component: Note
    }
]


export default RouterConfig;
