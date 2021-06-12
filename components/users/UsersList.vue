<template>
  <div class="users-list">
    <div class="users-list__search">
      <InputMaterial
        placeholder="Search user"
        @update="search = $event"
      />
    </div>
    <div class="users-list__header">
      <div class="users-list__header-count">
        <span>{{ sortedUsers.length }}</span>
        items
      </div>
      <div
        @click="toggleSortStatus"
        class="users-list__header-sort"
      >
        <img
          v-if="currentSortingStatus !== SORTING_STATUSES.NONE"
          :class="{'users-list__header-sort_desc': currentSortingStatus === SORTING_STATUSES.DESC}"
          src="/img/arrow-down.png"
          alt=""
        >
        Sort by Date
      </div>
    </div>
    <div class="users-list__list">
      <VirtualList :row-height="78" :visible-rows="8" :items="sortedUsers">
        <template #default="{list}">
          <router-link
            v-for="user in list" :key="user.id"
            :to="`/users/${user.id}`"
            custom
            v-slot="{ navigate }"
          >
            <div @click="navigate" class="users-list__item">
              <div class="users-list__item-avatar">
                <Avatar :full-name="user.fullName"/>
              </div>
              <div class="users-list__item-description">
                <div class="users-list__item-title">{{ user.fullName }}</div>
                <div class="users-list__item-subtitle">Created {{ user.created_at | toDaysAgo }} days ago</div>
              </div>
              <div @click.prevent="deleteUser(user.id)" class="users-list__item-icon">
                <img src="/img/trash_container.png" alt="">
              </div>
            </div>
          </router-link>
        </template>
      </VirtualList>
      <div v-if="sortedUsers.length === 0">Users Not Found</div>
    </div>
  </div>
</template>

<script>
import InputMaterial from "components/form/InputMaterial";
import VirtualList from "components/VirtualList";
import Avatar from "components/users/Avatar";
import {getNowTimestamp} from "helpers/FormatDate";

const SORTING_STATUSES = {
  NONE: 'none',
  ASC: 'asc',
  DESC: 'desc',
}

export default {
  name: "UsersList",
  components: {
    InputMaterial,
    VirtualList,
    Avatar,
  },
  data() {
    return {
      SORTING_STATUSES,
      currentSortingStatus: SORTING_STATUSES.NONE,
      search: '',
    };
  },
  computed: {
    sortedUsers() {
      return this.$store.getters["users/getSortedUsers"](this.search.toLowerCase(), this.currentSortingStatus);
    },
  },
  methods: {
    toggleSortStatus() {
      if (this.currentSortingStatus === SORTING_STATUSES.NONE) {
        this.currentSortingStatus = SORTING_STATUSES.ASC;
      } else if (this.currentSortingStatus === SORTING_STATUSES.ASC) {
        this.currentSortingStatus = SORTING_STATUSES.DESC;
      } else {
        this.currentSortingStatus = SORTING_STATUSES.NONE;
      }
    },
    deleteUser(id) {
      this.$store.dispatch('users/deleteUser', id);
    },
  },
  filters: {
    toDaysAgo(timestamp) {
      const oneDay = 24 * 60 * 60 * 1000;
      return Math.round(Math.abs((getNowTimestamp() - timestamp) / oneDay));
    },
  },
}
</script>
