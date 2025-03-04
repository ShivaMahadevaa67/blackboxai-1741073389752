<template>
    <aside class="left-sidebar with-vertical">
        <div>
            <!-- ---------------------------------- -->
            <!-- Start Vertical Layout Sidebar -->
            <!-- ---------------------------------- -->
            <div class="brand-logo d-flex align-items-center justify-content-between">
                <a href="/main/index.html" class="text-nowrap logo-img">
                    <img src="/assets/images/logos/dark-logo.svg" class="dark-logo" alt="Logo-Dark" />
                    <!-- <img src="/assets/images/logos/light-logo.svg" class="light-logo" alt="Logo-light" /> -->
                </a>
                <a href="javascript:void(0)" class="sidebartoggler ms-auto text-decoration-none fs-5 d-block d-xl-none">
                    <i class="ti ti-x"></i>
                </a>
            </div>

            <nav class="sidebar-nav scroll-sidebar" data-simplebar>
                <ul id="sidebarnav">
                    <!-- ---------------------------------- -->
                    <!-- Home -->
                    <!-- ---------------------------------- -->
                    <li class="nav-small-cap">
                        <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
                        <span class="hide-menu">Home</span>
                    </li>

                    <!-- Dynamic Menu Items using the recursive component -->
                    <menu-item-component v-for="item in menuItemsRef" :key="item.id" :item="item"
                        :active-item="activeItem" :open-submenus="openSubmenus" :depth="0"
                        @toggle-submenu="toggleSubmenu" @set-active="setActiveItem" />
                </ul>
            </nav>

            <!-- Auth User Profile Logout Section -->
            <div class="fixed-profile p-3 mx-4 mb-2 bg-secondary-subtle rounded mt-3">
                <div class="hstack gap-3">
                    <div class="john-img">
                        <img src="/assets/images/profile/user-1.jpg" class="rounded-circle" width="40" height="40"
                            alt="modernize-img" />
                    </div>
                    <div class="john-title">
                        <h6 class="mb-0 fs-4 fw-semibold">Mathew</h6>
                        <span class="fs-2">Designer</span>
                    </div>
                    <button class="border-0 bg-transparent text-primary ms-auto" tabindex="0" type="button"
                        aria-label="logout" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="logout">
                        <i class="ti ti-power fs-6"></i>
                    </button>
                </div>
            </div>
            <!-- End of the Auth User Profile Logout Section -->

        </div>
    </aside>
</template>

<script setup>
import {
    computed,
    onMounted,
    ref,
    watch,
} from 'vue'

import {
    useRoute,
    useRouter,
} from 'vue-router'

import {
    findMenuItemById,
    getParentMenuIds,
    menuItems,
} from '@/services/menuService'

import MenuItemComponent from './MenuItemComponent.vue'

const router = useRouter();
const route = useRoute();
const menuItemsRef = ref(menuItems);
const activeItem = ref('dashboard');
const openSubmenus = ref([]);

// Navigate to the route if link is provided
const navigateToRoute = (itemId) => {
    const item = findMenuItemById(itemId);
    if (item && item.link) {
        router.push(item.link);
    }
};

const setActiveItem = (itemId) => {
    activeItem.value = itemId;

    // Open all parent submenus
    const parentIds = getParentMenuIds(itemId);
    openSubmenus.value = parentIds;

    // Navigate if the item has a link
    navigateToRoute(itemId);
};

const toggleSubmenu = (itemId) => {
    const index = openSubmenus.value.indexOf(itemId);
    if (index === -1) {
        openSubmenus.value.push(itemId);
    } else {
        // Close this submenu and all child submenus
        const item = findMenuItemById(itemId);
        if (item && item.children) {
            // Find all descendant IDs that need to be removed from openSubmenus
            const getAllChildIds = (children) => {
                let ids = [];
                for (const child of children) {
                    ids.push(child.id);
                    if (child.children) {
                        ids = [...ids, ...getAllChildIds(child.children)];
                    }
                }
                return ids;
            };

            const childIds = getAllChildIds(item.children);
            openSubmenus.value = openSubmenus.value.filter(
                id => id !== itemId && !childIds.includes(id)
            );
        } else {
            openSubmenus.value.splice(index, 1);
        }
    }
};

// Sync active menu with current route
const syncMenuWithRoute = () => {
    const path = route.path;

    // Helper function to find menu item by path
    const findItemByPath = (items, path) => {
        for (const item of items) {
            if (item.link === path) return item.id;
            if (item.children) {
                const found = findItemByPath(item.children, path);
                if (found) return found;
            }
        }
        return null;
    };

    const foundItemId = findItemByPath(menuItems, path);
    if (foundItemId) {
        setActiveItem(foundItemId);
    }
};

// Watch for route changes
watch(() => route.path, syncMenuWithRoute);

onMounted(() => {
    // Set initial state based on current route
    syncMenuWithRoute();

    // If no match was found, use the default
    if (!openSubmenus.value.length && activeItem.value === 'dashboard') {
        const parentIds = getParentMenuIds(activeItem.value);
        if (parentIds.length > 0) {
            openSubmenus.value = parentIds;
        }
    }
});
</script>

<style scoped>
/* Selected item (parent with active child) */
.sidebar-item.selected>.sidebar-link {
    background-color: var(--bs-primary);
    color: #fff;
    border-radius: 7px;
}

.sidebar-item.selected>.sidebar-link i {
    color: #fff;
}

/* Active item (the exact clicked item) */
.sidebar-item.active:not(.selected)>.sidebar-link {
    color: var(--bs-primary);
    font-weight: 500;
}

.sidebar-link:hover {
    background-color: rgba(var(--bs-primary-rgb), 0.08);
    border-radius: 7px;
}

.collapse {
    transition: max-height 0.3s ease;
    overflow: hidden;
    max-height: 0;
}

.collapse.show {
    max-height: 1000px;
}
</style>