<template>
  <div class="user-profile">
    <div @click="$router.push('/users')" class="user-profile__close">x</div>
    <template v-if="user">
      <div class="user-profile__header">
        <div class="user-profile__header-avatar">
          <Avatar :full-name="user.fullName" :is-large="true"/>
        </div>
        <div class="user-profile__header-title">{{ user.fullName }}</div>
        <div class="user-profile__header-subtitle">@{{ user.username }}</div>
      </div>
      <div class="user-profile__form">
        <InputMaterial
          type="date"
          label="Created at"
          :value="dateToISOString(user.created_at).substring(0, 10)"
          :disabled="!isAllowEdit"
          icon-src="/img/calendar.png"
          @input="setCreatedAt"
          @dblclick="allowEdit"
        />
        <InputMaterial
          label="Username"
          :value="user.username"
          :disabled="!isAllowEdit"
          @update="user.username = $event"
          @dblclick="allowEdit"
        />
        <InputMaterial
          type="email"
          label="Email"
          :value="user.email"
          :disabled="!isAllowEdit"
          @update="user.email = $event"
          @dblclick="allowEdit"
        />
        <InputTags
          :disabled="!isAllowEdit"
          :tags="$store.state.tags.list"
          :current-tags="user.tags"
          label="Tags"
          @update="user.tags = $event"
          @dblclick="allowEdit"
        />
        <InputAutocomplete
          :disabled="!isAllowEdit"
          :value="user.curator"
          :items="curatorItems"
          icon-src="/img/arrow-down.png"
          type="select"
          label="Curator"
          @update="setCurator"
          @dblclick="allowEdit"
        />
      </div>
      <div class="user-profile__button-group">
        <button
          @click="save"
          :disabled="!isAllowActions"
          type="button"
          class="user-profile__button user-profile__button_black"
        >
          <img src="/img/save.png" alt="">
          Save changes
        </button>
        <button
          @click="discard"
          :disabled="!isAllowActions"
          type="button"
          class="user-profile__button user-profile__button_white"
        >
          <img src="/img/discard.png" alt="">
          Discard
        </button>
      </div>
    </template>
    <div v-else>
      User Not Found
    </div>
  </div>
</template>

<script>
import InputMaterial from "components/form/InputMaterial";
import InputAutocomplete from "components/form/InputAutocomplete";
import InputTags from "components/form/InputTags";
import Avatar from "components/users/Avatar";
import {dateToISOString, dateToTimestamp, getNowTimestamp} from "helpers/FormatDate";

export default {
  name: "UserProfile",
  components: {
    Avatar,
    InputMaterial,
    InputAutocomplete,
    InputTags,
  },
  data() {
    return {
      isAllowEdit: false,
      user: null,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.users.currentUser;
    },
    users() {
      return this.$store.state.users.list;
    },
    curatorItems() {
      return this.users.filter(user => user.id !== this.user.id).map(user => ({
        title: user.username,
        value: user.id
      }));
    },
    isAllowActions() {
      return JSON.stringify(this.currentUser) !== JSON.stringify(this.user);
    }
  },
  methods: {
    allowEdit() {
      this.isAllowEdit = true;
    },
    setCreatedAt($e) {
      this.user.created_at = dateToTimestamp($e.target.value);
    },
    setCurator(id) {
      this.user.curator = id;
    },
    save() {
      this.user.edited_at = getNowTimestamp();
      this.$store.commit('users/update', this.user);
      this.isAllowEdit = false;
    },
    discard() {
      this.user = Object.assign({}, this.currentUser);
      this.isAllowEdit = false;
    },
    dateToISOString,
  },
  watch: {
    currentUser: {
      immediate: true,
      handler(value) {
        this.isAllowEdit = false;
        if (value) {
          this.user = Object.assign({}, value);
          this.user.tags = [...value.tags];
        } else {
          this.user = null;
        }
      },
    },
  },
}
</script>
