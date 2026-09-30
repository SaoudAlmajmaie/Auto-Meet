export default {
  name: 'item-detail-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const registrationStore = Vue.inject('registrationStore');
    const route = VueRouter.useRoute();
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

    const selectedItem = Vue.computed(() => {
      return itemsStore.items.find((item) => item.id === route.params.id);
    });

    const isRegisteredForCurrentItem = Vue.computed(() => {
      return selectedItem.value && registrationStore.registeredItemIds.includes(selectedItem.value.id);
    });

    const registerForCurrentItem = () => {
      if (!selectedItem.value) {
        return;
      }

      if (!registrationStore.isLoggedIn) {
        registrationStore.notice = {
          type: 'warning',
          message: 'Please log in to register for this car show.',
        };
        return;
      }

      if (registrationStore.registeredItemIds.includes(selectedItem.value.id)) {
        registrationStore.notice = {
          type: 'warning',
          message: `You are already registered for "${selectedItem.value.title}".`,
        };
        return;
      }

      registrationStore.registeredItemIds.push(selectedItem.value.id);
      registrationStore.notice = {
        type: 'success',
        message: `You are registered for "${selectedItem.value.title}".`,
      };
    };

    return {
      itemsStore,
      registrationStore,
      selectedItem,
      formatDate,
      isRegisteredForCurrentItem,
      registerForCurrentItem,
    };
  },
  template: /* html */ `
    <section class="container py-4">
      <router-link to="/items" class="btn btn-link ps-0 mb-3">← Back to car shows</router-link>

      <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
        Loading show details...
      </div>

      <div v-else-if="itemsStore.error" class="alert alert-danger" role="alert">
        {{ itemsStore.error }}
      </div>

      <div v-else-if="!selectedItem" class="alert alert-warning" role="alert">
          Car show not found.
      </div>

      <article v-else class="card shadow-sm border-0 overflow-hidden">
        <img
          v-if="selectedItem.image"
          :src="selectedItem.image"
          :alt="selectedItem.title"
          class="item-detail-image w-100 object-fit-cover" />
        <div
          v-else
          class="item-detail-image w-100 d-flex align-items-center justify-content-center bg-light text-muted">
          No image available
        </div>

        <div class="card-body p-4">
          <div class="item-detail-heading">
            <h1 class="h3 mb-0">{{ selectedItem.title }}</h1>
            <span class="badge text-bg-primary">{{ selectedItem.category || 'General' }}</span>
          </div>

          <dl class="item-detail-meta">
            <div>
              <dt><i class="bi bi-calendar-event" aria-hidden="true"></i> Date</dt>
              <dd><time :datetime="selectedItem.date">{{ formatDate(selectedItem.date) }}</time></dd>
            </div>
            <div>
              <dt><i class="bi bi-clock" aria-hidden="true"></i> Time</dt>
              <dd>{{ selectedItem.time || 'Time to be announced' }}</dd>
            </div>
            <div>
              <dt><i class="bi bi-geo-alt" aria-hidden="true"></i> Location</dt>
              <dd>{{ selectedItem.location || 'To be announced' }}</dd>
            </div>
          </dl>

          <div class="item-detail-description">
            <h2 class="h5">About this show</h2>
            <p class="lead mb-0">{{ selectedItem.description || 'No description available.' }}</p>
          </div>

          <div class="item-detail-actions mt-4">
            <button
              v-if="!isRegisteredForCurrentItem"
              type="button"
              class="btn btn-primary"
              @click="registerForCurrentItem">
              Register for this show
            </button>
            <button
              v-else
              type="button"
              class="btn btn-outline-primary disabled"
              disabled
              aria-disabled="true">
              Already registered
            </button>
          </div>

          <div v-if="isRegisteredForCurrentItem" class="mt-3 alert alert-info" role="status">
            You are already registered for "{{ selectedItem.title }}".
          </div>

          <div
            v-else-if="registrationStore.notice.message && registrationStore.notice.message.includes(selectedItem.title)"
            class="mt-3 alert"
            :class="registrationStore.notice.type === 'warning' ? 'alert-warning' : 'alert-success'"
            role="status">
            {{ registrationStore.notice.message }}
          </div>
        </div>
      </article>
    </section>
  `,
};
