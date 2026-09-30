export default {
  name: 'registered-events-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const registrationStore = Vue.inject('registrationStore');

    const formatDate = (dateString) => {
      if (!dateString) {
        return 'Date to be announced';
      }

      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(Date.UTC(year, month - 1, day));

      return Number.isNaN(date.getTime())
        ? 'Date to be announced'
        : new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'UTC',
          }).format(date);
    };

    const registeredItems = Vue.computed(() => {
      if (!itemsStore.items.length) {
        return [];
      }

      const registeredIds = new Set(registrationStore.registeredItemIds || []);
      return itemsStore.items.filter((item) => registeredIds.has(item.id));
    });

    return {
      itemsStore,
      registrationStore,
      registeredItems,
      formatDate,
    };
  },
  template: /* html */ `
    <section class="container py-4 registered-events-page" aria-labelledby="registered-events-title">
      <header class="discover-header">
        <div>
          <h1 id="registered-events-title" class="h3 mb-2">Your registered car shows</h1>
          <p class="text-muted mb-0">Here are the meets you’ve already saved to your plan.</p>
        </div>
        <span class="discover-count" aria-live="polite">
          <strong>{{ registeredItems.length }}</strong>
          <span>{{ registeredItems.length === 1 ? 'show' : 'shows' }} saved</span>
        </span>
      </header>

      <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
        Loading your registrations...
      </div>

      <div v-else-if="itemsStore.error" class="alert alert-danger" role="alert">
        {{ itemsStore.error }}
      </div>

      <div v-else-if="registeredItems.length === 0" class="alert alert-info" role="status">
        You haven’t registered for any car shows yet. <router-link to="/items">Browse available shows</router-link> to get started.
      </div>

      <div v-else class="row g-4 discover-grid">
        <div class="col-12 col-sm-6 col-lg-4" v-for="item in registeredItems" :key="item.id">
          <article class="card show-card h-100">
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.title"
              class="card-img-top show-card-image object-fit-cover" />
            <div
              v-else
              class="show-card-image d-flex align-items-center justify-content-center bg-light text-muted">
              No image available
            </div>

            <div class="card-body show-card-body d-flex flex-column">
              <div class="show-card-heading">
                <h2 class="h5 card-title show-card-title">{{ item.title }}</h2>
                <span class="badge text-bg-success show-card-category">Registered</span>
              </div>

              <p class="card-text text-muted flex-grow-1 show-card-description">
                {{ item.description || 'No description available.' }}
              </p>

              <p class="show-card-meta show-card-date">
                <i class="bi bi-calendar-event" aria-hidden="true"></i>
                <span><strong>Date</strong><time :datetime="item.date">{{ formatDate(item.date) }}</time></span>
              </p>

              <p class="show-card-meta show-card-location">
                <i class="bi bi-geo-alt" aria-hidden="true"></i>
                <span><strong>Location</strong>{{ item.location || 'To be announced' }}</span>
              </p>

              <router-link :to="'/items/' + item.id" class="btn btn-outline-secondary show-card-action">
                View show <i class="bi bi-arrow-right ms-1" aria-hidden="true"></i>
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
};
