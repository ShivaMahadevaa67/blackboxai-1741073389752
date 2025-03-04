<script setup>
import {
  defineEmits,
  defineProps,
} from 'vue'

const props = defineProps({
    role: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['edit']);

const handleEditClick = (event) => {
    event.preventDefault();
    emit('edit');
};

//if user is more than 2 then show them in the additional users.
let additionalUsers = 0;
if (props.role.userCount > 2) {
    additionalUsers = props.role.userCount - 2;
}
</script>

<template>
    <div class="card h-100 shadow-sm">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="role-info">
                    <p class="text-muted mb-1">Total {{ role.userCount }} users</p>
                    <h5 class="card-title mb-0 fw-bold">{{ role.name }}</h5>
                </div>
                <div class="user-avatars d-flex align-items-center">
                    <div class="avatar-container">
                        <template v-for="(user, index) in role.users.slice(0, 2)" :key="user.id">
                            <img :alt="user.name" class="rounded-circle border border-white avatar-img"
                                :src="user.avatar" width="32" height="32"
                                :style="{ marginLeft: index > 0 ? '-8px' : '0' }" :title="user.name" />
                        </template>
                        <div v-if="additionalUsers > 0" class="additional-users"
                            :title="`${additionalUsers} more users`">
                            +{{ additionalUsers }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-3">
                <a href="#" class="btn bg-info-subtle text-info " @click="handleEditClick">
                    <i class="ti ti-edit me-1"></i> Edit Role
                </a>

                <!-- <a href="javascript:void(0)" class="btn bg-info-subtle text-info">Learn More</a> -->
                <div class="role-actions">
                    <i class="ti ti-clipboard text-muted me-2" title="View Permissions"></i>
                    <i class="ti ti-users text-muted" title="Manage Users"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    overflow: hidden;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

.role-info {
    max-width: 65%;
}

.card-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
}

.user-avatars {
    position: relative;
    flex-shrink: 0;
}

.avatar-container {
    display: flex;
    align-items: center;
}

.avatar-img {
    border-width: 2px !important;
    object-fit: cover;
    z-index: 1;
}

.additional-users {
    width: 32px;
    height: 32px;
    background-color: #e9ecef;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    margin-left: -8px;
    border: 2px solid white;
    z-index: 0;
}

.role-actions {
    cursor: pointer;
}

.role-actions i {
    transition: color 0.2s ease;
}

.role-actions i:hover {
    color: #6c757d !important;
}

.bg-info-subtle {
    background-color: var(--bs-info-bg-subtle) !important;
}

.btn-edit:hover {
    color: #0056b3 !important;
}
</style>
