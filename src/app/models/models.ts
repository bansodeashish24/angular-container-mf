export interface BreadCrumb {
  id: number;
  title: string;
  link: string;
  isDisabled?: boolean;
}

export interface SidebarMenuItem {
  id: number;
  i18n_key: string;
  title: string;
  activeImageUrl: string;
  inactiveImageUrl: string;
  isActive: boolean;
  children?: SidebarMenuItem[];
  routeURL: string;
}

export interface AvailableLanguageItem {
  title: string;
  i18n_key: string;
  value: string;
  imgUrl: string;
}
