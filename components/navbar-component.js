export default {
  name: 'navbar-component',
  setup() {
    const registrationStore = Vue.inject('registrationStore');
    const router = VueRouter.useRouter();

    const logOut = () => {
      registrationStore.isLoggedIn = false;
      registrationStore.notice = { type: '', message: '' };
      router.push('/');
    };

    return {
      registrationStore,
      logOut,
    };
  },
  template: /* html */ `
    <nav class="app-navbar sticky-top" aria-label="Main navigation">
      <div class="app-navbar-inner">
        <router-link class="app-brand" to="/" aria-label="AutoMeet home">
          <i class="bi bi-car-front-fill app-brand-icon" aria-hidden="true"></i>
          <span>AutoMeet</span>
        </router-link>

        <div class="app-nav-links">
          <router-link class="app-nav-link" to="/">Home</router-link>
          <router-link class="app-nav-link" to="/items">Discover</router-link>
          <router-link class="app-nav-link" to="/registered-events">My Shows</router-link>
          <router-link class="app-nav-link" to="/about">About AutoMeet</router-link>
          <router-link v-if="!registrationStore.isLoggedIn" class="app-nav-link" to="/login">Login</router-link>
          <router-link v-if="!registrationStore.isLoggedIn" class="app-nav-link" to="/signup">Sign Up</router-link>
          <button v-else type="button" class="app-nav-link" @click="logOut">Log out</button>
        </div>
      </div>
    </nav>
  `,
};
