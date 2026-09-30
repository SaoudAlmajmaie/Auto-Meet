export default {
  name: 'collection-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
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

    return {
      itemsStore,
      formatDate,
    };
  },
  template: /* html */ `
    <section class="container py-4 discover-page" aria-labelledby="discover-title">
      <header class="discover-header">
        <div>
          <h1 id="discover-title" class="h3 mb-2">Discover car shows</h1>
          <p class="text-muted mb-0">Find a local meet and explore the details before you go.</p>
        </div>
        <span class="discover-count" aria-live="polite">
          <strong>{{ itemsStore.items.length }}</strong>
          <span>{{ itemsStore.items.length === 1 ? 'show' : 'shows' }} listed</span>
        </span>
      </header>

      <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
        Loading car shows...
      </div>

      <div v-else-if="itemsStore.error" class="alert alert-danger" role="alert">
        {{ itemsStore.error }}
      </div>

      <div v-else-if="itemsStore.items.length === 0" class="alert alert-warning" role="alert">
        No car shows are available right now.
      </div>

      <div v-else class="row g-4 discover-grid">
        <div class="col-12 col-sm-6 col-lg-4" v-for="item in itemsStore.items" :key="item.id">
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
                <span class="badge text-bg-primary show-card-category">{{ item.category || 'General' }}</span>
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
