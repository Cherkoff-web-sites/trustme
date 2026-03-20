import { cn } from '../../../lib/cn';
import { settingsSidebarNavItemStyles } from './SettingsSidebarNav.styles';

export interface SettingsSidebarNavItem<T extends string> {
  key: T;
  label: string;
  icon?: string;
}

export interface SettingsSidebarNavProps<T extends string> {
  items: Array<SettingsSidebarNavItem<T>>;
  activeKey: T;
  onChange: (key: T) => void;
}

export function SettingsSidebarNav<T extends string>({
  items,
  activeKey,
  onChange,
}: SettingsSidebarNavProps<T>) {
  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isActive = item.key === activeKey;

        return (
          <button
            key={item.key}
            className={cn(
              settingsSidebarNavItemStyles,
              isActive ? 'bg-white/7 text-[#FDFEFF]' : 'text-[#FDFEFF] hover:bg-white/4',
            )}
            onClick={() => onChange(item.key)}
            type="button"
          >
            {item.icon ? (
              <img src={item.icon} alt="" className="mr-3 h-[18px] w-[18px] shrink-0" aria-hidden />
            ) : (
              <span className="mr-3 text-[#FDFEFF]">{isActive ? '◉' : '◌'}</span>
            )}
            <span>{item.label}</span>
            {isActive ? <span className="absolute bottom-3 right-0 top-3 w-1 rounded-full bg-[#057889]" /> : null}
          </button>
        );
      })}
    </div>
  );
}
