/**
 * Menu item structure:
 * {
 *   id: 'unique-id',            // Required: Unique identifier
 *   title: 'Menu Title',        // Required: Display text
 *   icon: 'icon-class',         // Optional: Icon class
 *   link: '/route/path',        // Optional: Router link (if no children)
 *   children: [                 // Optional: Nested menu items
 *     { 
 *       id, title, icon, link, children, ...
 *     }
 *   ]
 * }
 * 
 * ajjei children halna lai children keyword halna
 */
export const menuItems = [
    {
        id: 'dashboard',
        title: 'Modern',
        icon: 'ti ti-aperture',
        link: '/dashboard'
    },
    {
        id: 'Roles & Permissions',
        title: 'Roles & Permissions',
        icon: 'ti ti-lock',
        children:[
            {
                id: 'roles',
                title: 'Roles',
                icon: 'ti ti-key',
                link: '/roles'
            },
            {
                id: 'permissions',
                title: 'Permissions',
                icon: 'ti ti-shield-lock',
                link: '/permissions'
            }
        ]
    }
];

// Helper function to find a menu item by ID (traverses all levels)
export const findMenuItemById = (id, items = menuItems) => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findMenuItemById(id, item.children);
      if (found) return found;
    }
  }
  return null;
};

// Helper function to get all parent IDs for a given menu item ID
export const getParentMenuIds = (id, items = menuItems, parents = []) => {
  for (const item of items) {
    if (item.id === id) return parents;
    if (item.children) {
      const found = getParentMenuIds(id, item.children, [...parents, item.id]);
      if (found.length > parents.length) return found; // Found in this branch
    }
  }
  return parents;
};
