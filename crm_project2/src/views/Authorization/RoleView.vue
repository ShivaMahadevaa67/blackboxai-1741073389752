<script setup>
import { ref } from 'vue'

import RoleCard from '@/components/Role/RoleCard.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

// Sample role data
const roles = ref([
  {
    id: 1,
    name: 'Administrator',
    userCount: 3,
    users: [
      { id: 1, name: 'John Doe', avatar: 'https://storage.googleapis.com/a1aa/image/9gijj7Y7pl9bJQkEk2OkaaFkKuHJtKPdxdgmVEAptQc.jpg' },
      { id: 2, name: 'Jane Smith', avatar: 'https://storage.googleapis.com/a1aa/image/9kQJaFAF1B7uAzSnjiYpou0nZUxWRHDcxPbkObRFfeM.jpg' },
      { id: 4, name: 'Sarah Williams', avatar: 'https://storage.googleapis.com/a1aa/image/Cqu77sJQEKOzUDTSo52CixWasER9ybqzDw1NqpG7GAU.jpg' }
    ]
  },
  {
    id: 2,
    name: 'Manager',
    userCount: 2,
    users: [
      { id: 5, name: 'Robert Brown', avatar: 'https://storage.googleapis.com/a1aa/image/9gijj7Y7pl9bJQkEk2OkaaFkKuHJtKPdxdgmVEAptQc.jpg' },
      { id: 6, name: 'Emily Davis', avatar: 'https://storage.googleapis.com/a1aa/image/9kQJaFAF1B7uAzSnjiYpou0nZUxWRHDcxPbkObRFfeM.jpg' },
    ]
  },
  {
    id: 3,
    name: 'Editor',
    userCount: 2,
    users: [
      { id: 8, name: 'Patricia Moore', avatar: 'https://storage.googleapis.com/a1aa/image/9gijj7Y7pl9bJQkEk2OkaaFkKuHJtKPdxdgmVEAptQc.jpg' },
      { id: 9, name: 'Thomas Taylor', avatar: 'https://storage.googleapis.com/a1aa/image/9kQJaFAF1B7uAzSnjiYpou0nZUxWRHDcxPbkObRFfeM.jpg' },
    ]
  },
  {
    id: 4,
    name: 'Viewer',
    userCount: 2,
    users: [
      { id: 10, name: 'Daniel Martin', avatar: 'https://storage.googleapis.com/a1aa/image/9gijj7Y7pl9bJQkEk2OkaaFkKuHJtKPdxdgmVEAptQc.jpg' },
      { id: 11, name: 'Lisa Thompson', avatar: 'https://storage.googleapis.com/a1aa/image/9kQJaFAF1B7uAzSnjiYpou0nZUxWRHDcxPbkObRFfeM.jpg' },
    ]
  }
])

const editRole = (roleId) => {
  console.log(`Editing role with ID: ${roleId}`)
  // Implement role editing logic
}

const addNewRole = () => {
  console.log('Adding new role')
  // Implement role creation logic
}
</script>

<template>
  <DashboardLayout>
    <div class="container py-4 enhanced-container">
      <div class="header d-flex justify-content-between align-items-center mb-4">
        <h2 class=" mb-0 header-title">Role Management</h2>
        <button @click="addNewRole" class="btn btn-primary">
          <i class="ti ti-plus me-1"></i> Add New Role
        </button>
      </div>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
        <!-- Role Cards -->
        <div class="col" v-for="role in roles" :key="role.id">
          <RoleCard :role="role" @edit="editRole(role.id)" />
        </div>

        <!-- Add New Role Card -->
        <div class="col">
          <div class="card h-100 shadow border-dashed cursor-pointer new-role-card" @click="addNewRole">
            <div class="card-body d-flex align-items-center justify-content-center">
              <div class="text-center">
                <i class="ti ti-plus-circle text-muted fs-1"></i>
                <p class="mb-0 mt-2">Create New Role</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.enhanced-container {
  background-color: #fefefe;
  border-radius: 8px;
  padding: 20px;
}

.header-title {
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.border-dashed {
  border-style: dashed !important;
  border-width: 2px !important;
  border-color: #c0c0c0;
  border-radius: 8px;
}

.cursor-pointer {
  cursor: pointer;
}

.new-role-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  border-radius: 8px;
  background-color: #fff;
}

.new-role-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}
</style>
