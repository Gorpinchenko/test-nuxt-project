<template>
  <div class="users__card">
    <UserProfile/>
  </div>
</template>

<script>
import UserProfile from "components/users/UserProfile";

export default {
  name: "user",
  components: {
    UserProfile,
  },
  fetch({store, params}) {
    store.dispatch('users/setCurrentUserById', params.id);
  },
}
</script>
