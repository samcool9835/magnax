// --- Types ---

export interface SubItem {
  label: string;
  path: string;
}

export interface Column {
  title: string;
  items: SubItem[];
}       

export interface NavItem {
  label: string;
  path?: string;
  dropdownKey?: string;
  featured?: {
    title: string;
    description: string;
    image: string;
  }
  columns?: Column[];
};