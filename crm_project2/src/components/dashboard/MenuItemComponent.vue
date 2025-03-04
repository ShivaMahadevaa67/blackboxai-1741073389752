<script setup>
import {
  computed,
  defineEmits,
  defineProps,
} from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  activeItem: {
    type: String,
    default: ''
  },
  openSubmenus: {
    type: Array,
    default: () => []
  },
  depth: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['toggle-submenu', 'set-active']);

const isExpanded = computed(() => props.openSubmenus.includes(props.item.id));

const hasActiveChild = (menuItem) => {
  if (!menuItem.children) return false;
  return menuItem.children.some(child => {
    if (child.id === props.activeItem) return true;
    return hasActiveChild(child);
  });
};

const isSelected = computed(() => {
  if (props.item.children) {
    return hasActiveChild(props.item);
  }
  return props.item.id === props.activeItem;
});

const isActive = computed(() => props.item.id === props.activeItem);

const toggleSubmenu = (id) => {
  emit('toggle-submenu', id);
};

const setActive = (id) => {
  emit('set-active', id);
};
</script>

<template>
  <li class="sidebar-item" :class="{ 'selected': isSelected, 'active': isActive }">
    <!-- Menu item with no children -->
    <router-link v-if="!item.children && item.link" :to="item.link" class="sidebar-link"
      :class="{ 'router-link-active': isActive, [`depth-level-${depth}`]: true }">
      <span v-if="item.icon">
        <i :class="item.icon"></i>
      </span>
      <span v-else class="round-16 d-flex align-items-center justify-content-center">
        <i class="ti ti-circle"></i>
      </span>
      <span class="hide-menu">{{ item.title }}</span>
    </router-link>

    <!-- Menu item with no children and no link (just a label) -->
    <a v-else-if="!item.children" href="#" @click.prevent="setActive(item.id)" class="sidebar-link"
      :class="{ 'active': isActive, [`depth-level-${depth}`]: true }">
      <span v-if="item.icon">
        <i :class="item.icon"></i>
      </span>
      <span v-else class="round-16 d-flex align-items-center justify-content-center">
        <i class="ti ti-circle"></i>
      </span>
      <span class="hide-menu">{{ item.title }}</span>
    </a>

    <!-- Menu item with children (submenu) -->
    <template v-else>
      <a class="sidebar-link has-arrow" :class="[`depth-level-${depth}`, { 'active': isActive }]"
        href="javascript:void(0)" @click.prevent="toggleSubmenu(item.id)" :aria-expanded="isExpanded">
        <span v-if="depth === 0" class="d-flex">
          <i :class="item.icon"></i>
        </span>
        <span v-else class="round-16 d-flex align-items-center justify-content-center">
          <i class="ti ti-circle"></i>
        </span>
        <span class="hide-menu">{{ item.title }}</span>
      </a>

      <!-- Recursive rendering of children -->
      <ul v-if="item.children" :class="['collapse', `submenu-depth-${depth}`, { 'show': isExpanded }]"
        :style="{ 'padding-left': depth > 0 ? '0.5rem' : '0' }">
        <menu-item-component v-for="child in item.children" :key="child.id" :item="child" :active-item="activeItem"
          :open-submenus="openSubmenus" :depth="depth + 1" @toggle-submenu="$emit('toggle-submenu', $event)"
          @set-active="$emit('set-active', $event)" />
      </ul>
    </template>
  </li>
</template>

<style scoped>
/* Submenu indentation */
.depth-1 .sidebar-link,
.depth-2 .sidebar-link,
.depth-3 .sidebar-link {
  padding-left: 1rem;
}

.depth-2 .sidebar-link {
  padding-left: 1.5rem;
}

.depth-3 .sidebar-link {
  padding-left: 2rem;
}

/* Adjust font size for depth levels */
.depth-1 .sidebar-link,
.depth-2 .sidebar-link,
.depth-3 .sidebar-link {
  font-size: 1rem;
}

.depth-1 .sidebar-link:hover,
.depth-2 .sidebar-link:hover,
.depth-3 .sidebar-link:hover {
  background-color: rgba(var(--bs-primary-rgb), 0.05);
  border-radius: 5px;
}

/* Active item styling */
.sidebar-item.active>.sidebar-link {
  background-color: var(--bs-primary);
  color: white;
}

.sidebar-item.active>.sidebar-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 20%;
  height: 60%;
  width: 3px;
  background-color: var(--bs-primary);
  opacity: 0.7;
  border-radius: 0 3px 3px 0;
}

.submenu-depth-0 {
  margin-left: 0;
}

.submenu-depth-1 {
  margin-left: 0.5rem;
}

.submenu-depth-2 {
  margin-left: 1rem;
}

.submenu-depth-3 {
  margin-left: 1.5rem;
}
</style>
