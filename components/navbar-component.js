export default {
  name: 'navbar-component',
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
          <router-link class="app-nav-link" to="/about">About AutoMeet</router-link>
        </div>
      </div>
    </nav>
  `,
};
