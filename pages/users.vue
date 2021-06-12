<template>
  <div class="users">
    <div class="users__card">
      <UsersList/>
    </div>
    <nuxt/>
  </div>
</template>

<script>
import UsersList from "components/users/UsersList";

export default {
  name: "users",
  components: {
    UsersList,
  },
  fetch({store}) {
    store.commit('users/setList', require('~/users.json'));
    store.commit('tags/setList', require('~/tags.json'));
  },
}
</script>
