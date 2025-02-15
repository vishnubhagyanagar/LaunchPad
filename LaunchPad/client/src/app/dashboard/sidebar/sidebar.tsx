'use client';
import { useDashboardContext } from '../provider';
import css from '../style.module.css';
import { SidebarHeader } from './sidebarHeader';
import { SidebarItems } from './sidebarItems';


interface SidebarProps {
  mobileOrientation: 'start' | 'end';
}

const style = {
  mobileOrientation: {
    start: 'left-0 ',
    end: 'right-0 lg:left-0',
  },
  container: 'pb-32 lg:pb-12 bg-white',
  close: 'duration-700 ease-out hidden transition-all lg:w-24',
  open: 'absolute duration-500 ease-in transition-all w-8/12 z-40 sm:w-5/12 md:w-64',
  default: 'h-screen overflow-y-auto text-black top-0 lg:absolute bg-white lg:block lg:z-40',
  borderRight: 'border-r border-gray-300',
};

export function Sidebar(props: SidebarProps) {
  const { isOpen } = useDashboardContext();
  return (
    <aside
      className={`${style.default} 
        ${style.mobileOrientation[props.mobileOrientation]} 
        ${isOpen ? style.open : style.close} ${css.scrollbar}`}
    >
      <div className={style.container}>
        <SidebarHeader />
        <SidebarItems />
      </div>
    </aside>
  );
}