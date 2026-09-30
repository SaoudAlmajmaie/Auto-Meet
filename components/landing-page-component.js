export default {
  name: 'landing-page-component',
  template: /* html */ `
    <div class="landing-page">
      <section class="container landing-hero" aria-labelledby="landing-title">
        <div class="landing-copy">
          <p class="eyebrow">CAR SHOWS, IN ONE PLACE</p>
          <h1 id="landing-title">Find your next car show.</h1>
          <p>AutoMeet brings local car shows together, so it is easier to find a meet, check the details, and plan your next outing.</p>
          <div class="landing-actions">
            <router-link to="/items" class="btn btn-primary">
              <i class="bi bi-compass me-2" aria-hidden="true"></i>Explore car shows
            </router-link>
            <router-link to="/login" class="btn btn-outline-primary">Login</router-link>
            <router-link to="/signup" class="btn btn-outline-primary">Sign Up</router-link>
          </div>
        </div>

        <div class="landing-visual">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85"
            alt="Classic sports car on a scenic road"
            fetchpriority="high" />
          <div class="landing-photo-caption">
            <span>AutoMeet</span>
            <span>Find a meet worth the drive.</span>
          </div>
        </div>
      </section>

      <section class="container landing-intro" aria-labelledby="landing-intro-title">
        <h2 id="landing-intro-title">Make room for the next meet.</h2>
        <p>Browse local car shows and get the information you need to decide where to go next.</p>
        <router-link to="/items" class="link-primary fw-bold text-decoration-none">
          Browse car shows <i class="bi bi-arrow-right ms-1" aria-hidden="true"></i>
        </router-link>
      </section>
    </div>
  `,
};
